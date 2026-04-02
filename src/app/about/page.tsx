"use client";

import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="about-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              <span className="logo-icon">🏥</span>
              <span className="logo-text">HealthAegis</span>
            </Link>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>À propos</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/login" className="btn btn-secondary" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
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

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in">À Propos de HealthAegis</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>Révolutionner les soins de santé grâce à la technologie</p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Notre Mission</h2>
              <p>
                HealthAegis a été créé avec une vision claire : rendre les soins de santé
                plus accessibles, personnalisés et sécurisés grâce à la technologie numérique.
              </p>
              <p>
                Nous croyons que chaque patient mérite un accès facile à ses informations
                médicales et une communication directe avec son médecin, où qu'il soit.
              </p>
            </div>
            <div className="mission-image glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="stat-card">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Patients actifs</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Médecins partenaires</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Produits analysés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="container">
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="value-icon">🔒</div>
              <h3>Sécurité</h3>
              <p>
                La protection de vos données de santé est notre priorité absolue.
                Nous utilisons les technologies de cryptage les plus avancées.
              </p>
            </div>

            <div className="value-card card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="value-icon">🤝</div>
              <h3>Confiance</h3>
              <p>
                Nous construisons des relations de confiance entre médecins et patients
                grâce à la transparence et la fiabilité.
              </p>
            </div>

            <div className="value-card card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>
                Nous innovons constamment pour offrir les meilleures solutions
                technologiques au service de votre santé.
              </p>
            </div>

            <div className="value-card card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="value-icon">💙</div>
              <h3>Accessibilité</h3>
              <p>
                Nous rendons les soins de santé accessibles à tous, partout et à tout moment,
                grâce à notre plateforme intuitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="technology">
        <div className="container">
          <div className="tech-content">
            <div className="tech-text">
              <h2>Technologie de Pointe</h2>
              <p>
                Notre plateforme utilise l'intelligence artificielle pour analyser les
                produits alimentaires en fonction de votre profil santé unique.
              </p>
              <ul className="tech-features">
                <li>✓ Analyse IA des ingrédients</li>
                <li>✓ Base de données Open Food Facts</li>
                <li>✓ Recommandations personnalisées</li>
                <li>✓ Cryptage de bout en bout</li>
                <li>✓ Synchronisation en temps réel</li>
              </ul>
            </div>
            <div className="tech-visual glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="tech-badge">
                <span className="badge-icon">🤖</span>
                <span className="badge-text">IA Avancée</span>
              </div>
              <div className="tech-badge">
                <span className="badge-icon">🔐</span>
                <span className="badge-text">Sécurisé</span>
              </div>
              <div className="tech-badge">
                <span className="badge-icon">⚡</span>
                <span className="badge-text">Rapide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta-content glass">
            <h2>Rejoignez HealthAegis aujourd'hui</h2>
            <p>Commencez votre parcours vers une meilleure gestion de votre santé</p>
            <Link href="/register" className="btn btn-primary btn-lg">
              Créer un compte gratuit
            </Link>
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
        .about-page {
          min-height: 100vh;
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
          color: #000;
          font-family: var(--font-display);
        }

        :global([data-theme='dark']) .logo-text {
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
        .page-hero {
          padding: 180px 0 60px;
          text-align: center;
          background: linear-gradient(135deg, 
            var(--hero-gradient-start) 0%, 
            var(--hero-gradient-end) 100%);
        }

        .page-hero h1 {
          font-size: var(--font-size-5xl);
          margin-bottom: var(--spacing-md);
        }

        .page-hero p {
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
        }

        .mission {
          padding: var(--spacing-3xl) 0;
        }

        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .mission-text h2 {
          font-size: var(--font-size-4xl);
          margin-bottom: var(--spacing-lg);
        }

        .mission-text p {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-md);
        }

        .mission-image {
          display: grid;
          gap: var(--spacing-md);
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
        }

        .stat-card {
          text-align: center;
          padding: var(--spacing-lg);
        }

        .stat-number {
          font-size: var(--font-size-4xl);
          font-weight: 800;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: var(--font-size-base);
          color: var(--color-text-secondary);
          margin-top: var(--spacing-sm);
        }

        .values {
          padding: var(--spacing-3xl) 0;
          background: var(--color-bg-secondary);
        }

        .values h2 {
          text-align: center;
          font-size: var(--font-size-4xl);
          margin-bottom: var(--spacing-3xl);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-xl);
        }

        .value-card {
          text-align: center;
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
        }

        .value-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
        }

        .value-card p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .technology {
          padding: var(--spacing-3xl) 0;
        }

        .tech-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .tech-text h2 {
          font-size: var(--font-size-4xl);
          margin-bottom: var(--spacing-lg);
        }

        .tech-text p {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-xl);
        }

        .tech-features {
          list-style: none;
          padding: 0;
        }

        .tech-features li {
          font-size: var(--font-size-lg);
          padding: var(--spacing-sm) 0;
          color: var(--color-text-secondary);
        }

        .tech-visual {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-xl);
        }

        .tech-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          background: var(--color-bg);
          border-radius: var(--radius-lg);
        }

        .badge-icon {
          font-size: var(--font-size-3xl);
        }

        .badge-text {
          font-size: var(--font-size-xl);
          font-weight: 600;
        }

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

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
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

        @media (max-width: 768px) {
          .mission-content,
          .tech-content {
            grid-template-columns: 1fr;
          }

          .page-hero {
            padding: 120px 0 40px;
          }

          .page-hero h1 {
            font-size: var(--font-size-3xl);
          }
        }
      `}</style>
    </div>
  );
}
