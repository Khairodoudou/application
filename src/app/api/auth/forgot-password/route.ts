/**
 * POST /api/auth/forgot-password
 *
 * Accepts an email, generates a one-time reset token valid for 1 hour,
 * and sends a password reset link via email.
 *
 * Security:
 *  - Always returns 200 (no user enumeration)
 *  - Rate-limited: max 3 requests / 15 min per email
 *  - Token is single-use (cleared after reset-password completes)
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

// ---------------------------------------------------------------------------
// In-memory rate limiter
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(email: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(email)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  entry.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 1. Rate limiting
    const { allowed, retryAfterSeconds } = checkRateLimit(normalizedEmail)
    if (!allowed) {
      return NextResponse.json(
        {
          error: `Trop de tentatives. Réessayez dans ${Math.ceil(retryAfterSeconds / 60)} minute(s).`,
          retryAfterSeconds,
        },
        { status: 429 }
      )
    }

    // 2. Look up user (but always return 200 to prevent enumeration)
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (!user) {
      // Fake success — don't reveal that the email doesn't exist
      return NextResponse.json({ success: true })
    }

    // 3. Generate a fresh reset token (valid 1 hour, single-use)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    })

    // 4. Send the reset email
    try {
      await sendPasswordResetEmail(normalizedEmail, resetToken)
      console.log(`✅ Password reset email sent to ${normalizedEmail}`)
    } catch (emailError: any) {
      console.error('⚠️  Failed to send password reset email:', emailError.message)
      // Don't fail the request — the token was saved, user can retry
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
