"use client";

import Link from "next/link";

export default function EmailConfirmedPage() {
  return (
    <div className="confirm-page">
      <div className="confirm-card animate-fade-in">
        <div className="confirm-icon">✅</div>
        <h1>Email confirmé !</h1>
        <p className="confirm-subtitle">
          Votre adresse email a été vérifiée avec succès.
        </p>
        <div className="confirm-note patient-note">
          Vous pouvez maintenant vous connecter à votre espace patient.
        </div>
        <Link href="/login" className="confirm-btn">
          Se connecter
        </Link>
      </div>

      <style jsx>{`
        .confirm-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
          padding: 24px;
        }

        .confirm-card {
          background: white;
          border-radius: 20px;
          padding: 56px 48px;
          text-align: center;
          max-width: 460px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(37, 99, 235, 0.08);
        }

        .confirm-icon {
          font-size: 64px;
          line-height: 1;
          margin-bottom: 24px;
          animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .confirm-card h1 {
          font-size: 28px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 12px;
        }

        .confirm-subtitle {
          color: #64748b;
          font-size: 16px;
          margin: 0 0 24px;
          line-height: 1.6;
        }

        .confirm-note {
          background: #f0fdf4;
          border-left: 4px solid #22c55e;
          border-radius: 8px;
          padding: 14px 18px;
          font-size: 14px;
          color: #166534;
          text-align: left;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .confirm-btn {
          display: inline-block;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          padding: 14px 40px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .confirm-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .confirm-card {
            padding: 40px 24px;
          }
        }
      `}</style>
    </div>
  );
}
