"use client";

import { useState } from "react";
import { PatientSidebar } from "./PatientSidebar";
import { FiCalendar, FiClock, FiUser, FiInfo, FiEdit2, FiX, FiCheckCircle, FiChevronRight, FiSearch } from "react-icons/fi";
import Link from "next/link";

type Appointment = {
    id: string;
    date: string;
    status: string;
    doctor: {
        firstName: string;
        lastName: string;
        doctorProfile: {
            specialty: string;
        };
    };
    notes?: string;
};

type PatientAppointmentsClientProps = {
    initialAppointments: Appointment[];
};

export default function PatientAppointmentsClient({ initialAppointments }: PatientAppointmentsClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [loading, setLoading] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newDate, setNewDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleUpdateDate = async (id: string) => {
        if (!newDate) return;
        setLoading(id);
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: newDate })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Erreur lors de la mise à jour");
            }

            setAppointments(prev => prev.map(app =>
                app.id === id ? { ...app, date: new Date(newDate).toISOString() } : app
            ));
            setEditingId(null);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(null);
        }
    };

    const handleCancel = async (id: string) => {
        if (!confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) return;
        setLoading(id);
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Erreur lors de l'annulation");

            setAppointments(prev => prev.filter(app => app.id !== id));
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(null);
        }
    };

    const filteredAppointments = appointments.filter(app => {
        const query = searchQuery.toLowerCase();
        return (
            app.doctor.firstName.toLowerCase().includes(query) ||
            app.doctor.lastName.toLowerCase().includes(query) ||
            app.doctor.doctorProfile.specialty.toLowerCase().includes(query)
        );
    });

    return (
        <div className="dashboard-wrapper">
            <PatientSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="dashboard-header">
                    <div className="header-info">
                        <h1>Mes Rendez-vous</h1>
                        <p>Gérez vos consultations à venir</p>
                    </div>

                    <Link href="/patient/appointments/history" className="history-link glass">
                        <FiCheckCircle /> Voir l'historique <FiChevronRight />
                    </Link>
                </header>

                <div className="search-container glass mb-8">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom de médecin ou spécialité..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="appointments-grid">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map(app => (
                            <div key={app.id} className="appointment-card glass">
                                <div className="card-header">
                                    <div className="doctor-info">
                                        <div className="doctor-avatar">👨‍⚕️</div>
                                        <div>
                                            <h3>Dr. {app.doctor.lastName} {app.doctor.firstName}</h3>
                                            <span className="specialty">{app.doctor.doctorProfile.specialty}</span>
                                        </div>
                                    </div>
                                    <span className="status-badge pending">En attente</span>
                                </div>

                                <div className="card-body">
                                    <div className="detail-item">
                                        <FiCalendar className="detail-icon" />
                                        <div className="detail-content">
                                            <span className="detail-label">Date</span>
                                            {editingId === app.id ? (
                                                <input
                                                    type="datetime-local"
                                                    className="date-edit-input"
                                                    value={newDate}
                                                    onChange={(e) => setNewDate(e.target.value)}
                                                />
                                            ) : (
                                                <span className="detail-value">
                                                    {new Date(app.date).toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <FiClock className="detail-icon" />
                                        <div className="detail-content">
                                            <span className="detail-label">Heure</span>
                                            <span className="detail-value">
                                                {new Date(app.date).toLocaleTimeString('fr-FR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {app.notes && (
                                        <div className="detail-item">
                                            <FiInfo className="detail-icon" />
                                            <div className="detail-content">
                                                <span className="detail-label">Notes</span>
                                                <span className="detail-value notes">{app.notes}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="card-actions">
                                    {editingId === app.id ? (
                                        <>
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleUpdateDate(app.id)}
                                                disabled={loading === app.id}
                                            >
                                                Enregistrer
                                            </button>
                                            <button
                                                className="btn btn-ghost"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Annuler
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-primary-light"
                                                onClick={() => {
                                                    setEditingId(app.id);
                                                    setNewDate(new Date(app.date).toISOString().slice(0, 16));
                                                }}
                                            >
                                                <FiEdit2 /> Modifier la date
                                            </button>
                                            <button
                                                className="btn btn-danger-light"
                                                onClick={() => handleCancel(app.id)}
                                                disabled={loading === app.id}
                                            >
                                                <FiX /> Annuler
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state glass">
                            <FiCalendar className="empty-icon" />
                            <h3>Aucun rendez-vous en attente</h3>
                            <p>Vous n'avez pas de rendez-vous programmé pour le moment.</p>
                            <Link href="/patient/doctors" className="btn btn-primary mt-4">
                                Prendre un rendez-vous
                            </Link>
                        </div>
                    )}
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
                
                .dashboard-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: var(--spacing-2xl);
                    gap: var(--spacing-xl);
                }

                .header-info h1 { 
                    font-size: 2.5rem; 
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); 
                    -webkit-background-clip: text; 
                    -webkit-text-fill-color: transparent; 
                }
                
                .header-info p { color: var(--color-text-secondary); font-size: 1.1rem; }

                .search-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    border-radius: var(--radius-lg);
                    margin-bottom: var(--spacing-xl);
                    border: 1px solid var(--glass-border);
                }

                .search-icon { color: var(--color-text-secondary); font-size: 1.2rem; }
                .search-input {
                    background: transparent;
                    border: none;
                    width: 100%;
                    color: var(--color-text);
                    font-size: 1rem;
                    outline: none;
                }
                .search-input::placeholder { color: var(--color-text-secondary); opacity: 0.7; }
                
                .mb-8 { margin-bottom: 2rem; }

                .history-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 30px;
                    border-radius: 50px;
                    color: white;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    font-weight: 800;
                    font-size: 1.05rem;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 25px hsla(210, 100%, 56%, 0.35);
                    border: none;
                }

                .history-link:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 15px 30px hsla(210, 100%, 56%, 0.4);
                    filter: brightness(1.1);
                }

                .appointments-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: var(--spacing-xl);
                }

                .appointment-card {
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--glass-border);
                    transition: all 0.3s;
                }

                .appointment-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--spacing-xl);
                }

                .doctor-info { display: flex; gap: 15px; align-items: center; }
                .doctor-avatar {
                    width: 50px;
                    height: 50px;
                    background: var(--color-bg-secondary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .doctor-info h3 { font-size: 1.1rem; margin-bottom: 2px; }
                .specialty { font-size: 0.85rem; color: var(--color-text-secondary); }

                .status-badge {
                    padding: 4px 12px;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-badge.pending {
                    background: hsla(35, 100%, 50%, 0.1);
                    color: #d97706;
                    border: 1px solid hsla(35, 100%, 50%, 0.2);
                }

                .card-body {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-xl);
                    padding: var(--spacing-lg);
                    background: rgba(0,0,0,0.02);
                    border-radius: var(--radius-lg);
                }

                .detail-item { display: flex; gap: 12px; align-items: flex-start; }
                .detail-icon { color: var(--color-primary); font-size: 1.1rem; margin-top: 2px; }
                .detail-content { display: flex; flex-direction: column; }
                .detail-label { font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
                .detail-value { font-weight: 600; font-size: 0.95rem; }
                .detail-value.notes { font-style: italic; font-weight: 400; color: var(--color-text-secondary); }

                .date-edit-input {
                    background: var(--color-bg);
                    border: 1px solid var(--color-primary);
                    border-radius: 6px;
                    padding: 4px 8px;
                    font-family: inherit;
                    font-size: 0.9rem;
                    margin-top: 4px;
                }

                .card-actions { display: flex; gap: 10px; }

                .btn {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 10px;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }

                .btn-primary-light { background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); }
                .btn-primary-light:hover { background: var(--color-primary); color: white; }

                .btn-danger-light { background: hsla(0, 84%, 60%, 0.1); color: var(--color-danger); }
                .btn-danger-light:hover { background: var(--color-danger); color: white; }

                .btn-success { background: var(--color-success); color: white; }
                .btn-ghost { background: transparent; color: var(--color-text-secondary); border: 1px solid var(--color-border); }

                .empty-state {
                    grid-column: 1 / -1;
                    padding: 60px;
                    text-align: center;
                    border-radius: var(--radius-2xl);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }

                .empty-icon { font-size: 4rem; opacity: 0.2; color: var(--color-primary); }
                .empty-state h3 { font-size: 1.5rem; }
                .empty-state p { color: var(--color-text-secondary); max-width: 400px; }

                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; width: 100%; padding: var(--spacing-xl); padding-top: 100px; }
                    .dashboard-header { flex-direction: column; align-items: flex-start; }
                    .history-link { width: 100%; justify-content: center; }
                    .appointments-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
