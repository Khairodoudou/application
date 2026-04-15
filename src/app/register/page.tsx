"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Account Type
    accountType: "patient",

    // Step 2: Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Step 3: Health Profile (Patient only)
    diseases: "",
    allergies: "",
    diet: "",

    // Step 3: Professional Info (Doctor only)
    specialty: "",
    licenseNumber: "",
    clinic: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step < 2 || (step === 2 && formData.accountType === "doctor")) {
      if (step === 2 && formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
      setStep(step + 1);
    } else {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Une erreur est survenue");
        }

        if (formData.accountType === "doctor") {
          router.push("/login?registered=true");
        } else {
          router.push("/patient/dashboard");
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="HealthAegis" style={{ height: '65px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </Link>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>À propos</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/login" className="btn btn-secondary" onClick={() => setIsMenuOpen(false)}>
                Connexion
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

      <div className="register-container ">
        {/* Progress Sidebar */}
        <div className="progress-sidebar animate-fade-in">

          <div className="progress-steps">
            <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-info">
                <div className="step-title">Type de compte</div>
                <div className="step-description">Patient ou Médecin</div>
              </div>
            </div>

            <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-info">
                <div className="step-title">Informations</div>
                <div className="step-description">Vos coordonnées</div>
              </div>
            </div>

            {/* Only show Step 3 if it's relevant (Doctor info) */}
            {formData.accountType === "doctor" && (
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-info">
                  <div className="step-title">Info professionnelle</div>
                  <div className="step-description">Détails de votre cabinet</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="form-content">
          <div className="form-container">
            <div className="form-header animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2>
                {step === 1 && "Choisissez votre type de compte"}
                {step === 2 && "Informations personnelles"}
                {step === 3 && "Informations professionnelles"}
              </h2>
              <p>
                {step === 1 && "Sélectionnez le type de compte qui vous correspond"}
                {step === 2 && "Remplissez vos coordonnées"}
                {step === 3 && "Votre demande sera validée par un administrateur"}
              </p>
            </div>

            {error && (
              <div className="error-message">
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              {/* Step 1: Account Type */}
              {step === 1 && (
                <div className="account-type-selection">
                  <div
                    className={`account-type-card ${formData.accountType === 'patient' ? 'selected' : ''} animate-fade-in`}
                    style={{ animationDelay: '0.2s' }}
                    onClick={() => setFormData({ ...formData, accountType: 'patient' })}
                  >
                    <div className="card-icon">👤</div>
                    <h3>Patient</h3>
                    <p>Accédez à votre dossier santé et communiquez avec votre médecin</p>
                    <ul className="card-features">
                      <li>✓ Dossier médical digital</li>
                      <li>✓ Analyse alimentaire IA</li>
                      <li>✓ Chat avec médecin</li>
                    </ul>
                  </div>

                  <div
                    className={`account-type-card ${formData.accountType === 'doctor' ? 'selected' : ''} animate-fade-in`}
                    style={{ animationDelay: '0.3s' }}
                    onClick={() => setFormData({ ...formData, accountType: 'doctor' })}
                  >
                    <div className="card-icon">👨‍⚕️</div>
                    <h3>Médecin</h3>
                    <p>Gérez vos patients et suivez leur santé à distance</p>
                    <ul className="card-features">
                      <li>✓ Gestion des patients</li>
                      <li>✓ Dossiers médicaux</li>
                      <li>✓ Dashboard professionnel</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="form-fields animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Prénom *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="input"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jean"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Nom *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="input"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jean.dupont@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Téléphone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Mot de passe *</label>
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

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Health Profile (Patient) - REMOVED */}

              {/* Step 3: Professional Info (Doctor) */}
              {step === 3 && formData.accountType === "doctor" && (
                <div className="form-fields animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="form-group">
                    <label htmlFor="specialty">Spécialité *</label>
                    <input
                      type="text"
                      id="specialty"
                      name="specialty"
                      className="input"
                      value={formData.specialty}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Médecin généraliste, Cardiologue..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="licenseNumber">Numéro de licence *</label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      className="input"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      required
                      placeholder="Numéro RPPS"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="clinic">Cabinet/Hôpital *</label>
                    <input
                      type="text"
                      id="clinic"
                      name="clinic"
                      className="input"
                      value={formData.clinic}
                      onChange={handleChange}
                      required
                      placeholder="Nom de votre établissement"
                    />
                  </div>

                  <div className="info-box">
                    <strong>Note importante :</strong> Votre demande d'inscription sera examinée
                    par notre équipe. Vous recevrez un email de confirmation une fois votre compte validé.
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn btn-secondary"
                  >
                    Précédent
                  </button>
                )}
                <button type="submit" className="btn btn-primary btn-lg">
                  {step === 1 || (step === 2 && formData.accountType === "doctor") ? "Suivant" : "Créer mon compte"}
                </button>
              </div>
            </form>

            <div className="form-footer animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p>
                Vous avez déjà un compte ?{" "}
                <Link href="/login" className="login-link">
                  Se connecter
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
                <Image src="/logo.png" alt="HealthAegis" width={120} height={34} className="logo-img" />
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
            <p>&copy; 2026 HealthAegis. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .register-page {
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

        .navbar .logo .logo-img {
          height: 65px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.2s ease;
        }

        .navbar .logo:hover .logo-img {
          transform: scale(1.04);
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

        .register-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          max-width: 1200px;
          margin: var(--spacing-3xl) auto;
          background: #fff;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          min-height: 600px;
          transition: all 0.3s ease;
        }

        :global([data-theme='dark']) .register-container {
          background: #1e293b;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .progress-sidebar {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          padding: var(--spacing-2xl);
          color: white;
        }


        .progress-steps {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .progress-step {
          display: flex;
          gap: var(--spacing-md);
          opacity: 0.5;
          transition: opacity var(--transition-base);
        }

        .progress-step.active {
          opacity: 1;
        }

        .progress-step.completed .step-number {
          background: rgba(255, 255, 255, 0.3);
        }

        .step-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-info {
          flex: 1;
        }

        .step-title {
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
        }

        .step-description {
          font-size: var(--font-size-sm);
          opacity: 0.9;
        }

        .form-content {
          padding: var(--spacing-3xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-container {
          width: 100%;
          max-width: 600px;
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

        .register-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .account-type-selection {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }

        .account-type-card {
          padding: var(--spacing-xl);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: center;
        }

        .account-type-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .account-type-card.selected {
          border-color: var(--color-primary);
          background: var(--hero-gradient-start);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
        }

        .account-type-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
        }

        .account-type-card p {
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-md);
          font-size: var(--font-size-sm);
        }

        .card-features {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .card-features li {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          padding: var(--spacing-xs) 0;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

        .textarea {
          resize: vertical;
          font-family: var(--font-sans);
        }

        .info-box {
          padding: var(--spacing-md);
          background: var(--color-warning-bg);
          border-left: 4px solid var(--color-warning);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .form-actions {
          display: flex;
          gap: var(--spacing-md);
          justify-content: flex-end;
        }

        .form-footer {
          margin-top: var(--spacing-xl);
          text-align: center;
        }

        .form-footer p {
          color: var(--color-text-secondary);
        }

        .login-link {
          color: var(--color-primary);
          font-weight: 600;
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
          border-top: 1px solid var(--color-border);
          color: var(--color-text-secondary);
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

        @media (max-width: 968px) {
          .register-container {
            grid-template-columns: 1fr;
          }

          .progress-sidebar {
            padding: var(--spacing-xl);
          }

          .progress-steps {
            flex-direction: row;
            justify-content: space-between;
          }

          .step-info {
            display: none;
          }

          .account-type-selection {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
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
      `}</style>
    </div>
  );
}
