"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const messages: Record<string, { title: string; text: string }> = {
    expired: {
      title: "Lien expiré",
      text: "Ce lien de vérification a expiré (validité 24h). Veuillez vous réinscrire ou contacter le support.",
    },
    invalid: {
      title: "Lien invalide",
      text: "Ce lien de vérification est invalide ou déjà utilisé.",
    },
    server: {
      title: "Erreur serveur",
      text: "Une erreur s'est produite lors de la vérification. Veuillez réessayer.",
    },
  };

  const msg = messages[reason || "invalid"] || messages["invalid"];

  return (
    <div className="error-page">
      <div className="error-card animate-fade-in">
        <div className="error-icon">⚠️</div>
        <h1>{msg.title}</h1>
        <p className="error-text">{msg.text}</p>
        <div className="error-actions">
          <Link href="/register" className="btn-primary">
            Créer un nouveau compte
          </Link>
          <Link href="/login" className="btn-secondary">
            Se connecter
          </Link>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fef2f2 0%, #fdf4ff 100%);
          padding: 24px;
        }
        .error-card {
          background: white;
          border-radius: 20px;
          padding: 56px 48px;
          text-align: center;
          max-width: 440px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.08);
        }
        .error-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }
        .error-card h1 {
          font-size: 24px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 12px;
        }
        .error-text {
          color: #64748b;
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 28px;
        }
        .error-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .btn-primary {
          display: block;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          padding: 13px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }
        .btn-secondary {
          display: block;
          color: #2563eb;
          padding: 13px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}

export default function VerifyErrorPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement...</div>}>
      <VerifyErrorContent />
    </Suspense>
  );
}
