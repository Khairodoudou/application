"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type Doctor = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    specialty: string;
    clinic: string;
    status: string;
    joinedDate: string;
};

export default function AdminDoctorsClient({
    doctors: initialDoctors,
    totalDoctors,
    activeDoctors,
    suspendedDoctors
}: {
    doctors: Doctor[],
    totalDoctors: number,
    activeDoctors: number,
    suspendedDoctors: number
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [doctors, setDoctors] = useState(initialDoctors);
    const router = useRouter();

    const filteredDoctors = useMemo(() => {
        return doctors.filter(doc => {
            const matchesSearch =
                doc.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === "ALL" || doc.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter, doctors]);

    // Pagination logic
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const action = currentStatus === 'ACTIVE' ? 'désactiver' : 'activer';
        if (!confirm(`Voulez-vous vraiment ${action} ce médecin ?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/doctors/${id}/toggle-status`, {
                method: "PATCH",
            });

            if (response.ok) {
                const data = await response.json();
                setDoctors(doctors.map(d =>
                    d.id === id ? { ...d, status: data.status } : d
                ));
                router.refresh();
            } else {
                alert("Erreur lors de la modification du statut");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Une erreur est survenue");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce médecin ? Cette action est irréversible.")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/doctors/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setDoctors(doctors.filter(d => d.id !== id));
                router.refresh();
            } else {
                const data = await response.json();
                alert(data.error || "Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Une erreur est survenue");
        }
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Prénom", "Nom", "Email", "Téléphone", "Spécialité", "Cabinet", "Statut", "Date d'inscription"];
        const csvRows = [
            headers.join(";"), // Semicolon for better Excel French compatibility
            ...filteredDoctors.map(doc => [
                doc.id,
                doc.firstName,
                doc.lastName,
                doc.email,
                doc.phone || "",
                doc.specialty,
                doc.clinic,
                doc.status,
                doc.joinedDate
            ].map(val => `"${val}"`).join(";"))
        ];

        const csvContent = "\uFEFF" + csvRows.join("\n"); // Add BOM for UTF-8 Excel support
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `medecins_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        <h1>Gestion des Médecins</h1>
                        <p>Liste des médecins inscrits sur la plateforme</p>
                    </div>
                </header>

                <section className="stats-grid">
                    <div className="stat-card glass">
                        <div className="stat-icon gradient-primary">👨‍⚕️</div>
                        <div className="stat-info">
                            <div className="stat-value">{totalDoctors.toLocaleString()}</div>
                            <div className="stat-label">Médecins Total</div>
                        </div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-icon gradient-success">✅</div>
                        <div className="stat-info">
                            <div className="stat-value">{activeDoctors.toLocaleString()}</div>
                            <div className="stat-label">Médecins Actifs</div>
                        </div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-icon gradient-danger">🚫</div>
                        <div className="stat-info">
                            <div className="stat-value">{suspendedDoctors.toLocaleString()}</div>
                            <div className="stat-label">Médecins Suspendus</div>
                        </div>
                    </div>
                </section>

                <section className="content-section">
                    <div className="filters-bar glass">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Rechercher un médecin..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <button
                                className={`filter-pill ${statusFilter === 'ALL' ? 'active' : ''}`}
                                onClick={() => setStatusFilter('ALL')}
                            >
                                Tous
                            </button>
                            <button
                                className={`filter-pill ${statusFilter === 'ACTIVE' ? 'active' : ''}`}
                                onClick={() => setStatusFilter('ACTIVE')}
                            >
                                Actifs
                            </button>
                            <button
                                className={`filter-pill ${statusFilter === 'PENDING' ? 'active' : ''}`}
                                onClick={() => setStatusFilter('PENDING')}
                            >
                                En attente
                            </button>
                            <button
                                className={`filter-pill ${statusFilter === 'SUSPENDED' ? 'active' : ''}`}
                                onClick={() => setStatusFilter('SUSPENDED')}
                            >
                                Suspendus
                            </button>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleExportCSV}
                        >
                            <span className="nav-icon mr-2">📥</span>
                            Exporter CSV
                        </button>
                    </div>

                    <div className="card glass">
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Médecin</th>
                                        <th className="hide-mobile">Spécialité</th>
                                        <th className="hide-mobile">Cabinet</th>
                                        <th className="hide-mobile">Statut</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedDoctors.map((doctor) => (
                                        <tr key={doctor.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar gradient-primary">
                                                        {doctor.firstName[0]}{doctor.lastName[0]}
                                                    </div>
                                                    <div>
                                                        <div className="user-name">Dr. {doctor.firstName} {doctor.lastName}</div>
                                                        <div className="user-email">{doctor.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hide-mobile">{doctor.specialty}</td>
                                            <td className="hide-mobile">{doctor.clinic}</td>
                                            <td className="hide-mobile">
                                                <span className={`status-badge ${doctor.status.toLowerCase()}`}>
                                                    {doctor.status === 'ACTIVE' ? 'Actif' : (doctor.status === 'SUSPENDED' ? 'Suspendu' : 'En attente')}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleStatus(doctor.id, doctor.status)}
                                                        className={`btn btn-sm ${doctor.status === 'ACTIVE' ? 'btn-warning' : 'btn-success'}`}
                                                        title={doctor.status === 'ACTIVE' ? "Désactiver" : "Activer"}
                                                    >
                                                        {doctor.status === 'ACTIVE' ? "Désactiver" : "Activer"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(doctor.id)}
                                                        className="btn btn-danger btn-sm"
                                                        title="Supprimer définitivement"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredDoctors.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-8 text-secondary">
                                                Aucun médecin trouvé.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={filteredDoctors.length}
                            itemsPerPage={itemsPerPage}
                            itemName="médecins"
                        />
                    </div>

                    <div className="card glass mt-6 lg:hidden">
                        <div className="mobile-cards">
                            {paginatedDoctors.map((doctor) => (
                                <div key={doctor.id} className="doctor-card">
                                    <div className="card-header">
                                        <div className="user-cell">
                                            <div className="user-avatar gradient-primary">
                                                {doctor.firstName[0]}{doctor.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="user-name">Dr. {doctor.firstName} {doctor.lastName}</div>
                                                <div className="user-email">{doctor.email}</div>
                                            </div>
                                        </div>
                                        <span className={`status-badge ${doctor.status.toLowerCase()}`}>
                                            {doctor.status === 'ACTIVE' ? 'Actif' : (doctor.status === 'SUSPENDED' ? 'Suspendu' : 'En attente')}
                                        </span>
                                    </div>

                                    <div className="card-info">
                                        <div className="info-row">
                                            <span className="info-label">Spécialité</span>
                                            <span className="info-value">{doctor.specialty}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Cabinet</span>
                                            <span className="info-value">{doctor.clinic}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Date d'inscription</span>
                                            <span className="info-value">{doctor.joinedDate}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(doctor.id, doctor.status)}
                                            className={`btn btn-sm ${doctor.status === 'ACTIVE' ? 'btn-warning' : 'btn-success'}`}
                                        >
                                            {doctor.status === 'ACTIVE' ? "Désactiver" : "Activer"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredDoctors.length === 0 && (
                                <div className="text-center py-8 text-secondary">
                                    Aucun médecin trouvé.
                                </div>
                            )}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={filteredDoctors.length}
                            itemsPerPage={itemsPerPage}
                            itemName="médecins"
                        />
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
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
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

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: var(--spacing-xl);
                    margin-bottom: var(--spacing-2xl);
                }

                .stat-card {
                    padding: var(--spacing-xl);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xl);
                    background: var(--color-bg);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--color-border);
                    transition: transform 0.3s ease;
                }

                .stat-card:hover { transform: translateY(-5px); }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                    color: white;
                }

                .gradient-primary { background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); }
                .gradient-success { background: linear-gradient(135deg, #10b981, #059669); }
                .gradient-danger { background: linear-gradient(135deg, #ef4444, #dc2626); }

                .stat-info { display: flex; flex-direction: column; }
                .stat-value { font-size: 1.75rem; font-weight: 800; color: var(--color-text); line-height: 1; margin-bottom: 0.25rem; }
                .stat-label { color: var(--color-text-secondary); font-size: 0.875rem; font-weight: 500; }

                /* Filters Bar */
                .filters-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: var(--spacing-xl);
                    margin-bottom: var(--spacing-lg);
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: var(--color-bg);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--color-border);
                }

                .search-box {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    background: var(--color-bg-secondary);
                    padding: 0.6rem 1rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    transition: all 0.2s;
                }

                .search-box:focus-within {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.1);
                    background: var(--color-bg);
                }

                .search-box input {
                    flex: 1;
                    background: none;
                    border: none;
                    outline: none;
                    color: var(--color-text);
                    font-size: 0.95rem;
                }

                .filter-group {
                    display: flex;
                    gap: var(--spacing-xs);
                    background: var(--color-bg-secondary);
                    padding: 4px;
                    border-radius: var(--radius-md);
                }

                .filter-pill {
                    padding: 8px 16px;
                    border-radius: var(--radius-sm);
                    border: none;
                    background: transparent;
                    color: var(--color-text-secondary);
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .filter-pill:hover { color: var(--color-text); }

                .filter-pill.active {
                    background: var(--color-bg);
                    color: var(--color-primary);
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                }

                .card {
                    background: var(--color-bg);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--color-border);
                    overflow: hidden;
                }

                .table-wrapper { overflow-x: auto; }
                .data-table { width: 100%; border-collapse: separate; border-spacing: 0; }

                .data-table th {
                    text-align: left;
                    padding: var(--spacing-lg);
                    background: var(--color-bg-tertiary);
                    color: var(--color-text-secondary);
                    font-weight: 600;
                    font-size: var(--font-size-xs);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid var(--color-border);
                }

                .data-table td {
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--color-border-light);
                    vertical-align: middle;
                }

                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .user-avatar {
                    width: 44px; height: 44px; border-radius: var(--radius-full);
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-weight: 600; font-size: var(--font-size-lg);
                    flex-shrink: 0;
                }

                .gradient-primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); }

                .user-name { font-weight: 600; color: var(--color-text); }
                .user-email { font-size: var(--font-size-sm); color: var(--color-text-secondary); }

                .status-badge {
                    padding: 4px 10px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-badge.active { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); }
                .status-badge.pending { background: hsla(38, 92%, 50%, 0.1); color: var(--color-warning); }
                .status-badge.suspended { background: hsla(0, 84%, 60%, 0.1); color: var(--color-danger); }

                .btn-sm { padding: 6px 16px; font-size: 0.875rem; border-radius: var(--radius-md); border: none; cursor: pointer; transition: all var(--transition-fast); }

                .flex { display: flex; }
                .justify-end { justify-content: flex-end; }
                .text-right { text-align: right; }
                .font-medium { font-weight: 500; }
                .text-center { text-align: center; }
                .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
                .text-secondary { color: var(--color-text-secondary); }
                .gap-2 { gap: 0.5rem; }
                .mr-2 { margin-right: 0.5rem; }

                .btn-primary {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    box-shadow: 0 4px 12px hsla(210, 100%, 56%, 0.3);
                }

                .btn-primary:hover {
                    background: var(--color-primary-dark);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px hsla(210, 100%, 56%, 0.4);
                }

                .btn-danger {
                    background: transparent;
                    color: var(--color-danger);
                    border: 1px solid var(--color-danger);
                }

                .btn-danger:hover {
                    background: var(--color-danger);
                    color: white;
                    box-shadow: 0 4px 12px hsla(0, 84%, 60%, 0.3);
                }

                .btn-warning {
                    background: hsla(38, 92%, 50%, 0.1);
                    color: var(--color-warning);
                    border: 1px solid var(--color-warning);
                }

                .btn-warning:hover {
                    background: var(--color-warning);
                    color: white;
                }

                .btn-success {
                    background: hsla(142, 71%, 45%, 0.1);
                    color: var(--color-success);
                    border: 1px solid var(--color-success);
                }

                .btn-success:hover {
                    background: var(--color-success);
                    color: white;
                }

                /* Mobile Cards */
                .mobile-cards { display: none; }

                .doctor-card {
                    background: var(--color-bg);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-md);
                    border: 1px solid var(--color-border);
                    box-shadow: var(--shadow-sm);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    margin-bottom: var(--spacing-md);
                }

                .card-info .info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: var(--spacing-xs) 0;
                    border-bottom: 1px solid var(--color-border-light);
                    font-size: var(--font-size-sm);
                }

                .card-info .info-row:last-child { border-bottom: none; }
                .info-label { color: var(--color-text-secondary); }
                .info-value { font-weight: 500; color: var(--color-text); }

                .card-actions {
                    margin-top: var(--spacing-md);
                    display: flex;
                    justify-content: flex-end;
                }

                /* Mobile Responsive */
                @media (max-width: 968px) {
                    .mobile-header { display: flex; }
                    .main-content { margin-left: 0; padding: 5.5rem 1rem 2rem; width: 100%; transition: margin-left 0.3s ease; }
                    .sidebar { transform: translateX(-100%); width: 280px; z-index: 1045; }
                    .sidebar.open { transform: translateX(0); }
                    .page-header h1 { font-size: 2.25rem; }
                    .filters-bar { flex-direction: column; align-items: stretch; }
                    .filter-group { overflow-x: auto; padding-bottom: 8px; }
                    .table-wrapper { display: none; }
                    .mobile-cards { display: block; }
                    .mt-6 { margin-top: 1.5rem; }
                    .lg\:hidden { display: none; }
                }
                
                @media (min-width: 969px) {
                    .lg\:hidden { display: none; }
                }

                @media (max-width: 968px) {
                    .card.glass:has(.table-wrapper) { display: none; }
                    .lg\:hidden { display: block; }
                }
            `}</style>
        </div>
    );
}
