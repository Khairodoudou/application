"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function VerifyPendingContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "patient";
  const emailParam = searchParams.get("email") || "";
  const isDoctor = role === "doctor";

  // Resend state
  const [resendEmail, setResendEmail] = useState(emailParam);
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "success" | "error" | "cooldown">("idle");
  const [resendMessage, setResendMessage] = useState("");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail.trim()) return;

    setResendStatus("loading");
    setResendMessage("");

    try {
      const res = await fetch("/api/auth/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail.trim() }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setResendStatus("error");
        setResendMessage(data.error || "Trop de tentatives. Réessayez plus tard.");
        return;
      }

      if (!res.ok) {
        setResendStatus("error");
        setResendMessage(data.error || "Une erreur est survenue.");
        return;
      }

      if (data.alreadyVerified) {
        setResendStatus("success");
        setResendMessage("Ce compte est déjà vérifié. Vous pouvez vous connecter.");
        return;
      }

      // Success — start 60-second cooldown
      setResendStatus("cooldown");
      setResendMessage("Email renvoyé ! Vérifiez votre boîte mail (et les spams).");
      let secs = 60;
      setCooldownSeconds(secs);
      const interval = setInterval(() => {
        secs -= 1;
        setCooldownSeconds(secs);
        if (secs <= 0) {
          clearInterval(interval);
          setResendStatus("success");
        }
      }, 1000);
    } catch {
      setResendStatus("error");
      setResendMessage("Erreur de connexion. Réessayez.");
    }
  };

  return (
    <div className="pending-page">
      <div className="pending-card animate-fade-in">
        <div className="pending-icon">📧</div>
        <h1>Vérifiez votre email</h1>
        <p className="pending-subtitle">
          Un email de confirmation vient d'être envoyé à votre adresse.
        </p>

        <div className="steps-box">
          <div className="step-item">
            <span className="step-num">1</span>
            <span>Ouvrez votre boîte mail</span>
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <span>Cliquez sur <strong>« Confirmer mon email »</strong></span>
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <span>
              {isDoctor
                ? "Attendez la validation de notre équipe"
                : "Connectez-vous à votre espace patient"}
            </span>
          </div>
        </div>

        {isDoctor && (
          <div className="doctor-note">
            <strong>🩺 Compte Médecin :</strong> Après confirmation de votre email, votre dossier sera examiné par notre équipe. Vous recevrez une notification une fois votre compte activé.
          </div>
        )}

        <p className="spam-hint">
          Vous ne trouvez pas l'email ? Vérifiez votre dossier <strong>Spam / Courrier indésirable</strong>.
        </p>

        {/* ---- Resend section ---- */}
        <div className="resend-section">
          <p className="resend-title">Toujours rien ? Renvoyez l'email.</p>

          {(resendStatus === "success" || resendStatus === "cooldown") && (
            <div className="resend-success">
              ✅ {resendMessage}
              {resendStatus === "cooldown" && (
                <span className="cooldown-badge"> Réessayez dans {cooldownSeconds}s</span>
              )}
            </div>
          )}

          {resendStatus === "error" && (
            <div className="resend-error">⚠ {resendMessage}</div>
          )}

          {resendStatus !== "success" && resendStatus !== "cooldown" && (
            <form onSubmit={handleResend} className="resend-form">
              <input
                type="email"
                className="resend-input"
                placeholder="votre@email.com"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="resend-btn"
                disabled={resendStatus === "loading"}
              >
                {resendStatus === "loading" ? (
                  <span className="spinner-inline" />
                ) : (
                  "Renvoyer"
                )}
              </button>
            </form>
          )}
        </div>

        <Link href="/login" className="back-link">
          ← Retour à la connexion
        </Link>
      </div>

      <style jsx>{`
        .pending-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
          padding: 24px;
        }

        .pending-card {
          background: white;
          border-radius: 20px;
          padding: 56px 48px;
          text-align: center;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(37, 99, 235, 0.08);
        }

        .pending-icon {
          font-size: 64px;
          line-height: 1;
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .pending-card h1 {
          font-size: 26px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 12px;
        }

        .pending-subtitle {
          color: #64748b;
          font-size: 15px;
          margin: 0 0 28px;
          line-height: 1.6;
        }

        .steps-box {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #334155;
          line-height: 1.5;
        }

        .step-num {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .doctor-note {
          background: #fefce8;
          border-left: 4px solid #eab308;
          border-radius: 8px;
          padding: 14px 18px;
          font-size: 13px;
          color: #713f12;
          text-align: left;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .spam-hint {
          color: #94a3b8;
          font-size: 13px;
          margin: 0 0 24px;
        }

        /* ---- Resend section ---- */
        .resend-section {
          border-top: 1px solid #f1f5f9;
          padding-top: 24px;
          margin-bottom: 24px;
        }

        .resend-title {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 14px;
          font-weight: 500;
        }

        .resend-form {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .resend-input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.2s;
        }
        .resend-input:focus {
          outline: none;
          border-color: #2563eb;
          background: white;
        }

        .resend-btn {
          padding: 10px 18px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
          white-space: nowrap;
          min-width: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .resend-btn:hover:not(:disabled) { opacity: 0.88; }
        .resend-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner-inline {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        .resend-success {
          padding: 10px 14px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          font-size: 13px;
          color: #166534;
          font-weight: 500;
          text-align: left;
        }

        .resend-error {
          padding: 10px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 13px;
          color: #991b1b;
          font-weight: 500;
          text-align: left;
          margin-bottom: 12px;
        }

        .cooldown-badge {
          display: inline-block;
          margin-left: 6px;
          background: #dcfce7;
          color: #15803d;
          padding: 1px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .back-link {
          display: inline-block;
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s;
        }
        .back-link:hover { opacity: 0.7; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease both; }

        @media (max-width: 480px) {
          .pending-card { padding: 40px 24px; }
          .resend-form { flex-direction: column; }
          .resend-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function VerifyPendingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement...</div>}>
      <VerifyPendingContent />
    </Suspense>
  );
}
