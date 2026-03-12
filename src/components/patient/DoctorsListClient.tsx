"use client";

import { useState, useEffect } from "react";
import { PatientSidebar } from "./PatientSidebar";

type DoctorsListProps = {
    patient: any;
    doctors: any[];
};

export default function DoctorsListClient({ patient, doctors: initialDoctors }: DoctorsListProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState({ type: "", text: "" });

    // Booking form state
    const [bookingData, setBookingData] = useState({
        date: "",
        notes: "",
        phone: patient.phone || "",
    });

    // Filtering
    const filteredDoctors = initialDoctors.filter(doctor => {
        const searchLower = searchTerm.toLowerCase().trim();
        if (!searchLower) return true;

        const searchWords = searchLower.split(/\s+/);
        const searchableText = `${doctor.firstName} ${doctor.lastName} ${doctor.doctorProfile?.specialty || ""} ${doctor.doctorProfile?.city || ""} ${doctor.doctorProfile?.clinicAddress || ""}`.toLowerCase();

        return searchWords.every(word => searchableText.includes(word));
    });

    const calculateAge = (birthDate: string) => {
        if (!birthDate) return null;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const patientAge = calculateAge(patient.healthProfile?.birthDate);

    const handleOpenBooking = (doctor: any) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
        setBookingMessage({ type: "", text: "" });
    };

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setBookingMessage({ type: "", text: "" });

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorId: selectedDoctor.id,
                    date: bookingData.date,
                    notes: bookingData.notes
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur lors de la réservation");

            setBookingMessage({ type: "success", text: "Rendez-vous réservé avec succès !" });
            setTimeout(() => {
                setIsBookingModalOpen(false);
                setSelectedDoctor(null);
                setBookingData({ date: "", notes: "", phone: patient.phone || "" });
            }, 2000);
        } catch (err: any) {
            setBookingMessage({ type: "error", text: err.message });
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

            {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />}

            <main className="main-content">
                <header className="dashboard-header">
                    <div className="header-info">
                        <h1>Nos Partenaires Santé</h1>
                        <p>Prenez rendez-vous avec les meilleurs spécialistes de votre région en quelques clics.</p>
                    </div>
                    <div className="search-box-wrapper">
                        <div className="search-input-group glass">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Rechercher par nom, spécialité ou wilaya..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                </header>

                <div className="doctors-grid">
                    {filteredDoctors.map(doctor => {
                        const cityParts = (doctor.doctorProfile?.city || "").split(" - ");
                        const [wilaya = "", daira = "", baladiya = ""] = cityParts;

                        return (
                            <div key={doctor.id} className="doctor-card glass-premium animate-fade-in">
                                <div className="card-top">
                                    <div className="avatar-section">
                                        <div className="avatar-outer">
                                            {doctor.avatar ? (
                                                <img src={doctor.avatar} alt={doctor.firstName} className="doctor-img" />
                                            ) : (
                                                <div className="avatar-placeholder gradient-primary">
                                                    {doctor.firstName[0]}{doctor.lastName[0]}
                                                </div>
                                            )}
                                            <div className={`gender-indicator ${doctor.doctorProfile?.gender}`}>
                                                {doctor.doctorProfile?.gender === 'M' ? '👨‍⚕️' : '👩‍⚕️'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="main-meta">
                                        <div className="specialty-tag mb-2">{doctor.doctorProfile?.specialty || "Médecin"}</div>
                                        <h3>Dr. {doctor.lastName} {doctor.firstName}</h3>
                                        <div className="meta-wilaya">
                                            <span className="icon">📍</span> {wilaya}
                                        </div>
                                    </div>
                                </div>

                                <div className="card-mid">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-icon-wrapper">🏪</div>
                                            <div className="info-content">
                                                <label>Adresse du cabinet</label>
                                                <p>{doctor.doctorProfile?.clinicAddress}</p>
                                                <span className="sub-area">{daira}, {baladiya}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-icon-wrapper">📞</div>
                                            <div className="info-content">
                                                <label>Contact Direct</label>
                                                <p>{doctor.phone || "Non renseigné"}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-icon-wrapper">🕒</div>
                                            <div className="info-content">
                                                <label>Disponibilités</label>
                                                <p>{doctor.doctorProfile?.availability || "Consulter pour horaires"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-bottom">
                                    <button
                                        className="btn-appointment"
                                        onClick={() => handleOpenBooking(doctor)}
                                    >
                                        Prendre un Rendez-vous
                                    </button>

                                    <div className="social-links-row">
                                        {doctor.doctorProfile?.linkedin && (
                                            <a href={doctor.doctorProfile.linkedin} target="_blank" className="social-icon-btn linkedin" title="LinkedIn">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                            </a>
                                        )}
                                        {doctor.doctorProfile?.whatsapp && (
                                            <a href={doctor.doctorProfile.whatsapp} target="_blank" className="social-icon-btn whatsapp" title="WhatsApp">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.171c1.589.943 3.13 1.411 4.763 1.411 5.423 0 9.832-4.409 9.834-9.832.002-5.422-4.41-9.834-9.835-9.834-5.424 0-9.832 4.409-9.834 9.833-.001 2.053.649 3.868 1.83 5.438l-1.104 4.035 4.146-1.087zm10.333-6.42c-.256-.127-1.514-.747-1.748-.832-.233-.085-.404-.127-.573.127-.17.255-.658.832-.807.997-.15.166-.298.187-.555.061-.257-.128-1.081-.399-2.061-1.273-.761-.679-1.275-1.518-1.424-1.773-.15-.255-.016-.394.111-.521.115-.114.256-.299.385-.448.128-.149.171-.255.257-.426.085-.17.042-.319-.021-.447-.064-.128-.573-1.381-.785-1.891-.206-.499-.413-.432-.573-.44h-.489c-.171 0-.447.064-.681.32-.234.256-.893.873-.893 2.128s.915 2.469 1.042 2.639c.128.17 1.8 2.747 4.359 3.85.609.262 1.084.419 1.455.536.611.194 1.166.167 1.605.101.49-.074 1.514-.618 1.727-1.214.213-.596.213-1.106.15-1.214-.064-.108-.234-.171-.49-.298z" /></svg>
                                            </a>
                                        )}
                                        {doctor.doctorProfile?.telegram && (
                                            <a href={doctor.doctorProfile.telegram} target="_blank" className="social-icon-btn telegram" title="Telegram">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0c-6.603 0-11.944 5.341-11.944 11.944 0 6.603 5.341 11.944 11.944 11.944 6.603 0 11.944-5.341 11.944-11.944 0-6.603-5.341-11.944-11.944-11.944zm5.856 7.803l-1.956 9.223c-.145.642-.526.797-1.063.497l-2.978-2.194-1.436 1.382c-.159.159-.292.292-.599.292l.213-3.033 5.518-4.986c.24-.213-.053-.332-.372-.12l-6.82 4.293-2.94-.919c-.639-.2-.65-.639.133-.944l11.491-4.431c.53-.194.994.124.822.944z" /></svg>
                                            </a>
                                        )}
                                        {doctor.doctorProfile?.googleMapsLink && (
                                            <a href={doctor.doctorProfile.googleMapsLink} target="_blank" className="social-icon-btn maps" title="Google Maps">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredDoctors.length === 0 && (
                    <div className="no-results glass p-8">
                        <span className="no-results-icon">👨‍⚕️</span>
                        <h3>Aucun médecin trouvé</h3>
                        <p>Essayez de modifier vos critères de recherche.</p>
                    </div>
                )}
            </main>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
                    <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                        <header className="modal-header">
                            <h2>Prise de Rendez-vous</h2>
                            <button className="close-btn" onClick={() => setIsBookingModalOpen(false)}>✕</button>
                        </header>

                        <div className="modal-body">
                            <div className="doctor-summary">
                                <div className="mini-avatar">
                                    {selectedDoctor.avatar ? (
                                        <img src={selectedDoctor.avatar} alt="" />
                                    ) : (
                                        <div className="placeholder">{selectedDoctor.firstName[0]}</div>
                                    )}
                                </div>
                                <div>
                                    <h4>Dr. {selectedDoctor.lastName} {selectedDoctor.firstName}</h4>
                                    <p>{selectedDoctor.doctorProfile?.specialty}</p>
                                </div>
                            </div>

                            {bookingMessage.text && (
                                <div className={`message-alert ${bookingMessage.type}`}>
                                    {bookingMessage.text}
                                </div>
                            )}

                            <form onSubmit={handleBookingSubmit} className="booking-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nom du patient</label>
                                        <input type="text" value={patient.lastName} className="input" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Prénom du patient</label>
                                        <input type="text" value={patient.firstName} className="input" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Téléphone</label>
                                        <input type="text" value={bookingData.phone} onChange={e => setBookingData({ ...bookingData, phone: e.target.value })} className="input" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Sexe</label>
                                        <input type="text" value={patient.healthProfile?.gender === 'M' ? 'Homme' : 'Femme'} className="input" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Âge</label>
                                        <input type="text" value={patientAge ? `${patientAge} ans` : "Non renseigné"} className="input" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Date du rendez-vous</label>
                                        <input
                                            type="datetime-local"
                                            value={bookingData.date}
                                            onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                                            className="input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Message (optionnel)</label>
                                        <textarea
                                            value={bookingData.notes}
                                            onChange={e => setBookingData({ ...bookingData, notes: e.target.value })}
                                            className="input textarea"
                                            rows={3}
                                            placeholder="Précisez le motif de votre consultation..."
                                        />
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsBookingModalOpen(false)}>Annuler</button>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? "Chargement..." : "Confirmer le rendez-vous"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                .main-content { margin-left: 280px; padding: var(--spacing-2xl); width: calc(100% - 280px); }
                
                .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; gap: 2rem; }
                .header-info h1 { font-size: 2.8rem; font-weight: 800; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
                .header-info p { font-size: 1.1rem; color: var(--color-text-secondary); }
                
                .search-input-group { display: flex; align-items: center; padding: 0.8rem 1.7rem; border-radius: 100px; min-width: 480px; background: var(--color-bg); box-shadow: var(--shadow-md); border: 1px solid var(--color-border); transition: all 0.3s ease; }
                .search-input-group:focus-within { border-color: var(--color-primary); box-shadow: 0 0 0 4px hsla(210, 100%, 56%, 0.15), var(--shadow-lg); transform: scale(1.02); }
                .search-icon { margin-right: 1rem; opacity: 0.5; font-size: 1.2rem; }
                .search-input { border: none; background: transparent; width: 100%; font-size: 1.05rem; outline: none; color: var(--color-text); }

                .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2.5rem; padding-bottom: 4rem; }
                
                .glass-premium { background: var(--glass-bg); backdrop-filter: blur(12px); border: 1px solid var(--glass-border); border-radius: 2rem; box-shadow: var(--glass-shadow); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .glass-premium:hover { transform: translateY(-12px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); border-color: var(--color-primary); }
                
                .card-top { padding: 2rem; display: flex; gap: 1.5rem; align-items: center; border-bottom: 1px solid var(--color-border); }
                .avatar-outer { position: relative; width: 85px; height: 85px; padding: 4px; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); }
                .doctor-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: var(--color-bg); }
                .avatar-placeholder { width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.8rem; }
                
                .gender-indicator { position: absolute; bottom: 0; right: 0; background: var(--color-bg); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); font-size: 0.9rem; border: 1px solid var(--color-border); }
                .gender-indicator.M { color: var(--color-primary); }
                .gender-indicator.F { color: var(--color-secondary); }
                
                .specialty-tag { display: inline-block; padding: 4px 12px; border-radius: 100px; background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                .main-meta h3 { font-size: 1.4rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.3rem; }
                .meta-wilaya { font-size: 0.9rem; color: var(--color-text-secondary); display: flex; align-items: center; gap: 0.4rem; }

                .card-mid { padding: 2rem; }
                .info-grid { display: flex; flex-direction: column; gap: 1.2rem; }
                .info-item { display: flex; gap: 1rem; align-items: flex-start; }
                .info-icon-wrapper { min-width: 40px; height: 40px; border-radius: 12px; background: var(--color-bg-secondary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
                .info-content label { display: block; font-size: 0.75rem; color: var(--color-text-tertiary); font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }
                .info-content p { font-size: 0.95rem; font-weight: 600; color: var(--color-text); line-height: 1.4; }
                .sub-area { font-size: 0.8rem; color: var(--color-text-secondary); }

                .card-bottom { padding: 2rem; padding-top: 0; display: flex; flex-direction: column; gap: 1.5rem; }
                .btn-appointment { width: 100%; padding: 1.2rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 700; font-size: 1.05rem; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 16px hsla(210, 100%, 56%, 0.25); }
                .btn-appointment:hover { transform: translateY(-3px); box-shadow: 0 12px 24px hsla(210, 100%, 56%, 0.4); filter: brightness(1.1); }
                
                .social-links-row { display: flex; justify-content: center; gap: 1rem; }
                .social-icon-btn { 
                    width: 46px; 
                    height: 46px; 
                    border-radius: 14px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: white; 
                    text-decoration: none; 
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
                    box-shadow: 0 4px 15px rgba(0,0,0,0.15); 
                    border: 1px solid rgba(255,255,255,0.2); 
                    position: relative;
                    overflow: hidden;
                }
                .social-icon-btn::after {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
                    transform: rotate(45deg);
                    transition: 0.6s;
                    opacity: 0;
                }
                .social-icon-btn:hover::after {
                    opacity: 1;
                    left: 100%;
                }
                .social-icon-btn svg { width: 22px; height: 22px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); z-index: 1; }
                .social-icon-btn:hover { transform: scale(1.18) translateY(-6px); box-shadow: 0 12px 25px rgba(0,0,0,0.25); border-color: rgba(255,255,255,0.4); }
                
                .linkedin { background: linear-gradient(135deg, #0077b5 0%, #00a0dc 100%); }
                .whatsapp { background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); }
                .telegram { background: linear-gradient(135deg, #0088cc 0%, #24a1de 100%); }
                .maps { background: linear-gradient(135deg, #ea4335 0%, #fbbc05 100%); }

                .no-results { text-align: center; grid-column: 1 / -1; padding: 4rem; }
                .no-results-icon { font-size: 5rem; display: block; margin-bottom: 1rem; opacity: 0.5; }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
                .modal-content { width: 100%; max-width: 650px; max-height: 90vh; border-radius: 2.5rem; overflow: hidden; animation: modalIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); background: var(--color-bg); box-shadow: var(--shadow-xl); border: 1px solid var(--color-border); display: flex; flex-direction: column; }
                @keyframes modalIn { from { opacity: 0; transform: scale(0.9) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                
                .modal-header { padding: 2rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-secondary); flex-shrink: 0; }
                .modal-header h2 { font-size: 1.5rem; font-weight: 800; color: var(--color-text); }
                .close-btn { background: var(--color-bg-tertiary); border: none; width: 35px; height: 35px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--color-text); }
                .close-btn:hover { background: var(--color-border); transform: rotate(90deg); }
                
                .modal-body { padding: 2.5rem; overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: var(--color-border) transparent; }
                .modal-body::-webkit-scrollbar { width: 6px; }
                .modal-body::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }

                .doctor-summary { display: flex; gap: 1.5rem; align-items: center; margin-bottom: 2.5rem; padding: 1.2rem; background: var(--color-bg-secondary); border-radius: 1.5rem; }
                .mini-avatar { width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2px solid var(--color-bg); }
                .mini-avatar img { width: 100%; height: 100%; object-fit: cover; }
                
                .booking-form { display: flex; flex-direction: column; gap: 2rem; }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
                .full-width { grid-column: 1 / -1; }
                .form-group label { font-size: 0.8rem; font-weight: 700; color: var(--color-text-tertiary); text-transform: uppercase; margin-bottom: 0.6rem; display: block; letter-spacing: 0.5px; }
                .input { width: 100%; padding: 1rem 1.2rem; border-radius: 1rem; border: 1px solid var(--color-border); background: var(--color-bg-secondary); font-size: 1rem; transition: all 0.2s; color: var(--color-text); }
                .input:focus { border-color: var(--color-primary); background: var(--color-bg); box-shadow: 0 0 0 4px hsla(210, 100%, 56%, 0.1); outline: none; }
                .textarea { min-height: 100px; resize: vertical; }
                .input:disabled { opacity: 0.6; cursor: not-allowed; background: var(--color-bg-tertiary); }
                
                .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
                .btn { padding: 1rem 2rem; border-radius: 1rem; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s; }
                .btn-primary { background: var(--color-primary); color: white; box-shadow: 0 4px 12px hsla(210, 100%, 56%, 0.2); }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 15px hsla(210, 100%, 56%, 0.3); }
                .btn-secondary { background: var(--color-bg-tertiary); color: var(--color-text-secondary); }
                .btn-secondary:hover { background: var(--color-border); color: var(--color-text); }
                
                .message-alert { padding: 1.2rem; border-radius: 1rem; margin-bottom: 2rem; text-align: center; font-weight: 600; }
                .message-alert.success { background: #c6f6d5; color: #22543d; border: 1px solid #9ae6b4; }
                .message-alert.error { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; }

                .animate-fade-in { animation: fadeIn 0.6s ease-out backwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; width: 100%; padding: 1.5rem; padding-top: 80px; }
                    .dashboard-header { flex-direction: column; align-items: stretch; gap: 1.5rem; }
                    .search-input-group { min-width: 100%; }
                    .modal-content { max-width: 100%; height: 100%; border-radius: 0; }
                    .doctors-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 600px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .card-top { flex-direction: column; text-align: center; }
                    .avatar-section { margin-bottom: 0.5rem; }
                }
            `}</style>
        </div>
    );
}
