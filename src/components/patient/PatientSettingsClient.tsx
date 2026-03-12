"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PatientSidebar } from "./PatientSidebar";
import {
    FiUser,
    FiLock,
    FiCamera,
    FiMail,
    FiPhone,
    FiCalendar,
    FiCheck,
    FiAlertTriangle,
    FiChevronRight,
    FiMonitor
} from "react-icons/fi";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type PatientSettingsProps = {
    patient: any;
};

export default function PatientSettingsClient({ patient }: PatientSettingsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [photoPreview, setPhotoPreview] = useState(patient.avatar || "");
    const [age, setAge] = useState<number | null>(null);

    // Profile State
    const [formData, setFormData] = useState({
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        email: patient.email || "",
        phone: patient.phone || "",
        avatar: patient.avatar || "",
        gender: patient.healthProfile?.gender || "",
        birthDate: patient.healthProfile?.birthDate ? new Date(patient.healthProfile.birthDate).toISOString().split('T')[0] : "",
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    // Calculate age automatically when birthDate changes
    useEffect(() => {
        if (formData.birthDate) {
            const today = new Date();
            const birth = new Date(formData.birthDate);
            let calculatedAge = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                calculatedAge--;
            }
            setAge(calculatedAge);
        } else {
            setAge(null);
        }
    }, [formData.birthDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setMessage({ type: "error", text: "Veuillez sélectionner une image" });
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setMessage({ type: "error", text: "L'image doit faire moins de 2MB" });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPhotoPreview(base64String);
                setFormData(prev => ({ ...prev, avatar: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch("/api/patient/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur lors de la mise à jour");

            setMessage({ type: "success", text: "Profil mis à jour avec succès" });
            // Automatic hide after 3s
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        if (passwords.new !== passwords.confirm) {
            setMessage({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas" });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/patient/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.new,
                    confirmPassword: passwords.confirm
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setMessage({ type: "success", text: "Mot de passe modifié avec succès" });
            setPasswords({ current: "", new: "", confirm: "" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <PatientSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <div className="page-header animate-fade-in">
                    <div>
                        <h1>⚙️ Paramètres</h1>
                        <p>Gérez vos informations personnelles et sécurisez votre compte</p>
                    </div>
                </div>

                <div className="settings-container animate-fade-in">
                    {message.text && (
                        <div className={`message-banner ${message.type}`}>
                            <span className="banner-icon">
                                {message.type === 'success' ? <FiCheck /> : '⚠️'}
                            </span>
                            <span className="banner-text">{message.text}</span>
                        </div>
                    )}

                    <div className="settings-grid">
                        {/* Section 1 — Profil */}
                        <div className="card glass settings-card profile-section">
                            <div className="card-header">
                                <div className="header-icon-box profile">
                                    <FiUser />
                                </div>
                                <div>
                                    <h2 className="card-title">Informations Personnelles</h2>
                                    <p className="card-subtitle">Mettez à jour vos informations de contact</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileUpdate} className="settings-form">
                                <div className="photo-section">
                                    <div className="photo-preview-box">
                                        <div className="avatar-preview">
                                            {photoPreview ? (
                                                <img src={photoPreview} alt="Aperçu" className="profile-img" />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    <FiUser />
                                                </div>
                                            )}
                                            <label htmlFor="photo-upload" className="edit-avatar-badge" title="Changer la photo">
                                                <FiCamera />
                                            </label>
                                        </div>
                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="hidden-input"
                                        />
                                    </div>
                                    <div className="photo-info">
                                        <h3>Avatar du Compte</h3>
                                        <p>Recommandé : 400x400px. Max 2MB.</p>
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="input-group">
                                        <label><FiUser className="label-icon" /> Prénom</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" placeholder="Prénom" required />
                                    </div>
                                    <div className="input-group">
                                        <label><FiUser className="label-icon" /> Nom</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" placeholder="Nom de famille" required />
                                    </div>
                                    <div className="input-group full-width">
                                        <label><FiMail className="label-icon" /> Email Professionnel</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" placeholder="email@exemple.com" required />
                                    </div>
                                    <div className="input-group">
                                        <label><FiPhone className="label-icon" /> Téléphone</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="+33 ..." />
                                    </div>
                                    <div className="input-group">
                                        <label>Sexe</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} className="input select-input">
                                            <option value="">Non spécifié</option>
                                            <option value="M">Homme</option>
                                            <option value="F">Femme</option>
                                            <option value="O">Autre</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label><FiCalendar className="label-icon" /> Date de naissance</label>
                                        <div className="date-input-wrapper">
                                            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="input" />
                                            {age !== null && (
                                                <span className="premium-age-badge">{age} ans</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-footer">
                                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                        {loading ? "Mise à jour..." : "Enregistrer le profil"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Section 2 — Apparence */}
                        <div className="card glass settings-card appearance-section">
                            <div className="card-header">
                                <div className="header-icon-box appearance">
                                    <FiMonitor />
                                </div>
                                <div>
                                    <h2 className="card-title">Apparence</h2>
                                    <p className="card-subtitle">Personnalisez l'affichage de votre espace</p>
                                </div>
                            </div>
                            <div className="settings-content p-4">
                                <div className="form-group">
                                    <label className="mb-2 block font-semibold">Thème de l'interface</label>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>

                        {/* Section 3 — Sécurité */}
                        <div className="card glass settings-card security-section">
                            <div className="card-header">
                                <div className="header-icon-box security">
                                    <FiLock />
                                </div>
                                <div>
                                    <h2 className="card-title">Sécurité du Compte</h2>
                                    <p className="card-subtitle">Modifier votre mot de passe d'accès</p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordChange} className="settings-form">
                                <div className="form-grid-single">
                                    <div className="input-group">
                                        <label>Mot de passe actuel</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            className="input"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            placeholder="Nouveau mot de passe"
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            className="input"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Confirmer le nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            placeholder="Confirmer le mot de passe"
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            className="input"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="form-footer mt-auto">
                                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                        {loading ? "Vérification..." : "Actualiser le mot de passe"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Section 3 — Rapports & Signalements */}
                        <div className="card glass settings-card reports-section full-width-mobile">
                            <div className="card-header">
                                <div className="header-icon-box reports">
                                    <FiAlertTriangle />
                                </div>
                                <div>
                                    <h2 className="card-title">Rapports & Signalements</h2>
                                    <p className="card-subtitle">Gérez vos signalements de produits</p>
                                </div>
                            </div>

                            <div className="reports-content">
                                <p className="description">
                                    Accédez à l'historique de vos signalements de produits pour suivre vos soumissions et voir les retours éventuels.
                                </p>
                                <Link href="/patient/reports" className="btn btn-secondary-light btn-full-link">
                                    <span>Accéder aux signalements</span>
                                    <FiChevronRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .main-content {
                    padding: var(--spacing-xl);
                    margin-left: 280px;
                    width: calc(100% - 280px);
                    max-width: 1400px;
                    transition: all 0.3s ease;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2.5rem;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .page-header h1 {
                    font-size: clamp(1.75rem, 4vw, 2.5rem);
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 800;
                }

                .page-header p {
                    color: var(--color-text-secondary);
                    margin: 0;
                    font-size: 1.05rem;
                    line-height: 1.5;
                }

                .settings-container {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }

                /* Message Banner */
                .message-banner {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    margin-bottom: var(--spacing-md);
                    animation: slideDown 0.3s ease;
                }
                .message-banner.success { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); border: 1px solid hsla(142, 71%, 45%, 0.2); }
                .message-banner.error { background: hsla(0, 84%, 60%, 0.1); color: var(--color-danger); border: 1px solid hsla(0, 84%, 60%, 0.2); }
                
                @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

                /* Settings Grid */
                .settings-grid {
                    display: grid;
                    grid-template-columns: 3fr 2fr;
                    gap: var(--spacing-xl);
                    align-items: start;
                }

                .settings-card {
                    padding: var(--spacing-xl);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                    box-shadow: var(--shadow-md);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                }

                .header-icon-box {
                    width: 54px;
                    height: 54px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                .header-icon-box.profile { background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); }
                .header-icon-box.appearance { background: hsla(0, 0%, 50%, 0.1); color: var(--color-text); }
                .header-icon-box.security { background: hsla(280, 85%, 60%, 0.1); color: var(--color-secondary); }
                .header-icon-box.reports { background: hsla(35, 100%, 50%, 0.1); color: #d97706; }

                .card-title { font-size: 1.4rem; margin: 0; font-weight: 700; }
                .card-subtitle { font-size: 0.9rem; color: var(--color-text-secondary); margin: 0; }

                /* Photo Section */
                .photo-section {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xl);
                    padding-bottom: var(--spacing-xl);
                    border-bottom: 1px solid var(--color-border-light);
                    margin-bottom: var(--spacing-xl);
                }

                .avatar-preview {
                    position: relative;
                    width: 100px;
                    height: 100px;
                }

                .profile-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid var(--color-bg);
                    box-shadow: var(--shadow-md);
                }

                .avatar-placeholder {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: var(--color-bg-tertiary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    color: var(--color-text-tertiary);
                }

                .edit-avatar-badge {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 32px;
                    height: 32px;
                    background: var(--color-primary);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                    border: 3px solid var(--color-bg);
                }
                .edit-avatar-badge:hover { transform: scale(1.1); background: var(--color-primary-dark); }

                .photo-info h3 { font-size: 1.1rem; margin: 0 0 5px 0; }
                .photo-info p { margin: 0; font-size: 0.85rem; }

                /* Form Elements */
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-lg);
                }
                .form-grid-single {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                    flex: 1;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .input-group.full-width { grid-column: span 2; }

                .input-group label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: var(--color-text);
                }

                .label-icon { color: var(--color-primary); font-size: 0.8rem; }

                .date-input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .premium-age-badge {
                    position: absolute;
                    right: 12px;
                    background: var(--color-primary-light);
                    color: white;
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    box-shadow: var(--shadow-sm);
                }

                .reports-content {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }

                .reports-content .description {
                    color: var(--color-text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .btn-secondary-light {
                    background: hsla(35, 100%, 50%, 0.1);
                    color: #d97706;
                    border: 1px solid hsla(35, 100%, 50%, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 20px;
                    border-radius: var(--radius-lg);
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .btn-secondary-light:hover {
                    background: #d97706;
                    color: white;
                    transform: translateX(5px);
                }

                .btn-full { width: 100%; margin-top: var(--spacing-md); padding: 14px; font-size: 1.05rem; }
                .hidden-input { display: none; }

                /* Responsive */
                @media (max-width: 1024px) {
                    .settings-grid { grid-template-columns: 1fr; }
                    .reports-section { grid-column: 1; }
                    .main-content { 
                        margin-left: 0;
                        width: 100%;
                        padding: var(--spacing-lg);
                        padding-top: 80px; 
                    }
                }

                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .input-group.full-width { grid-column: span 1; }
                    .photo-section { flex-direction: column; text-align: center; }
                }
            `}</style>
        </div>
    );
}
