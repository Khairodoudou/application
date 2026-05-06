/**
 * email.ts — HealthAegis Email Service
 *
 * All transporter instances are created lazily inside each function to ensure
 * environment variables are read at call-time (not at module load time).
 * This prevents silent failures when env vars are not yet available during
 * module initialisation (e.g. Vercel cold starts, test environments).
 */

import nodemailer from 'nodemailer'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a fresh Nodemailer transporter using runtime env vars. */
function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error(
      'Email configuration is missing. ' +
        'Make sure GMAIL_USER and GMAIL_APP_PASSWORD are set in your environment variables.'
    )
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: { user, pass },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  })
}

/** Normalise the APP_URL: remove trailing slash. */
function appUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
}

// ---------------------------------------------------------------------------
// Shared email wrapper — consistent error logging
// ---------------------------------------------------------------------------

async function send(options: nodemailer.SendMailOptions): Promise<void> {
  const transporter = createTransporter()

  try {
    const info = await transporter.sendMail(options)
    console.log(`✅ Email sent to ${options.to} | MessageId: ${info.messageId}`)
  } catch (err: any) {
    console.error(`❌ Failed to send email to ${options.to}:`, {
      message: err.message,
      code: err.code,
      command: err.command,
    })
    // Re-throw so callers can decide whether to surface the error
    throw err
  }
}

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------

function headerHtml(title: string): string {
  return `
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px 40px;text-align:center;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">HealthAegis</h1>
      <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">${title}</p>
    </div>`
}

function footerHtml(): string {
  return `
    <div style="background:#f1f5f9;padding:20px 40px;text-align:center;border-radius:0 0 12px 12px;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 HealthAegis — Tous droits réservés</p>
    </div>`
}

function wrapEmail(content: string): string {
  return `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;">${content}</div>`
}

// ---------------------------------------------------------------------------
// Task 1 — Verification email (existing, now hardened)
// ---------------------------------------------------------------------------

export async function sendVerificationEmail(
  email: string,
  token: string,
  role: 'patient' | 'doctor'
): Promise<void> {
  const verificationUrl = `${appUrl()}/api/auth/verify-email?token=${token}&role=${role}`
  const roleLabel = role === 'doctor' ? 'Médecin' : 'Patient'

  const doctorNote =
    role === 'doctor'
      ? `<p style="color:#6b7280;font-size:13px;margin-top:12px;">
           ⏳ <strong>Note :</strong> Après confirmation de votre email, votre compte devra être validé par notre équipe avant que vous puissiez vous connecter.
         </p>`
      : ''

  const html = wrapEmail(`
    ${headerHtml('Plateforme Santé Numérique')}
    <div style="background:white;padding:40px;">
      <h2 style="color:#1e293b;font-size:20px;margin:0 0 12px;">Bienvenue, ${roleLabel} 👋</h2>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px;">
        Merci de vous être inscrit sur HealthAegis. Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et activer votre compte.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${verificationUrl}"
           style="display:inline-block;background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;
                  padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;
                  font-size:15px;letter-spacing:0.2px;">
          ✉️ Confirmer mon email
        </a>
      </div>
      ${doctorNote}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;">
      <p style="color:#94a3b8;font-size:12px;line-height:1.6;margin:0;">
        Ce lien expire dans <strong>24 heures</strong>.<br/>
        Si vous n'avez pas créé de compte sur HealthAegis, ignorez cet email.<br/>
        Lien alternatif : <a href="${verificationUrl}" style="color:#2563eb;">${verificationUrl}</a>
      </p>
    </div>
    ${footerHtml()}
  `)

  await send({
    from: `"HealthAegis" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Confirmez votre adresse email — HealthAegis',
    html,
  })
}

// ---------------------------------------------------------------------------
// Task 2 — Resend confirmation (same template, new token)
// ---------------------------------------------------------------------------

export async function sendResendConfirmationEmail(
  email: string,
  token: string,
  role: 'patient' | 'doctor'
): Promise<void> {
  // Reuse the same verification email with the new token
  return sendVerificationEmail(email, token, role)
}

// ---------------------------------------------------------------------------
// Task 3a — Password reset email
// ---------------------------------------------------------------------------

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const resetUrl = `${appUrl()}/reset-password?token=${token}`

  const html = wrapEmail(`
    ${headerHtml('Réinitialisation du mot de passe')}
    <div style="background:white;padding:40px;">
      <h2 style="color:#1e293b;font-size:20px;margin:0 0 12px;">🔑 Réinitialiser votre mot de passe</h2>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px;">
        Vous avez demandé la réinitialisation de votre mot de passe HealthAegis.
        Cliquez sur le bouton ci-dessous pour en définir un nouveau.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${resetUrl}"
           style="display:inline-block;background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;
                  padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
          🔒 Réinitialiser mon mot de passe
        </a>
      </div>
      <div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
        <p style="color:#92400e;font-size:13px;margin:0;line-height:1.6;">
          ⚠️ Ce lien est <strong>valide pendant 1 heure</strong> et ne peut être utilisé qu'une seule fois.<br/>
          Si vous n'avez pas fait cette demande, ignorez cet email — votre mot de passe reste inchangé.
        </p>
      </div>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
      <p style="color:#94a3b8;font-size:12px;line-height:1.6;margin:0;">
        Lien alternatif : <a href="${resetUrl}" style="color:#2563eb;">${resetUrl}</a>
      </p>
    </div>
    ${footerHtml()}
  `)

  await send({
    from: `"HealthAegis" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Réinitialisation de votre mot de passe — HealthAegis',
    html,
  })
}

// ---------------------------------------------------------------------------
// Task 3b — Security notification (password changed)
// ---------------------------------------------------------------------------

export async function sendSecurityNotificationEmail(
  email: string,
  firstName: string
): Promise<void> {
  const loginUrl = `${appUrl()}/login`
  const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })

  const html = wrapEmail(`
    ${headerHtml('Notification de sécurité')}
    <div style="background:white;padding:40px;">
      <h2 style="color:#1e293b;font-size:20px;margin:0 0 12px;">🔐 Mot de passe modifié</h2>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px;">
        Bonjour <strong>${firstName}</strong>,<br/><br/>
        Votre mot de passe HealthAegis a été modifié avec succès le <strong>${now}</strong>.
      </p>
      <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
        <p style="color:#166534;font-size:13px;margin:0;line-height:1.6;">
          ✅ Si c'est bien vous, aucune action n'est requise. Toutes vos autres sessions ont été déconnectées.
        </p>
      </div>
      <div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:8px;padding:14px 18px;margin-bottom:28px;">
        <p style="color:#991b1b;font-size:13px;margin:0;line-height:1.6;">
          ⚠️ Si vous n'êtes pas à l'origine de cette action, <strong>contactez-nous immédiatement</strong>
          et changez votre mot de passe dès que possible.
        </p>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="${loginUrl}"
           style="display:inline-block;background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;
                  padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Se connecter
        </a>
      </div>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">
        Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
      </p>
    </div>
    ${footerHtml()}
  `)

  await send({
    from: `"HealthAegis Sécurité" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '⚠️ Votre mot de passe a été modifié — HealthAegis',
    html,
  })
}
