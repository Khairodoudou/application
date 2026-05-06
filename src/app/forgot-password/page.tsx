"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setStatus("error");
        setMessage(data.error || "Trop de tentatives. Veuillez réessayer plus tard.");
        return;
      }

      // Always show success (no enumeration)
      setStatus("success");
      setMessage(
        "Si un compte existe avec cette adresse, un email de réinitialisation vient d'être envoyé. Vérifiez votre boîte mail (et les spams)."
      );
    } catch {
      setStatus("error");
      setMessage("Une erreur de connexion est survenue. Réessayez.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-container animate-in">
        {/* Header */}
        <div className="card-icon">🔑</div>
        <h1 className="card-title">Mot de passe oublié ?</h1>
        <p className="card-subtitle">
          Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        {/* Success state */}
        {status === "success" ? (
          <div className="success-box">
            <div className="success-icon">📬</div>
            <p className="success-text">{message}</p>
            <p className="success-hint">
              Le lien est valide pendant <strong>1 heure</strong>.
            </p>
            <Link href="/login" className="btn-primary btn-full">
              ← Retour à la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            {status === "error" && (
              <div className="alert-error">⚠ {message}</div>
            )}

            <div className="form-group">
              <label htmlFor="forgot-email">Adresse email</label>
              <input
                id="forgot-email"
                type="email"
                className="input"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <span className="loading-text">
                  <span className="spinner" /> Envoi en cours...
                </span>
              ) : (
                "Envoyer le lien de réinitialisation"
              )}
            </button>

            <div className="form-footer">
              <Link href="/login" className="back-link">
                ← Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
          padding: 24px;
        }

        .card-container {
          background: white;
          border-radius: 24px;
          padding: 52px 44px;
          max-width: 460px;
          width: 100%;
          box-shadow: 0 24px 64px rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(37, 99, 235, 0.08);
          text-align: center;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeInUp 0.5s ease both;
        }

        .card-icon {
          font-size: 56px;
          line-height: 1;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 10px;
        }

        .card-subtitle {
          color: #64748b;
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 32px;
        }

        /* Form */
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-weight: 600;
          font-size: 14px;
          color: #334155;
        }

        .input {
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
          background: white;
        }

        .btn-primary {
          display: block;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          text-align: center;
          text-decoration: none;
        }
        .btn-primary:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .btn-primary:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .btn-full { width: 100%; }

        .loading-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        .alert-error {
          padding: 12px 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #991b1b;
          font-size: 14px;
          font-weight: 500;
        }

        .form-footer {
          text-align: center;
          margin-top: 4px;
        }
        .back-link {
          color: #2563eb;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .back-link:hover { opacity: 0.7; }

        /* Success */
        .success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .success-icon { font-size: 52px; }
        .success-text {
          color: #334155;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }
        .success-hint {
          color: #64748b;
          font-size: 13px;
          margin: 0;
        }

        @media (max-width: 480px) {
          .card-container { padding: 36px 24px; }
          .card-title { font-size: 22px; }
        }
      `}</style>
    </div>
  );
}
