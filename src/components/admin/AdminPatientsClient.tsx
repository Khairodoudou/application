"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type Patient = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    scansCount: number;
    joinedDate: string;
};

export default function AdminPatientsClient({ patients: initialPatients, totalPatients }: { patients: Patient[], totalPatients: number }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [patients, setPatients] = useState(initialPatients);
    const router = useRouter();

    const filteredPatients = useMemo(() => {
        return patients.filter(p =>
            p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, patients]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page when search changes
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce patient ? Cette action est irréversible.")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/patients/${id}`, {
                method: "DELETE",
            });


            if (response.ok) {
                // Remove from local state immediately for better UX
                setPatients(patients.filter(p => p.id !== id));
                router.refresh(); // Sync with server
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
        const headers = ["ID", "Prénom", "Nom", "Email", "Téléphone", "Scans Réalisés", "Date d'inscription"];
        const csvRows = [
            headers.join(";"),
            ...filteredPatients.map(p => [
                p.id,
                p.firstName,
                p.lastName,
                p.email,
                p.phone || "",
                p.scansCount,
                p.joinedDate
            ].map(val => `"${val}"`).join(";"))
        ];

        const csvContent = "\uFEFF" + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `patients_${new Date().toISOString().split('T')[0]}.csv`);
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
                        <h1>Gestion des Patients</h1>
                        <p>Liste des patients inscrits sur la plateforme</p>
                    </div>
                </header>

                <section className="stats-grid">
                    <div className="stat-card glass">
                        <div className="stat-icon gradient-accent">👤</div>
                        <div className="stat-info">
                            <div className="stat-value">{totalPatients.toLocaleString()}</div>
                            <div className="stat-label">Patients Total</div>
                        </div>
                    </div>
                </section>

                <section className="content-section">
                    <div className="filters-bar glass">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Rechercher un patient..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                                        <th>Patient</th>
                                        <th className="hide-mobile">Téléphone</th>
                                        <th>Scans <span className="hide-mobile">Réalisés</span></th>
                                        <th className="hide-mobile">Inscription</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPatients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar gradient-accent">
                                                        {patient.firstName[0]}{patient.lastName[0]}
                                                    </div>
                                                    <div>
                                                        <div className="user-name">{patient.firstName} {patient.lastName}</div>
                                                        <div className="user-email">{patient.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hide-mobile">{patient.phone || "N/A"}</td>
                                            <td className="font-medium text-center-mobile">{patient.scansCount}</td>
                                            <td className="hide-mobile">{patient.joinedDate}</td>
                                            <td>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleDelete(patient.id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPatients.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-8 text-secondary">
                                                Aucun patient trouvé.
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
                            totalItems={filteredPatients.length}
                            itemsPerPage={itemsPerPage}
                            itemName="patients"
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
                
                .gradient-accent { background: linear-gradient(135deg, var(--color-accent), var(--color-primary)); }

                .user-name { font-weight: 600; color: var(--color-text); }
                .user-email { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
                
                .btn-sm { padding: 6px 16px; font-size: 0.875rem; }
                
                .flex { display: flex; }
                .justify-end { justify-content: flex-end; }
                .text-right { text-align: right; }
                .font-medium { font-weight: 500; }
                .text-center { text-align: center; }
                .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
                .text-secondary { color: var(--color-text-secondary); }
                .mr-2 { margin-right: 0.5rem; }

                .btn-primary {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    box-shadow: 0 4px 12px hsla(210, 100%, 56%, 0.3);
                    padding: 8px 16px;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-fast);
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

                /* Mobile Responsive */
                @media (max-width: 968px) {
                    .mobile-header { display: flex; }
                    .main-content { margin-left: 0; padding: 5.5rem 1rem 2rem; width: 100%; transition: margin-left 0.3s ease; }
                    .sidebar { transform: translateX(-100%); width: 280px; z-index: 1045; }
                    .sidebar.open { transform: translateX(0); }
                    .page-header h1 { font-size: 2.25rem; }
                    .filters-bar { flex-direction: column; align-items: stretch; }
                    .hide-mobile { display: none; }
                    .text-center-mobile { text-align: center; }
                    .data-table th, .data-table td { padding: var(--spacing-md); }
                }
            `}</style>
        </div>
    );
}
