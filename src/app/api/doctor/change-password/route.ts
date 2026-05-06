/**
 * POST /api/doctor/change-password
 *
 * Authenticated password change for doctors.
 * - Verifies current password
 * - Enforces strong password policy (≥8 chars, uppercase, number, symbol)
 * - Sends a security notification email after success
 * - Clears the session cookie to force re-login
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, comparePassword, getSession } from '@/lib/auth'
import { sendSecurityNotificationEmail } from '@/lib/email'
import { cookies } from 'next/headers'

// ---------------------------------------------------------------------------
// Password strength policy
// ---------------------------------------------------------------------------
function validatePasswordStrength(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères.' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une majuscule.' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre.' }
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial.' }
  }
  return { valid: true, message: '' }
}

export async function POST(request: Request) {
  try {
    // 1. Require authenticated session (DOCTOR role)
    const session = await getSession()

    if (!session || (session as any).role !== 'DOCTOR') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword, confirmPassword } = body

    // 2. Basic field validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Les nouveaux mots de passe ne correspondent pas.' },
        { status: 400 }
      )
    }

    // 3. Strong password policy
    const strength = validatePasswordStrength(newPassword)
    if (!strength.valid) {
      return NextResponse.json({ error: strength.message }, { status: 400 })
    }

    // 4. Load user from DB
    const user = await prisma.user.findUnique({
      where: { id: (session as any).userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 })
    }

    // 5. Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 400 })
    }

    // 6. Hash and save the new password
    const hashedPassword = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // 7. Send security notification email (non-blocking)
    try {
      await sendSecurityNotificationEmail(user.email, user.firstName)
      console.log(`✅ Security notification sent to ${user.email}`)
    } catch (emailError: any) {
      console.error('⚠️  Security email failed:', emailError.message)
    }

    // 8. Invalidate the session cookie — user must log in again
    const cookieStore = await cookies()
    cookieStore.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: '/',
    })

    console.log(`✅ Password changed for doctor ${user.email}`)

    return NextResponse.json({
      success: true,
      message: 'Mot de passe modifié avec succès. Veuillez vous reconnecter.',
      requiresRelogin: true,
    })
  } catch (error) {
    console.error('Password change error (doctor):', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du changement de mot de passe.' },
      { status: 500 }
    )
  }
}
