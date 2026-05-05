"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyPendingContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "patient";
  const isDoctor = role === "doctor";

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
          max-width: 500px;
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

        .back-link {
          display: inline-block;
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.7;
        }

        @media (max-width: 480px) {
          .pending-card {
            padding: 40px 24px;
          }
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
