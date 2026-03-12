"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { DoctorSidebar } from "./DoctorSidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type DoctorSettingsProps = {
    doctor: any;
};

export default function DoctorSettingsClient({ doctor }: DoctorSettingsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [photoPreview, setPhotoPreview] = useState(doctor.avatar || "");

    // Profile State
    const [formData, setFormData] = useState({
        // Personal
        firstName: doctor.firstName || "",
        lastName: doctor.lastName || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        gender: doctor.doctorProfile?.gender || "",
        avatar: doctor.avatar || "",

        // Professional
        specialty: doctor.doctorProfile?.specialty || "",
        licenseNumber: doctor.doctorProfile?.licenseNumber || "",
        yearsOfExperience: doctor.doctorProfile?.yearsOfExperience || "",
        spokenLanguages: "", // Will parse from JSON

        // Contact
        clinicAddress: doctor.doctorProfile?.clinicAddress || "",
        wilaya: doctor.doctorProfile?.city || "",
        daira: "",
        baladiya: "",
        country: doctor.doctorProfile?.country || "Algérie",

        // App
        bio: doctor.doctorProfile?.bio || "",
        consultationFee: doctor.doctorProfile?.consultationFee || "",
        consultationMode: doctor.doctorProfile?.consultationMode || "BOTH",
        availability: "", // Will parse from JSON

        // Social Media
        linkedin: doctor.doctorProfile?.linkedin || "",
        whatsapp: doctor.doctorProfile?.whatsapp || "",
        telegram: doctor.doctorProfile?.telegram || "",
        googleMapsLink: doctor.doctorProfile?.googleMapsLink || "",
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    useEffect(() => {
        // Parse JSON fields and city components
        try {
            const languages = JSON.parse(doctor.doctorProfile?.spokenLanguages || "[]");
            const avail = JSON.parse(doctor.doctorProfile?.availability || "{}");

            // Parse city field into Algerian administrative divisions
            const cityParts = (doctor.doctorProfile?.city || "").split(" - ");
            const [wilaya = "", daira = "", baladiya = ""] = cityParts;

            setFormData(prev => ({
                ...prev,
                wilaya: wilaya || prev.wilaya,
                daira: daira,
                baladiya: baladiya,
                spokenLanguages: Array.isArray(languages) ? languages.join(", ") : languages,
                availability: typeof avail === 'string' ? avail : JSON.stringify(avail, null, 2)
            }));
        } catch (e) {
            console.error("Error parsing profile JSON", e);
        }
    }, [doctor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setMessage({ type: "error", text: "Veuillez sélectionner une image" });
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setMessage({ type: "error", text: "L'image doit faire moins de 2MB" });
                return;
            }

            // Convert to base64
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
            // Format data for API - combine Algerian location fields
            const cityData = [formData.wilaya, formData.daira, formData.baladiya]
                .filter(Boolean)
                .join(" - ");

            const apiData = {
                ...formData,
                city: cityData || formData.wilaya, // Use combined or just wilaya
                spokenLanguages: formData.spokenLanguages.split(",").map(lang => lang.trim()).filter(Boolean),
                availability: formData.availability,
            };

            const response = await fetch("/api/doctor/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiData)
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Erreur lors de la mise à jour");

            setMessage({ type: "success", text: "Profil mis à jour avec succès" });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (passwords.new !== passwords.confirm) {
            setMessage({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas" });
            return;
        }

        try {
            const response = await fetch("/api/doctor/change-password", {
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
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        }
    };

    return (
        <div className="dashboard-wrapper">
            <DoctorSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Paramètres</h1>
                        <p>Gérez vos informations et votre sécurité</p>
                    </div>
                </header>

                {message.text && (
                    <div className={`message-alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="settings-grid">
                    {/* General Information Form */}
                    <form onSubmit={handleProfileUpdate} className="card glass p-6 profile-form">
                        <h2 className="section-title">Informations Générales</h2>

                        {/* Personal Info */}
                        <h3 className="subsection-title">Informations Personnelles</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Prénom</label>
                                <input type="text" name="firstName" value={formData.firstName} className="input" disabled />
                            </div>
                            <div className="form-group">
                                <label>Nom</label>
                                <input type="text" name="lastName" value={formData.lastName} className="input" disabled />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} className="input" disabled />
                            </div>
                            <div className="form-group">
                                <label>Téléphone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" disabled />
                            </div>
                            <div className="form-group">
                                <label>Sexe</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="input">
                                    <option value="">Sélectionner</option>
                                    <option value="M">Homme</option>
                                    <option value="F">Femme</option>
                                    <option value="O">Autre</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Photo de profil</label>
                                <div className="photo-upload-wrapper">
                                    <div className="photo-preview-circle">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Photo de profil" />
                                        ) : (
                                            <div className="photo-placeholder">
                                                <span className="placeholder-icon">👤</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="photo-upload-controls">
                                        <label htmlFor="photo-upload" className="btn btn-secondary">
                                            📷 Choisir une photo
                                        </label>
                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="file-input-hidden"
                                        />
                                        <p className="help-text">Max 2MB - JPG, PNG, GIF</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Info */}
                        <h3 className="subsection-title">Informations Professionnelles</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Numéro RPPS</label>
                                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="input" />
                            </div>
                            <div className="form-group">
                                <label>Spécialité</label>
                                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="input" />
                            </div>
                            <div className="form-group">
                                <label>Années d'expérience</label>
                                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="input" />
                            </div>
                            <div className="form-group">
                                <label>Langues parlées (séparées par des virgules)</label>
                                <input type="text" name="spokenLanguages" value={formData.spokenLanguages} onChange={handleChange} className="input" placeholder="Français, Anglais..." />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <h3 className="subsection-title">Coordonnées</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Adresse du cabinet</label>
                                <input type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} className="input" />
                            </div>
                            <div className="form-group">
                                <label>Wilaya</label>
                                <input type="text" name="wilaya" value={formData.wilaya} onChange={handleChange} className="input" placeholder="Ex: Alger" />
                            </div>
                            <div className="form-group">
                                <label>Daïra</label>
                                <input type="text" name="daira" value={formData.daira} onChange={handleChange} className="input" placeholder="Ex: Sidi M'Hamed" />
                            </div>
                            <div className="form-group">
                                <label>Baladiya</label>
                                <input type="text" name="baladiya" value={formData.baladiya} onChange={handleChange} className="input" placeholder="Ex: Alger Centre" />
                            </div>
                            <div className="form-group">
                                <label>Pays</label>
                                <input type="text" name="country" value={formData.country} className="input" disabled />
                            </div>
                        </div>

                        {/* App Info */}
                        <h3 className="subsection-title">Paramètres Application</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Mode de consultation</label>
                                <select name="consultationMode" value={formData.consultationMode} onChange={handleChange} className="input">
                                    <option value="IN_PERSON">Présentiel</option>
                                    <option value="VIDEO">Vidéo</option>
                                    <option value="BOTH">Les deux</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tarif consultation (DA)</label>
                                <input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleChange} className="input" step="0.01" />
                            </div>
                            <div className="form-group full-width">
                                <label>Biographie / Description</label>
                                <textarea name="bio" value={formData.bio} onChange={handleChange} className="input textarea" rows={4} />
                            </div>
                            <div className="form-group full-width">
                                <label>Horaires de disponibilité (Texte libre)</label>
                                <textarea name="availability" value={formData.availability} onChange={handleChange} className="input textarea" rows={3} placeholder="Lundi: 9h-17h..." />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                            </button>
                        </div>
                    </form>

                    {/* Appearance Section */}
                    <section className="card glass p-6">
                        <h2 className="section-title">Apparence</h2>
                        <div className="form-group">
                            <label>Thème de l'interface</label>
                            <p className="text-sm text-secondary mb-4">Personnalisez l'apparence de votre espace de travail.</p>
                            <ThemeToggle />
                        </div>
                    </section>

                    {/* Password Change */}
                    <section className="card glass p-6">
                        <h2 className="section-title">Sécurité</h2>
                        <form onSubmit={handlePasswordChange} className="password-form">
                            <h4>Changer le mot de passe</h4>
                            <div className="form-group">
                                <label>Mot de passe actuel</label>
                                <input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="input" required />
                            </div>
                            <div className="form-group">
                                <label>Nouveau mot de passe</label>
                                <input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="input" required minLength={6} />
                            </div>
                            <div className="form-group">
                                <label>Confirmer</label>
                                <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="input" required minLength={6} />
                            </div>
                            <button type="submit" className="btn btn-primary">Mettre à jour le mot de passe</button>
                        </form>
                    </section>

                    {/* Social Media Section */}
                    <section className="card glass p-6">
                        <h2 className="section-title">Réseaux sociaux</h2>
                        <form onSubmit={handleProfileUpdate} className="social-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>LinkedIn</label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp</label>
                                    <input
                                        type="url"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="https://wa.me/213..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Telegram</label>
                                    <input
                                        type="url"
                                        name="telegram"
                                        value={formData.telegram}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="https://t.me/username"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Lien Google Maps</label>
                                    <input
                                        type="url"
                                        name="googleMapsLink"
                                        value={formData.googleMapsLink}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="https://maps.google.com/..."
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? "Enregistrement..." : "Enregistrer"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                
                .main-content { 
                    margin-left: 280px; 
                    padding: var(--spacing-2xl); 
                    width: calc(100% - 280px); 
                    transition: all 0.3s ease;
                }
                
                .dashboard-header { margin-bottom: var(--spacing-2xl); }
                .dashboard-header h1 { font-size: var(--font-size-4xl); margin-bottom: var(--spacing-xs); background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .dashboard-header p { color: var(--color-text-secondary); font-size: var(--font-size-lg); }
                .settings-grid { display: flex; flex-direction: column; gap: var(--spacing-xl); }
                .card { background: var(--color-bg); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); }
                .p-6 { padding: var(--spacing-xl); }
                .section-title { margin-bottom: var(--spacing-lg); padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--color-border-light); color: var(--color-primary); font-size: 1.25rem; font-weight: 700; }
                .subsection-title { font-size: 1.1rem; color: var(--color-text); margin: var(--spacing-lg) 0 var(--spacing-md); font-weight: 600; }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-lg); }
                .full-width { grid-column: 1 / -1; }
                .form-group { display: flex; flex-direction: column; gap: var(--spacing-xs); }
                .form-group label { font-size: 0.9rem; font-weight: 600; color: var(--color-text-secondary); }
                .input { padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text); width: 100%; }
                .input:focus { border-color: var(--color-primary); outline: none; box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.1); }
                .textarea { resize: vertical; min-height: 100px; }
                .form-actions { margin-top: var(--spacing-xl); display: flex; justify-content: flex-end; }
                .btn { padding: 12px 24px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: none; transition: all var(--transition-fast); }
                .btn-primary { background: var(--color-primary); color: white; }
                .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
                .message-alert { padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-lg); font-weight: 500; }
                .message-alert.success { background: var(--color-bg-tertiary); color: var(--color-success); border: 1px solid var(--color-border); }
                .message-alert.error { background: var(--color-bg-tertiary); color: var(--color-danger); border: 1px solid var(--color-border); }
                .password-form { display: flex; flex-direction: column; gap: var(--spacing-md); }

                /* Photo Upload Styles */
                .photo-upload-wrapper { display: flex; align-items: center; gap: var(--spacing-xl); }
                .photo-preview-circle { width: 140px; height: 140px; border-radius: 50%; overflow: hidden; border: 4px solid var(--color-primary); box-shadow: var(--shadow-md); background: var(--color-bg-secondary); display: flex; align-items: center; justify-content: center; }
                .photo-preview-circle img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
                .photo-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); border-radius: 50%; }
                .placeholder-icon { font-size: 4rem; opacity: 0.5; }
                .photo-upload-controls { display: flex; flex-direction: column; gap: var(--spacing-sm); }
                .file-input-hidden { display: none; }
                .btn-secondary { background: var(--color-bg-secondary); color: var(--color-text); border: 2px solid var(--color-border); padding: 10px 20px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all var(--transition-fast); display: inline-block; }
                .btn-secondary:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
                .help-text { font-size: 0.85rem; color: var(--color-text-secondary); margin: 0; }

                @media (max-width: 1024px) {
                    .main-content { 
                        margin-left: 0; 
                        width: 100%; 
                        padding: var(--spacing-xl); 
                        padding-top: 100px; 
                    }
                }
            `}</style>
        </div>
    );
}
