

"use client";


import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function AdminSettings() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const [contactSettings, setContactSettings] = useState({
        supportEmail: "contact@smarthealth.com",
        headOffice: "123 Rue de la Santé, Paris, France",
        adminPhone: "+33 1 23 45 67 89",
        googleMapsUrl: "https://www.google.com/maps?q=Alger,Algérie&t=&z=6&ie=UTF8&iwloc=&output=embed",
        socialLinks: {
            facebook: "https://facebook.com/smarthealth",
            instagram: "https://instagram.com/smarthealth",
            linkedin: "https://linkedin.com/company/smarthealth"
        }
    });

    const [contactSuccess, setContactSuccess] = useState("");

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (!data.error) setUser(data);
            })
            .catch(console.error);

        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setContactSettings({
                        supportEmail: data.supportEmail || "contact@smarthealth.com",
                        headOffice: data.headOffice || "",
                        adminPhone: data.adminPhone || "",
                        googleMapsUrl: data.googleMapsUrl || "https://www.google.com/maps?q=Alger,Algérie&t=&z=6&ie=UTF8&iwloc=&output=embed",
                        socialLinks: {
                            facebook: data.facebook || "",
                            instagram: data.instagram || "",
                            linkedin: data.linkedin || ""
                        }
                    });
                }
            })
            .catch(console.error);
    }, []);

    const handleSaveContact = async () => {
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    supportEmail: contactSettings.supportEmail,
                    headOffice: contactSettings.headOffice,
                    adminPhone: contactSettings.adminPhone,
                    facebook: contactSettings.socialLinks.facebook,
                    instagram: contactSettings.socialLinks.instagram,
                    linkedin: contactSettings.socialLinks.linkedin,
                    googleMapsUrl: contactSettings.googleMapsUrl
                })
            });
            if (res.ok) {
                setContactSuccess("Informations de contact mises à jour avec succès !");
            } else {
                setContactSuccess("Erreur lors de la mise à jour");
            }
        } catch (error) {
            setContactSuccess("Erreur de connexion");
        }
        setTimeout(() => setContactSuccess(""), 4000);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (passwords.new !== passwords.confirm) {
            setPasswordError("Les nouveaux mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.new,
                    confirmPassword: passwords.confirm
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Une erreur est survenue");
            }

            setPasswordSuccess("Mot de passe mis à jour avec succès");
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (err: any) {
            setPasswordError(err.message);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <AdminSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="page-header">
                    <div>
                        <h1>Paramètres</h1>
                        <p>Configuration de la plateforme</p>
                    </div>
                </header>

                <section className="content-section">
                    <div className="settings-grid">
                        <div className="card settings-card glass animate-fade-in">
                            <h3>Informations Personnelles</h3>
                            {user ? (
                                <div className="settings-group">
                                    <div className="info-item">
                                        <label>Nom complet</label>
                                        <p className="info-value">{user.firstName} {user.lastName}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <p className="info-value">{user.email}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Rôle</label>
                                        <span className={`role-tag ${user.role.toLowerCase()}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <label>Membre depuis</label>
                                        <p className="info-value">
                                            {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p>Chargement...</p>
                            )}
                        </div>

                        <div className="card settings-card glass animate-fade-in">
                            <h3>Apparence</h3>
                            <div className="settings-group">
                                <div className="info-item">
                                    <label>Thème de l'interface</label>
                                    <p className="mb-4 text-sm text-secondary">Personnalisez l'apparence de votre espace de travail.</p>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>

                        <div className="card settings-card glass animate-fade-in">
                            <h3>Sécurité</h3>
                            <div className="settings-group">
                                <form onSubmit={handlePasswordChange} className="password-form">
                                    <h4>Changer le mot de passe</h4>
                                    {passwordError && <div className="error-message">{passwordError}</div>}
                                    {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

                                    <div className="form-group">
                                        <label>Mot de passe actuel</label>
                                        <input
                                            type="password"
                                            className="input"
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            className="input"
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirmer le nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            className="input"
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Mettre à jour le mot de passe</button>
                                </form>
                            </div>
                        </div>

                        <div className="card settings-card glass animate-fade-in">
                            <h3>Contact & Réseaux Sociaux</h3>
                            <div className="settings-group">
                                <div className="contact-form">
                                    {contactSuccess && <div className="success-message mb-6">{contactSuccess}</div>}

                                    <div className="contact-grid">

                                        <div className="form-group">
                                            <label>Téléphone admin</label>
                                            <div className="input-wrapper">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={contactSettings.adminPhone}
                                                    placeholder="📞 +33 1 23 45 67 89"
                                                    onChange={(e) => setContactSettings({ ...contactSettings, adminPhone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group full-width">
                                            <label>Siège Social</label>
                                            <div className="input-wrapper">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={contactSettings.headOffice}
                                                    placeholder="📍 123 Rue de la Santé, Paris, France"
                                                    onChange={(e) => setContactSettings({ ...contactSettings, headOffice: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="social-links-area mt-8">
                                        <h4 className="section-subtitle">Présence en Ligne</h4>
                                        <div className="social-grid">
                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="📘 Lien Facebook (https://...)"
                                                        value={contactSettings.socialLinks.facebook}
                                                        onChange={(e) => setContactSettings({
                                                            ...contactSettings,
                                                            socialLinks: { ...contactSettings.socialLinks, facebook: e.target.value }
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="📸 Lien Instagram (https://...)"
                                                        value={contactSettings.socialLinks.instagram}
                                                        onChange={(e) => setContactSettings({
                                                            ...contactSettings,
                                                            socialLinks: { ...contactSettings.socialLinks, instagram: e.target.value }
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="💼 Lien LinkedIn (https://...)"
                                                        value={contactSettings.socialLinks.linkedin}
                                                        onChange={(e) => setContactSettings({
                                                            ...contactSettings,
                                                            socialLinks: { ...contactSettings.socialLinks, linkedin: e.target.value }
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: '20px', marginBottom: '30px' }}>
                                        <label>URL Google Maps</label>
                                        <div className="input-wrapper">
                                            <input
                                                type="url"
                                                className="input"
                                                value={contactSettings.googleMapsUrl}
                                                onChange={(e) => setContactSettings({ ...contactSettings, googleMapsUrl: e.target.value })}
                                                placeholder="🗺️ Lien src= Google Maps"
                                            />
                                        </div>
                                        <p className="text-secondary text-xs" style={{ marginTop: '8px' }}>Insérez la valeur de l'attribut src de l'iframe Google Maps.</p>
                                    </div>

                                    <div style={{ paddingTop: '20px' }}>
                                        <button
                                            onClick={handleSaveContact}
                                            className="btn btn-gradient w-full"
                                        >
                                            Sauvegarder les modifications
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card settings-card full-width glass animate-fade-in">
                            <h3>Gestion des Rôles & Permissions</h3>
                            <div className="roles-table-wrapper">
                                <table className="roles-table">
                                    <thead>
                                        <tr>
                                            <th>Rôle</th>
                                            <th>Description</th>
                                            <th>Permissions Clés</th>
                                            <th className="text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="role-tag admin">Administrateur</span>
                                            </td>
                                            <td>Accès total à la plateforme et gestion des utilisateurs.</td>
                                            <td>Lecture, Écriture, Suppression, Config</td>
                                            <td className="text-right">
                                                <button className="btn-text" disabled>Fixe</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="role-tag doctor">Médecin</span>
                                            </td>
                                            <td>Professionnel de santé avec accès aux profils patients.</td>
                                            <td>Lecture (Patients), Écriture (Scans)</td>
                                            <td className="text-right">
                                                <button className="btn-text">Modifier</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="role-tag patient">Patient</span>
                                            </td>
                                            <td>Utilisateur final consultant ses propres données.</td>
                                            <td>Lecture (Soi), Partage</td>
                                            <td className="text-right">
                                                <button className="btn-text">Modifier</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <style jsx>{`
                .dashboard-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background: var(--color-bg-secondary);
                }

                .main-content {
                    flex: 1;
                    margin-left: 280px;
                    padding: var(--spacing-2xl);
                    width: calc(100% - 280px);
                    transition: all 0.3s ease;
                }

                .page-header {
                    margin-bottom: var(--spacing-2xl);
                }

                .page-header h1 {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-xs);
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .page-header p {
                    color: var(--color-text-secondary);
                    margin: 0;
                    font-size: var(--font-size-lg);
                }

                /* Settings Grid */
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: var(--spacing-xl);
                }

                .settings-card {
                    padding: var(--spacing-xl);
                    background: var(--color-bg);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-lg);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid var(--color-border-light);
                }

                .settings-card.glass {
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                }

                .settings-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-xl);
                }

                .settings-card.full-width {
                    grid-column: 1 / -1;
                }

                .settings-card h3 {
                    margin-bottom: var(--spacing-lg);
                    padding-bottom: var(--spacing-md);
                    border-bottom: 1px solid var(--color-border-light);
                    color: var(--color-primary);
                    font-size: 1.25rem;
                }

                .roles-table-wrapper {
                    margin-top: var(--spacing-md);
                    overflow-x: auto;
                }

                .roles-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .roles-table th {
                    text-align: left;
                    padding: 12px;
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    border-bottom: 2px solid var(--color-border-light);
                }

                .roles-table td {
                    padding: 16px 12px;
                    border-bottom: 1px solid var(--color-border-light);
                    font-size: var(--font-size-sm);
                }

                .role-tag {
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .role-tag.admin { background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); }
                .role-tag.doctor { background: hsla(260, 100%, 65%, 0.1); color: var(--color-secondary); }
                .role-tag.patient { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); }

                .btn-text {
                    background: none;
                    border: none;
                    color: var(--color-primary);
                    font-weight: 600;
                    cursor: pointer;
                    font-size: var(--font-size-sm);
                }

                .btn-text:disabled {
                    color: var(--color-text-secondary);
                    cursor: not-allowed;
                }

                .text-right { text-align: right; }

                .input {
                    width: 100%;
                    padding: 10px 14px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    background: var(--color-bg-secondary);
                    color: var(--color-text);
                }

                .input:focus {
                    border-color: var(--color-primary);
                    outline: none;
                    box-shadow: 0 0 0 4px hsla(210, 100%, 56%, 0.15);
                    background: var(--color-bg);
                }

                .input:disabled {
                    cursor: not-allowed;
                    opacity: 0.7;
                    background: var(--color-bg-tertiary);
                }

                .settings-group {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .setting-info h4 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                }

                .setting-info p {
                    font-size: var(--font-size-sm);
                    margin: 0;
                }

                .info-item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .info-item label {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                    font-weight: 600;
                }

                .info-value {
                    font-size: 1.1rem;
                    color: var(--color-text);
                    font-weight: 500;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: var(--spacing-sm);
                }

                /* Switch Toggle */
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 28px;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--color-border);
                    transition: .4s;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 22px;
                    width: 22px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                    box-shadow: var(--shadow-sm);
                }

                input:checked + .slider {
                    background-color: var(--color-success);
                }

                input:checked + .slider:before {
                    transform: translateX(22px);
                }

                .slider.round {
                    border-radius: 34px;
                }

                .slider.round:before {
                    border-radius: 50%;
                }

                @media (max-width: 968px) {
                    .mobile-header { display: flex; }
                    .main-content { margin-left: 0; padding: 5.5rem 1rem 2rem; width: 100%; transition: margin-left 0.3s ease; }
                    .sidebar { transform: translateX(-100%); width: 280px; z-index: 1045; }
                    .sidebar.open { transform: translateX(0); }
                    .page-header h1 { font-size: 2.25rem; }
                    .settings-grid { grid-template-columns: 1fr; }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .password-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                    padding-bottom: var(--spacing-lg);
                    border-bottom: 1px solid var(--color-border-light);
                }

                .password-form h4 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                    color: var(--color-text);
                }

                .btn {
                    padding: 10px 20px;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    border: none;
                }

                .btn-primary {
                    background: var(--color-primary);
                    color: white;
                }

                .btn-primary:hover {
                    background: var(--color-primary-dark);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                }

                .error-message {
                    color: var(--color-danger);
                    background: hsla(0, 84%, 60%, 0.1);
                    padding: var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-sm);
                }

                .success-message {
                    color: var(--color-success);
                    background: hsla(142, 71%, 45%, 0.1);
                    padding: var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-sm);
                }

                .input-wrapper {
                    position: relative;
                    width: 100%;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--spacing-lg);
                }

                .contact-grid .full-width {
                    grid-column: 1 / -1;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    margin-bottom: var(--spacing-lg);
                    color: var(--color-text);
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .section-subtitle::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(to right, var(--color-border-light), transparent);
                }

                .social-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--spacing-md);
                }

                .btn-gradient {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    color: white;
                    border: none;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                }

                .btn-gradient:hover {
                    transform: translateY(-2px) scale(1.01);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                    filter: brightness(1.1);
                }

                .w-full { width: 100%; }
                .mb-6 { margin-bottom: var(--spacing-xl); }
                .mt-8 { margin-top: var(--spacing-2xl); }
                .text-xs { font-size: 0.75rem; }

                @media (max-width: 1200px) {
                    .social-grid { grid-template-columns: 1fr; }
                    .contact-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

