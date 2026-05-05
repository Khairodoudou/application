import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendVerificationEmail(
  email: string,
  token: string,
  role: 'patient' | 'doctor'
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}&role=${role}`

  const roleLabel = role === 'doctor' ? 'Médecin' : 'Patient'
  const afterVerifNote =
    role === 'doctor'
      ? `<p style="color:#6b7280;font-size:13px;margin-top:12px;">
          ⏳ <strong>Note :</strong> Après confirmation de votre email, votre compte devra être validé par notre équipe avant que vous puissiez vous connecter.
        </p>`
      : ''

  await transporter.sendMail({
    from: `"HealthAegis" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Confirmez votre adresse email — HealthAegis',
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px 40px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">HealthAegis</h1>
          <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">Plateforme Santé Numérique</p>
        </div>

        <!-- Body -->
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

          ${afterVerifNote}

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;">

          <p style="color:#94a3b8;font-size:12px;line-height:1.6;margin:0;">
            Ce lien expire dans <strong>24 heures</strong>.<br/>
            Si vous n'avez pas créé de compte sur HealthAegis, ignorez cet email.<br/>
            Lien alternatif : <a href="${verificationUrl}" style="color:#2563eb;">${verificationUrl}</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f1f5f9;padding:20px 40px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 HealthAegis — Tous droits réservés</p>
        </div>
      </div>
    `,
  })
}
