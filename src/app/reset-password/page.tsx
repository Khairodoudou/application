"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Password strength checker
// ---------------------------------------------------------------------------
function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "#e2e8f0" };

  let score = 0;
  if (password.length >= 8)        score++;
  if (/[A-Z]/.test(password))      score++;
  if (/[0-9]/.test(password))      score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels: Record<number, { label: string; color: string }> = {
    0: { label: "Très faible", color: "#ef4444" },
    1: { label: "Faible",      color: "#f97316" },
    2: { label: "Moyen",       color: "#eab308" },
    3: { label: "Fort",        color: "#22c55e" },
    4: { label: "Très fort",   color: "#16a34a" },
  };

  return { score, ...levels[score] };
}

// ---------------------------------------------------------------------------
// Inner component (needs useSearchParams inside Suspense)
// ---------------------------------------------------------------------------
function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [status, setStatus]         = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage]       = useState("");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Validate that a token is present — if not, redirect immediately
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    } else {
      setTokenValid(true);
    }
  }, [token]);

  const strength = getStrength(password);
  const passwordsMatch = password && confirm && password === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setStatus("error");
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue.");
        return;
      }

      setStatus("success");
      setMessage("Mot de passe réinitialisé avec succès !");
      // Redirect to login after 2.5 s
      setTimeout(() => router.push("/login"), 2500);
    } catch {
      setStatus("error");
      setMessage("Une erreur de connexion est survenue. Réessayez.");
    }
  };

  // Invalid / missing token
  if (tokenValid === false) {
    return (
      <div className="page-wrapper">
        <div className="card-container animate-in error-card">
          <div className="card-icon">❌</div>
          <h1 className="card-title">Lien invalide</h1>
          <p className="card-subtitle">
            Ce lien de réinitialisation est invalide ou manquant.
            Veuillez demander un nouveau lien.
          </p>
          <Link href="/forgot-password" className="btn-primary btn-full">
            Demander un nouveau lien
          </Link>
          <Link href="/login" className="back-link" style={{ marginTop: 12 }}>
            ← Retour à la connexion
          </Link>
        </div>
        <SharedStyles />
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="page-wrapper">
        <div className="card-container animate-in">
          <div className="card-icon success-bounce">✅</div>
          <h1 className="card-title">Mot de passe réinitialisé !</h1>
          <p className="card-subtitle">
            Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion...
          </p>
          <Link href="/login" className="btn-primary btn-full">
            Se connecter maintenant →
          </Link>
        </div>
        <SharedStyles />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="card-container animate-in">
        <div className="card-icon">🔒</div>
        <h1 className="card-title">Nouveau mot de passe</h1>
        <p className="card-subtitle">
          Choisissez un mot de passe fort pour sécuriser votre compte.
        </p>

        <form onSubmit={handleSubmit} className="form">
          {status === "error" && (
            <div className="alert-error">⚠ {message}</div>
          )}

          {/* Password rules hint */}
          <div className="rules-box">
            <p className="rules-title">Votre mot de passe doit contenir :</p>
            <ul className="rules-list">
              <li className={password.length >= 8 ? "ok" : ""}>✓ Au moins 8 caractères</li>
              <li className={/[A-Z]/.test(password) ? "ok" : ""}>✓ Une lettre majuscule</li>
              <li className={/[0-9]/.test(password) ? "ok" : ""}>✓ Un chiffre</li>
              <li className={/[^A-Za-z0-9]/.test(password) ? "ok" : ""}>✓ Un caractère spécial (!@#$%...)</li>
            </ul>
          </div>

          {/* New password */}
          <div className="form-group">
            <label htmlFor="new-password">Nouveau mot de passe</label>
            <div className="input-wrapper">
              <input
                id="new-password"
                type={showPwd ? "text" : "password"}
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowPwd(!showPwd)}
                tabIndex={-1}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Strength bar */}
            {password && (
              <div className="strength-bar-wrapper">
                <div className="strength-bar">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="strength-segment"
                      style={{
                        background: i <= strength.score ? strength.color : "#e2e8f0",
                      }}
                    />
                  ))}
                </div>
                <span className="strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
            <input
              id="confirm-password"
              type={showPwd ? "text" : "password"}
              className={`input ${confirm && (passwordsMatch ? "input-ok" : "input-error")}`}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
            {confirm && !passwordsMatch && (
              <span className="mismatch-hint">Les mots de passe ne correspondent pas</span>
            )}
            {passwordsMatch && (
              <span className="match-hint">✓ Les mots de passe correspondent</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={status === "loading" || strength.score < 4 || !passwordsMatch}
          >
            {status === "loading" ? (
              <span className="loading-text">
                <span className="spinner" /> Réinitialisation...
              </span>
            ) : (
              "Réinitialiser le mot de passe"
            )}
          </button>

          <div className="form-footer">
            <Link href="/login" className="back-link">← Retour à la connexion</Link>
          </div>
        </form>
      </div>

      <SharedStyles />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared CSS via a component trick (JSX style is page-scoped)
// ---------------------------------------------------------------------------
function SharedStyles() {
  return (
    <style jsx global>{`
      .page-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
        padding: 24px;
        flex-direction: column;
        gap: 16px;
      }
      .card-container {
        background: white;
        border-radius: 24px;
        padding: 52px 44px;
        max-width: 480px;
        width: 100%;
        box-shadow: 0 24px 64px rgba(37, 99, 235, 0.12);
        border: 1px solid rgba(37, 99, 235, 0.08);
        text-align: center;
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .animate-in { animation: fadeInUp 0.5s ease both; }
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
      .success-bounce { animation: none; }
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
        margin: 0 0 28px;
      }
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
      .input-wrapper { position: relative; }
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
      .input-ok  { border-color: #22c55e !important; }
      .input-error { border-color: #ef4444 !important; }
      .toggle-pwd {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        line-height: 1;
      }
      .strength-bar-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 6px;
      }
      .strength-bar {
        display: flex;
        gap: 4px;
        flex: 1;
      }
      .strength-segment {
        height: 4px;
        flex: 1;
        border-radius: 4px;
        transition: background 0.3s;
      }
      .strength-label {
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }
      .mismatch-hint { font-size: 12px; color: #ef4444; font-weight: 500; }
      .match-hint    { font-size: 12px; color: #22c55e; font-weight: 500; }

      .rules-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 14px 18px;
        text-align: left;
      }
      .rules-title {
        font-size: 13px;
        font-weight: 600;
        color: #475569;
        margin: 0 0 8px;
      }
      .rules-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .rules-list li {
        font-size: 12px;
        color: #94a3b8;
        transition: color 0.2s;
      }
      .rules-list li.ok { color: #22c55e; font-weight: 600; }

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
      .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
      .btn-full { width: 100%; }

      @keyframes spin { to { transform: rotate(360deg); } }
      .spinner {
        width: 16px; height: 16px;
        border: 2px solid rgba(255,255,255,0.4);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        display: inline-block;
      }
      .loading-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .alert-error {
        padding: 12px 16px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 10px;
        color: #991b1b;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
      }
      .form-footer { text-align: center; }
      .back-link {
        display: inline-block;
        color: #2563eb;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: opacity 0.2s;
      }
      .back-link:hover { opacity: 0.7; }
      @media (max-width: 480px) {
        .card-container { padding: 36px 24px; }
        .card-title { font-size: 22px; }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// Page export with Suspense boundary (required for useSearchParams)
// ---------------------------------------------------------------------------
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Chargement...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
