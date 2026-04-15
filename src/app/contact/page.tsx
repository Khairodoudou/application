"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    supportEmail: "contact@HealthAegis.com",
    adminPhone: "+33 1 23 45 67 89",
    headOffice: "123 Rue de la Santé, Paris, France",
    facebook: "https://facebook.com/smarthealth",
    instagram: "https://instagram.com/smarthealth",
    linkedin: "https://linkedin.com/company/smarthealth",
    googleMapsUrl: ""
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setSettings({
            supportEmail: data.supportEmail || "contact@HealthAegis.com",
            adminPhone: data.adminPhone || "+33 1 23 45 67 89",
            headOffice: data.headOffice || "123 Rue de la Santé, Paris, France",
            facebook: data.facebook || "https://facebook.com/smarthealth",
            instagram: data.instagram || "https://instagram.com/smarthealth",
            linkedin: data.linkedin || "https://linkedin.com/company/smarthealth",
            googleMapsUrl: data.googleMapsUrl || "https://www.google.com/maps?q=Alger,Algérie&t=&z=6&ie=UTF8&iwloc=&output=embed"
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="contact-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="HealthAegis" style={{ height: '65px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </Link>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link href="/">Accueil</Link>
              <Link href="/about">À propos</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/login" className="btn btn-secondary">Connexion</Link>
              <Link href="/register" className="btn btn-primary">S'inscrire</Link>
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
          <h1 className="animate-fade-in">Contactez l'Administration</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Notre équipe est à votre disposition pour toute assistance
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Primary Contact Cards */}
            <div className="admin-info-main">
              <div className="section-title">
                <h2>Canaux de Communication</h2>
                <div className="title-underline"></div>
              </div>

              <div className="info-cards-grid">
                <div className="contact-info-card glass">
                  <div className="card-icon-wrapper">
                    <FaPhone />
                  </div>
                  <div className="card-details">
                    <h3>Téléphone admin</h3>
                    <p>{settings.adminPhone}</p>
                    <span className="availability">Lun-Ven: 9h-18h</span>
                  </div>
                </div>

                <div className="contact-info-card glass">
                  <div className="card-icon-wrapper">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="card-details">
                    <h3>Siège Social</h3>
                    <p>{settings.headOffice}</p>
                    <span className="availability">Algérie , Annaba</span>
                  </div>
                </div>

                <div className="contact-map-card glass" style={{ gridColumn: "1 / -1", height: "300px", padding: 0, overflow: "hidden", borderRadius: "1rem", border: "1px solid var(--color-border-light)", display: "flex" }}>
                    <iframe 
                        title="Carte de l'Algérie"
                        src={settings.googleMapsUrl || "https://www.google.com/maps?q=Alger,Algérie&t=&z=6&ie=UTF8&iwloc=&output=embed"}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
              </div>
            </div>

            {/* Side Action Column */}
            <div className="admin-side-actions">
              <div className="social-connect-card glass">
                <h3>Suivez-nous</h3>
                <p>Restez informé de nos dernières innovations en santé numérique sur nos réseaux.</p>
                <div className="social-links">
                  {settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin"><FaLinkedin /></a>}
                  {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="social-btn instagram"><FaInstagram /></a>}
                  {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="social-btn facebook"><FaFacebook /></a>}
                </div>
              </div>

              <div className="doctor-cta-card glass special">
                <div className="cta-icon">👨‍⚕️</div>
                <h3>Espace Professionnel</h3>
                <p>Vous êtes médecin et souhaitez rejoindre le premier réseau de santé numérique ?</p>
                <Link href="/register" className="btn btn-primary btn-full">
                  S'inscrire comme Médecin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section className="corporate-section">
        <div className="container">
          <div className="corporate-card glass">
            <div className="corp-header">
              <h2>À propos de HealthAegis Administration</h2>
            </div>
            <div className="corp-body">
              <p>
                HealthAegis est une initiative technologique algérienne visant à moderniser
                la relation médecin-patient à travers des outils numériques de pointe.
                Notre support technique est basé à Alger et travaille quotidiennement pour
                assurer la disponibilité et la sécurité de vos données de santé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="section-header-centered">
            <h2>Questions Fréquentes</h2>
            <div className="title-underline centered"></div>
          </div>
          <div className="faq-grid">
            <div className="faq-item card">
              <h3>Comment signaler un problème technique ?</h3>
              <p>
                Envoyez-nous un email détaillé à {settings.supportEmail}.
                Une réponse vous sera adressée dans un délai de 24 heures ouvrables.
              </p>
            </div>

            <div className="faq-item card">
              <h3>Comment modifier mes informations de compte ?</h3>
              <p>
                Une fois connecté, rendez-vous dans vos paramètres de profil pour
                mettre à jour vos coordonnées ou vos préférences de sécurité.
              </p>
            </div>


            <div className="faq-item card">
              <h3>Puis-je changer de médecin traitant sur la plateforme ?</h3>
              <p>
                Vous avez la liberté totale de choisir plusieurs médecins
                selon vos besoins de santé spécifiques.
              </p>
            </div>


            <div className="faq-item card">
              <h3>Comment annuler ou reporter un rendez-vous ?</h3>
              <p>
                Depuis votre espace patient, accédez à "Mes rendez-vous" et sélectionnez
                l'option d'annulation ou de report au moins 24h à l'avance.
              </p>
            </div>

            <div className="faq-item card">
              <h3>La plateforme est-elle accessible sur mobile ?</h3>
              <p>
                Oui, HealthAegis est entièrement responsive et fonctionne parfaitement
                sur smartphone, tablette et ordinateur, sans installation requise.
              </p>
            </div>

            <div className="faq-item card">
              <h3>Comment sont protégées mes données médicales ?</h3>
              <p>
                Vos données sont chiffrées en transit et au repos selon les standards
                les plus stricts. Seuls vous et vos médecins autorisés y ont accès.
              </p>
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
        .contact-page {
          min-height: 100vh;
          background-color: var(--color-bg);
          overflow-x: hidden;
        }

        /* Navbar */
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

         .logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: #000;
          font-family: var(--font-display);
        }

        :global([data-theme='dark']) .logo-text {
          color: #fff;
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

        .nav-links a:hover {
          color: var(--color-primary);
        }

        /* Burger Menu */
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

        /* Hero Section */
        .page-hero {
          padding: 160px 0 60px;
          text-align: center;
          background: linear-gradient(135deg, 
            var(--hero-gradient-start) 0%, 
            var(--hero-gradient-end) 100%);
          border-bottom: 1px solid var(--color-border);
        }

        .page-hero h1 {
          font-size: var(--font-size-5xl);
          margin-bottom: var(--spacing-md);
          font-weight: 800;
          letter-spacing: -1px;
        }

        .page-hero p {
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Layout Grid */
        .contact-content {
          padding: var(--spacing-3xl) 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-2xl);
          align-items: start;
        }

        .section-title h2 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-xs);
          font-weight: 700;
        }

        .title-underline {
          width: 50px;
          height: 4px;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          margin-bottom: var(--spacing-xl);
        }

        .title-underline.centered {
          margin: var(--spacing-md) auto 0;
        }

        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .contact-info-card {
          padding: var(--spacing-xl);
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          border-radius: var(--radius-xl);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-primary);
        }

        .card-icon-wrapper {
          width: 60px;
          height: 60px;
          background: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-2xl);
          border-radius: var(--radius-lg);
          flex-shrink: 0;
        }

        .card-details h3 {
          font-size: var(--font-size-lg);
          margin-bottom: 4px;
        }

        .card-details p {
          font-weight: 600;
          font-size: var(--font-size-base);
          color: var(--color-text);
          word-break: break-all;
        }

        .availability {
          font-size: var(--font-size-xs);
          color: var(--color-text-tertiary);
          font-weight: 600;
          text-transform: uppercase;
        }

        /* Sidebar actions */
        .admin-side-actions {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .social-connect-card {
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
        }

        .social-btn {
          width: 45px;
          height: 45px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--color-text);
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          color: white;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .social-btn.facebook:hover { background: #1877F2; border-color: #1877F2; }
        .social-btn.instagram:hover { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border-color: transparent; }
        .social-btn.linkedin:hover { background: #0A66C2; border-color: #0A66C2; }

        .doctor-cta-card {
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          text-align: center;
        }

        .doctor-cta-card.special {
          background: linear-gradient(135deg, 
            hsla(210, 100%, 56%, 0.1) 0%, 
            hsla(280, 85%, 60%, 0.1) 100%);
          border: 2px solid var(--color-primary-light);
        }

        .btn-full {
          width: 100%;
          margin-top: var(--spacing-md);
        }

        /* Corporate Section */
        .corporate-section {
          padding: var(--spacing-3xl) 0;
          background-color: var(--color-bg-secondary);
        }

        .corporate-card {
          padding: var(--spacing-2xl);
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          border-radius: var(--radius-2xl);
        }

        .corp-header h2 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-md);
        }

        .corp-body p {
          font-size: var(--font-size-lg);
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        /* FAQ Section */
        .faq {
          padding: var(--spacing-3xl) 0;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-lg);
          margin-top: var(--spacing-2xl);
        }

        .faq-item {
          padding: var(--spacing-xl);
          height: 100%;
        }

        .section-header-centered {
          text-align: center;
        }

        .section-header-centered h2 {
          font-size: var(--font-size-3xl);
          font-weight: 700;
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
          animation: fadeIn 0.6s ease-out forwards;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }

          .admin-side-actions {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .social-connect-card, .doctor-cta-card {
            flex: 1;
            min-width: 300px;
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

          .page-hero {
            padding: 120px 0 40px;
          }

          .page-hero h1 {
            font-size: var(--font-size-3xl);
          }

          .page-hero p {
            font-size: var(--font-size-lg);
          }

          .section-title h2 {
            font-size: var(--font-size-2xl);
            text-align: center;
          }

          .title-underline {
            margin: 0 auto var(--spacing-xl);
          }

          .info-cards-grid {
            grid-template-columns: 1fr;
          }

          .corporate-card {
            padding: var(--spacing-xl);
          }

          .corp-header h2 {
            font-size: var(--font-size-2xl);
          }

          .admin-side-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .page-hero h1 {
            font-size: var(--font-size-2xl);
          }

          .contact-info-card {
            flex-direction: column;
            text-align: center;
            padding: var(--spacing-lg);
          }

          .card-icon-wrapper {
            margin-bottom: var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  );
}
