"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect based on role
        const role = data.user.role.toLowerCase();
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else if (role === "doctor") {
          router.push("/doctor/dashboard");
        } else {
          router.push("/patient/dashboard");
        }
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Une erreur de connexion est survenue");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              <span className="logo-icon">🏥</span>
              <span className="logo-text">Smart Health</span>
            </Link>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>À propos</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                S'inscrire
              </Link>
            </div>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={isMenuOpen ? 'open' : ''}></span>
              <span className={isMenuOpen ? 'open' : ''}></span>
              <span className={isMenuOpen ? 'open' : ''}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content animate-fade-in">
            <h1>Bienvenue</h1>
            <p>Connectez-vous pour accéder à votre espace santé numérique</p>
            <div className="features-list">
              <div className="feature-item animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <span className="feature-icon">✓</span>
                <span>Communication sécurisée</span>
              </div>
              <div className="feature-item animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="feature-icon">✓</span>
                <span>Dossier médical digital</span>
              </div>
              <div className="feature-item animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <span className="feature-icon">✓</span>
                <span>Analyse alimentaire IA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-wrapper">
          <div className="login-form-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="form-header">
              <h2>Connexion</h2>
              <p>Accédez à votre compte</p>
            </div>

            {error && (
              <div className="error-message">
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="role">Type de compte</label>
                <select
                  id="role"
                  name="role"
                  className="input"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Médecin</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Se souvenir de moi</span>
                </label>
                <Link href="#" className="forgot-link">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-full">
                Se connecter
              </button>
            </form>

            <div className="form-footer">
              <p>
                Pas encore de compte ?{" "}
                <Link href="/register" className="register-link">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <span className="logo-icon">🏥</span>
                <span className="logo-text">Smart Health</span>
              </div>
              <p>Votre plateforme de santé numérique intelligente</p>
            </div>

            <div className="footer-section">
              <h4>Navigation</h4>
              <Link href="/">Accueil</Link>
              <Link href="/about">À propos</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className="footer-section">
              <h4>Services</h4>
              <Link href="/register">Espace Patient</Link>
              <Link href="/contact">Espace Médecin</Link>
              <Link href="/login">Connexion</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Smart Health. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          padding-top: 80px;
          background: linear-gradient(135deg, 
            var(--hero-gradient-start) 0%, 
            var(--hero-gradient-end) 100%);
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        :global([data-theme='dark']) .navbar {
          background: rgba(15, 23, 42, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        .navbar .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          text-decoration: none;
        }

        .navbar .logo-icon {
          font-size: 1.5rem;
        }

        .navbar .logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: #000;
          font-family: var(--font-display);
        }

        :global([data-theme='dark']) .navbar .logo-text {
          color: #fff;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--spacing-xl);
        }

        .nav-links a {
          text-decoration: none;
          color: var(--color-text-secondary);
          font-weight: 500;
          transition: var(--transition-fast);
          font-size: 1rem;
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 1001;
        }

        .menu-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-text);
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .menu-toggle span.open:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .menu-toggle span.open:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle span.open:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: var(--color-bg);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .nav-links.active {
            right: 0;
          }

          .nav-links a {
            font-size: 1.25rem;
          }
        }

        .login-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1100px;
          width: 100%;
          margin: var(--spacing-3xl) auto;
          background: #fff;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        :global([data-theme='dark']) .login-container {
          background: #1e293b;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .login-branding {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          padding: var(--spacing-3xl);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
        }

        .branding-content {
          max-width: 400px;
        }

        .branding-content h1 {
          font-size: var(--font-size-4xl);
          margin-bottom: var(--spacing-md);
          color: white;
          font-weight: 800;
        }

        .branding-content p {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-2xl);
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        :global([data-theme='dark']) .branding-content p {
          color: rgba(255, 255, 255, 0.85);
        }


        .features-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          font-size: var(--font-size-base);
        }

        .feature-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .login-form-wrapper {
          padding: var(--spacing-3xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
        }

        .form-header {
          margin-bottom: var(--spacing-xl);
        }

        .form-header h2 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-sm);
          color: #1e293b;
        }

        :global([data-theme='dark']) .form-header h2 {
          color: #f8fafc;
        }

        .form-header p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .error-message {
          padding: var(--spacing-md);
          background: var(--color-danger-bg);
          color: var(--color-danger);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
          font-weight: 500;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .form-group label {
          font-weight: 600;
          color: #1e293b;
          transition: color 0.3s ease;
        }

        :global([data-theme='dark']) .form-group label {
          color: #f8fafc;
        }

        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: calc(-1 * var(--spacing-sm));
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-sm);
          cursor: pointer;
        }

        .checkbox-label input {
          cursor: pointer;
        }

        .forgot-link {
          font-size: var(--font-size-sm);
          color: var(--color-primary);
          font-weight: 500;
        }

        .btn-full {
          width: 100%;
          margin-top: var(--spacing-md);
        }

        .form-footer {
          margin-top: var(--spacing-xl);
          text-align: center;
        }

        .form-footer p {
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-md);
        }

        .register-link {
          color: var(--color-primary);
          font-weight: 600;
        }

        .back-link {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        }

        /* Footer */
        .footer {
          background: var(--color-bg-tertiary);
          padding: var(--spacing-3xl) 0 var(--spacing-lg);
          margin-top: var(--spacing-3xl);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-family: var(--font-display);
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--spacing-sm);
        }

        .footer-section h4 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-md);
        }

        .footer-section a {
          color: var(--color-text-secondary);
        }

        .footer-section a:hover {
          color: var(--color-primary);
        }

        .footer-section p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .footer-bottom {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          color: var(--color-text-secondary);
        }

        :global([data-theme='dark']) .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }

        @media (max-width: 768px) {
          .login-container {
            grid-template-columns: 1fr;
            margin: 0;
            border-radius: 0;
          }

          .login-branding {
            padding: var(--spacing-xl);
          }

          .branding-content h1 {
            font-size: var(--font-size-3xl);
          }

          .login-container {
            margin: var(--spacing-xl) auto;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            margin: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
