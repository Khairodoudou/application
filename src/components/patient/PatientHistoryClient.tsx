"use client";

import { useState } from "react";
import { PatientSidebar } from "./PatientSidebar";
import { FiCalendar, FiClock, FiUser, FiCheckCircle, FiChevronLeft, FiSearch } from "react-icons/fi";
import Link from "next/link";

type Appointment = {
    id: string;
    date: string;
    status: string;
    type: string;
    doctor: {
        firstName: string;
        lastName: string;
        doctorProfile: {
            specialty: string;
        };
    };
};

type PatientHistoryClientProps = {
    appointments: Appointment[];
};

export default function PatientHistoryClient({ appointments }: PatientHistoryClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAppointments = appointments.filter(app => {
        const query = searchQuery.toLowerCase();
        return (
            app.doctor.firstName.toLowerCase().includes(query) ||
            app.doctor.lastName.toLowerCase().includes(query) ||
            app.doctor.doctorProfile.specialty.toLowerCase().includes(query) ||
            app.type.toLowerCase().includes(query)
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
                        <Link href="/patient/appointments" className="back-link">
                            <FiChevronLeft /> Retour aux rendez-vous
                        </Link>
                        <h1>Historique des consultations</h1>
                        <p>Retrouvez vos rendez-vous passés et validés</p>
                    </div>
                </header>

                <div className="search-container glass mb-8">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Rechercher par médecin, spécialité ou type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-container glass">
                    <div className="table-wrapper">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Médecin</th>
                                    <th>Spécialité</th>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map(app => (
                                        <tr key={app.id}>
                                            <td>
                                                <div className="doctor-cell">
                                                    <strong>Dr. {app.doctor.lastName} {app.doctor.firstName}</strong>
                                                </div>
                                            </td>
                                            <td>{app.doctor.doctorProfile.specialty}</td>
                                            <td>{new Date(app.date).toLocaleDateString('fr-FR')}</td>
                                            <td>
                                                <span className="time-badge">
                                                    {new Date(app.date).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </td>
                                            <td>{app.type}</td>
                                            <td>
                                                <span className="status-badge validated"> Validé </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="no-data">Aucun historique de consultation trouvé</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
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
                
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    transition: color 0.2s;
                }
                .back-link:hover { color: var(--color-primary); }

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

                .table-container { border-radius: var(--radius-xl); background: var(--glass-bg); border: 1px solid var(--glass-border); overflow: hidden; }
                .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                
                .history-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 800px; }
                .history-table th { 
                    padding: 16px; 
                    background: rgba(0,0,0,0.02); 
                    font-weight: 600; 
                    color: var(--color-text-secondary); 
                    border-bottom: 2px solid var(--color-border-light);
                    white-space: nowrap;
                }
                .history-table td { padding: 16px; border-bottom: 1px solid var(--color-border-light); vertical-align: middle; }

                .time-badge { font-weight: 700; color: var(--color-primary); }

                .status-badge {
                    padding: 4px 12px;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .status-badge.validated {
                    background: hsla(142, 71%, 45%, 0.1);
                    color: var(--color-success);
                    border: 1px solid hsla(142, 71%, 45%, 0.2);
                }

                .no-data { text-align: center; padding: 60px 20px; color: var(--color-text-secondary); font-style: italic; }

                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; width: 100%; padding: var(--spacing-xl); padding-top: 100px; }
                }
            `}</style>
        </div>
    );
}
