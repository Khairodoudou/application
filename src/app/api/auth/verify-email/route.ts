import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const role = searchParams.get('role') // 'patient' ou 'doctor'

    if (!token || !role) {
      return NextResponse.redirect(
        new URL('/auth/verify-error?reason=invalid', request.url)
      )
    }

    // Chercher l'utilisateur via le token (dans le modèle User central)
    const expectedRole = role === 'doctor' ? 'DOCTOR' : 'PATIENT'

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        role: expectedRole,
        verificationExpires: { gt: new Date() },
      },
    })

    if (!user) {
      return NextResponse.redirect(
        new URL('/auth/verify-error?reason=expired', request.url)
      )
    }

    // Marquer l'email comme vérifié
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationExpires: null,
      },
    })

    return NextResponse.redirect(
      new URL('/auth/email-confirmed', request.url)
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.redirect(
      new URL('/auth/verify-error?reason=server', request.url)
    )
  }
}
