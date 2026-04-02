"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-wrapper">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🏥</span>
              <span className="logo-text">HealthAegis</span>
            </div>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>À propos</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/login" className="btn btn-secondary" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
              <Link href="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>S'inscrire</Link>
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate-fade-in">
              <h1 className="hero-title">
                Votre Santé,
                <span className="gradient-text"> Notre Priorité</span>
              </h1>
              <p className="hero-description">
                Connectez-vous avec votre médecin, gérez votre dossier santé numérique
                et analysez vos produits alimentaires grâce à l'intelligence artificielle.
              </p>
              <div className="hero-buttons">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Commencer gratuitement
                </Link>
                <Link href="/about" className="btn btn-secondary btn-lg">
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="hero-image animate-slide-in">
              <div className="hero-card glass">
                <div className="card-icon">🩺</div>
                <h3>Suivi Médical</h3>
                <p>Communication directe avec votre médecin</p>
              </div>
              <div className="hero-card glass">
                <div className="card-icon">📊</div>
                <h3>Dossier Santé</h3>
                <p>Gestion numérique sécurisée</p>
              </div>
              <div className="hero-card glass">
                <div className="card-icon">🔬</div>
                <h3>Analyse Intelligente</h3>
                <p>Produits et documents médicaux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Fonctionnalités Principales</h2>
            <p>Une plateforme complète pour votre santé numérique</p>
          </div>

          <div className="features-grid">
            <div className="feature-card card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon gradient-primary">📁</div>
              <h3>Documents Médicaux PDF</h3>
              <p>
                Importez et centralisez vos analyses, ordonnances et comptes-rendus
                au format PDF en toute sécurité.
              </p>
            </div>

            <div className="feature-card card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon gradient-accent">📋</div>
              <h3>Dossier Médical Digital</h3>
              <p>
                Stockez et gérez vos informations de santé, allergies et
                traitements en toute sécurité.
              </p>
            </div>

            <div className="feature-card card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="feature-icon gradient-primary">🔬</div>
              <h3>Analyse Santé Intelligente</h3>
              <p>
                Scannez vos produits ou documents médicaux et recevez des recommandations
                personnalisées selon votre profil santé.
              </p>
            </div>

            <div className="feature-card card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="feature-icon gradient-accent">🔒</div>
              <h3>Sécurité & Confidentialité</h3>
              <p>
                Vos données de santé sont cryptées et protégées selon
                les normes les plus strictes.
              </p>
            </div>

            <div className="feature-card card animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="feature-icon gradient-primary">📱</div>
              <h3>Accessible Partout</h3>
              <p>
                Accédez à votre espace santé depuis n'importe quel
                appareil, à tout moment.
              </p>
            </div>

            <div className="feature-card card animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="feature-icon gradient-accent">📈</div>
              <h3>Suivi en Temps Réel</h3>
              <p>
                Suivez l'évolution de votre santé avec des statistiques
                et historiques détaillés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>Comment ça marche ?</h2>
            <p>Trois étapes simples pour commencer</p>
          </div>

          <div className="steps">
            <div className="step animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="step-number">1</div>
              <h3>Créez votre compte</h3>
              <p>Inscrivez-vous en tant que patient ou médecin en quelques clics</p>
            </div>

            <div className="step-arrow animate-fade-in" style={{ animationDelay: '0.3s' }}>→</div>

            <div className="step animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="step-number">2</div>
              <h3>Complétez votre profil</h3>
              <p>Ajoutez vos informations de santé et préférences alimentaires</p>
            </div>

            <div className="step-arrow animate-fade-in" style={{ animationDelay: '0.5s' }}>→</div>

            <div className="step animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="step-number">3</div>
              <h3>Gérez votre santé</h3>
              <p>Consultez vos statistiques, importez vos PDF et analysez vos produits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content glass">
            <h2>Prêt à prendre soin de votre santé ?</h2>
            <p>Rejoignez des milliers d'utilisateurs qui font confiance à HealthAegis</p>
            <div className="cta-buttons">
              <Link href="/register" className="btn btn-primary btn-lg">
                Créer un compte patient
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-lg">
                Espace médecin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <span className="logo-icon">🏥</span>
                <span className="logo-text">HealthAegis</span>
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
        .home-wrapper {
          min-height: 100vh;
        }

        /* Navigation */
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

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          text-decoration: none;
        }

        .logo-icon {
          font-size: 1.5rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text);
          font-family: var(--font-display);
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

          .hero-content {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: var(--font-size-3xl);
          }
        }

        /* Hero Section */
        .hero {
          position: relative;
          padding: 100px 0 80px;
          overflow: hidden;
          background: linear-gradient(135deg, 
            var(--hero-gradient-start) 0%, 
            var(--hero-gradient-end) 100%);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, hsla(210, 100%, 56%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, hsla(280, 85%, 60%, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .hero-content {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
          z-index: 1;
        }

        .hero-title {
          font-size: var(--font-size-5xl);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--spacing-lg);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xl);
        }

        .hero-buttons {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .btn-lg {
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: var(--font-size-lg);
        }

        .hero-image {
          display: grid;
          gap: var(--spacing-lg);
        }

        .hero-card {
          padding: var(--spacing-xl);
          text-align: center;
          transition: all var(--transition-base);
        }

        .hero-card:hover {
          transform: translateY(-8px);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
        }

        .hero-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
        }

        .hero-card p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        /* Features Section */
        .features {
          padding: var(--spacing-3xl) 0;
          background: var(--color-bg);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .section-header h2 {
          font-size: var(--font-size-4xl);
          margin-bottom: var(--spacing-md);
        }

        .section-header p {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
        }

        .feature-card {
          text-align: center;
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto var(--spacing-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border-radius: var(--radius-xl);
          color: white;
        }

        .feature-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-md);
        }

        .feature-card p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        /* How It Works */
        .how-it-works {
          padding: var(--spacing-3xl) 0;
          background: var(--color-bg-secondary);
        }

        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xl);
          flex-wrap: wrap;
        }

        .step {
          flex: 1;
          min-width: 250px;
          text-align: center;
          padding: var(--spacing-xl);
        }

        .step-number {
          width: 60px;
          height: 60px;
          margin: 0 auto var(--spacing-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-2xl);
          font-weight: 700;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-full);
        }

        .step h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
        }

        .step p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .step-arrow {
          font-size: var(--font-size-3xl);
          color: var(--color-primary);
        }

        /* CTA Section */
        .cta {
          padding: var(--spacing-3xl) 0;
        }

        .cta-content {
          text-align: center;
          padding: var(--spacing-3xl);
          border-radius: var(--radius-2xl);
        }

        .cta-content h2 {
          font-size: var(--font-size-4xl);
          margin-bottom: var(--spacing-md);
        }

        .cta-content p {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xl);
        }

        .cta-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Footer */
        .footer {
          background: var(--color-bg-tertiary);
          padding: var(--spacing-3xl) 0 var(--spacing-lg);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }

        .footer-section h4 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-md);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .footer-section a {
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
        }

        .footer-section a:hover {
          color: var(--color-primary);
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

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-slide-in {
          opacity: 0;
          animation: slideIn 0.8s ease forwards;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: var(--color-bg);
            border-bottom: 1px solid var(--color-border);
            padding: var(--spacing-lg);
            transform: translateY(-100%);
            opacity: 0;
            transition: all var(--transition-base);
          }

          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
          }

          .hero-content {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: var(--font-size-3xl);
          }

          .step-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
