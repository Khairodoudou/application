/**
 * POST /api/auth/reset-password
 *
 * Validates the reset token, enforces password strength,
 * hashes the new password, clears the token, and invalidates the session.
 *
 * Body: { token: string; password: string }
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { cookies } from 'next/headers'

// ---------------------------------------------------------------------------
// Password strength validation (min 8 chars, uppercase, digit, symbol)
// ---------------------------------------------------------------------------
function validatePasswordStrength(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères.' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une lettre majuscule.' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre.' }
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...).' }
  }
  return { valid: true, message: '' }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token et nouveau mot de passe requis.' },
        { status: 400 }
      )
    }

    // 1. Validate password strength
    const strength = validatePasswordStrength(password)
    if (!strength.valid) {
      return NextResponse.json({ error: strength.message }, { status: 400 })
    }

    // 2. Find user by reset token (must not be expired)
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Ce lien de réinitialisation est invalide ou a expiré. Veuillez en demander un nouveau.' },
        { status: 400 }
      )
    }

    // 3. Hash new password and clear the reset token (single-use)
    const hashedPassword = await hashPassword(password)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    })

    // 4. Invalidate the current session cookie so the user must log in again
    const cookieStore = await cookies()
    cookieStore.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Immediately expired
      path: '/',
    })

    console.log(`✅ Password reset successful for user ${user.email}`)

    return NextResponse.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
