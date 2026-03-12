"use client";

import Link from "next/link";
import { useState } from "react";
import { DoctorSidebar } from "./DoctorSidebar";
import { FiCalendar, FiClock, FiUser, FiPhone, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Pagination } from "./Pagination";

type AppointmentsClientProps = {
    initialAppointments: any[];
};

export default function AppointmentsClient({ initialAppointments }: AppointmentsClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [loading, setLoading] = useState<string | null>(null);
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Reset to page 1 when filter changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDate(e.target.value);
        setCurrentPage(1);
    };

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

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        setLoading(id);
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour");

            setAppointments(prev => prev.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            ));

            // Adjust pagination if status change removes item from view
            const remainingCount = filteredItems.length - 1;
            if (remainingCount <= (currentPage - 1) * itemsPerPage && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        } catch (err) {
            alert("Erreur: " + err);
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment annuler et supprimer ce rendez-vous ?")) return;

        setLoading(id);
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            setAppointments(prev => prev.filter(app => app.id !== id));

            // Adjust pagination if deleted item leaves current page empty
            const remainingCount = filteredItems.length - 1;
            if (remainingCount <= (currentPage - 1) * itemsPerPage && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        } catch (err) {
            alert("Erreur: " + err);
        } finally {
            setLoading(null);
        }
    };

    const filteredItems = appointments.filter(app => {
        // Only show pending appointments
        if (app.status !== 'PENDING') return false;

        if (!filterDate) return true;
        const appDate = new Date(app.date).toISOString().split('T')[0];
        return appDate === filterDate;
    });

    const paginatedAppointments = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="dashboard-wrapper">
            <DoctorSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="dashboard-header">
                    <div className="header-info">
                        <h1>Rendez-vous en attente</h1>
                        <p>Gérez vos consultations programmées</p>
                    </div>

                    <div className="filter-card glass">
                        <div className="filter-header">
                            <FiCalendar className="filter-icon" />
                            <span>Filtrer par date</span>
                        </div>
                        <input
                            type="date"
                            className="date-input"
                            value={filterDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                </header>

                <div className="table-container glass">
                    <div className="table-wrapper">
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th><FiUser className="th-icon" /> Patient</th>
                                    <th>Sexe</th>
                                    <th>Âge</th>
                                    <th><FiPhone className="th-icon" /> Téléphone</th>
                                    <th><FiClock className="th-icon" /> Date & Heure</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAppointments.length > 0 ? (
                                    paginatedAppointments.map(app => {
                                        const age = calculateAge(app.patient?.healthProfile?.birthDate);
                                        return (
                                            <tr key={app.id}>
                                                <td>
                                                    <div className="patient-name">
                                                        <strong>{app.patient.lastName} {app.patient.firstName}</strong>
                                                        <span className="notes">{app.notes}</span>
                                                    </div>
                                                </td>
                                                <td>{app.patient?.healthProfile?.gender === 'M' ? 'Homme' : 'Femme'}</td>
                                                <td>{age ? `${age} ans` : 'NC'}</td>
                                                <td>{app.patient.phone || 'NC'}</td>
                                                <td>
                                                    <div className="date-cell">
                                                        <span className="date-text">{new Date(app.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}</span>
                                                        <span className="time">{new Date(app.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="status-badge pending">
                                                        En attente
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => handleUpdateStatus(app.id, 'COMPLETED')}
                                                            disabled={loading === app.id}
                                                            title="Valider le rendez-vous"
                                                        >
                                                            <FiCheckCircle /> Valider
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(app.id)}
                                                            disabled={loading === app.id}
                                                            title="Annuler le rendez-vous"
                                                        >
                                                            <FiXCircle /> Annuler
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="no-data">
                                            <div className="empty-state">
                                                <FiCalendar className="empty-icon" />
                                                <p>Aucun rendez-vous en attente {filterDate ? `pour le ${new Date(filterDate).toLocaleDateString('fr-FR')}` : ''}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredItems.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
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

                .filter-card {
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    min-width: 240px;
                }

                .filter-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--color-text-secondary);
                }

                .filter-icon { color: var(--color-primary); }

                .date-input {
                    background: var(--color-bg);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    padding: 8px 12px;
                    color: var(--color-text);
                    font-family: inherit;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.2s;
                }

                .date-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.1); }

                .table-container { border-radius: var(--radius-xl); background: var(--glass-bg); border: 1px solid var(--glass-border); overflow: hidden; }
                .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .appointments-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 800px; }
                .appointments-table th { 
                    padding: 16px; 
                    background: var(--color-bg-secondary); 
                    font-weight: 600; 
                    color: var(--color-text-secondary); 
                    border-bottom: 2px solid var(--color-border-light);
                    white-space: nowrap;
                }
                
                .th-icon { margin-right: 6px; vertical-align: middle; opacity: 0.7; }

                .appointments-table td { padding: 16px; border-bottom: 1px solid var(--color-border-light); vertical-align: middle; }
                
                .patient-name { display: flex; flex-direction: column; }
                .notes { font-size: 0.8rem; color: var(--color-text-secondary); margin-top: 4px; }
                
                .date-cell { display: flex; flex-direction: column; }
                .date-text { font-size: 0.95rem; font-weight: 500; }
                .date-cell .time { font-weight: 700; color: var(--color-primary); font-size: 1.1rem; }
                
                .status-badge { 
                    padding: 6px 14px; 
                    border-radius: 50px; 
                    font-size: 0.75rem; 
                    font-weight: 700; 
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                }
                .status-badge.pending { 
                    background: var(--color-bg-tertiary); 
                    color: var(--color-warning); 
                    border: 1px solid var(--color-border); 
                }
                
                .action-buttons { display: flex; gap: 8px; }
                .btn { 
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px; 
                    border-radius: var(--radius-md); 
                    font-weight: 600; 
                    cursor: pointer; 
                    border: none; 
                    transition: all 0.2s; 
                }
                .btn-sm { font-size: 0.85rem; padding: 6px 12px; }
                
                .btn-success { background: var(--color-success); color: white; }
                .btn-success:hover { transform: translateY(-1px); box-shadow: 0 4px 12px hsla(142, 71%, 45%, 0.3); }
                
                .btn-danger { background: var(--color-bg-tertiary); color: var(--color-danger); border: 1px solid var(--color-border); }
                .btn-danger:hover { background: var(--color-danger); color: white; }

                .no-data { text-align: center; padding: 60px 20px; }
                .empty-state { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-md); color: var(--color-text-secondary); }
                .empty-icon { font-size: 3rem; opacity: 0.2; }

                @media (max-width: 1024px) {
                    .main-content { 
                        margin-left: 0; 
                        width: 100%; 
                        padding: var(--spacing-xl); 
                        padding-top: 100px; 
                    }
                    .dashboard-header { flex-direction: column; align-items: flex-start; gap: var(--spacing-lg); }
                    .filter-card { width: 100%; }
                }
            `}</style>
        </div>
    );
}
