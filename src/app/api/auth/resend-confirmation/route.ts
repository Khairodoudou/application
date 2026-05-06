/**
 * POST /api/auth/resend-confirmation
 *
 * Resends the email verification link to a user who hasn't confirmed yet.
 *
 * Security:
 *  - Rate-limited to 3 requests per 15 minutes per email (in-memory)
 *  - Returns a generic 200 response whether the email exists or not (no enumeration)
 *  - Regenerates a fresh token + expiry on every resend
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

// ---------------------------------------------------------------------------
// In-memory rate limiter: Map<email, { count: number; resetAt: number }>
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(email: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(email)

  if (!entry || now > entry.resetAt) {
    // First request or window expired — reset
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

    // 2. Look up the user — always return 200 if not found (prevent enumeration)
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (!user) {
      // Generic success (don't reveal whether the email exists)
      return NextResponse.json({ success: true })
    }

    // 3. Already verified
    if (user.emailVerified) {
      return NextResponse.json({ success: true, alreadyVerified: true })
    }

    // 4. Regenerate a fresh token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 h

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken, verificationExpires },
    })

    // 5. Send the email
    const emailRole = user.role === 'DOCTOR' ? 'doctor' : 'patient'
    try {
      await sendVerificationEmail(normalizedEmail, verificationToken, emailRole)
      console.log(`✅ Resent confirmation email to ${normalizedEmail}`)
    } catch (emailError: any) {
      console.error('⚠️  Failed to resend confirmation email:', emailError.message)
      // Don't leak the error to the client
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend confirmation error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
