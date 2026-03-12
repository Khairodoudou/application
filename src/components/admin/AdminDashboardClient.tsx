"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";
import { AdminSidebar } from "./AdminSidebar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useEffect, useState, useMemo } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

type DashboardStats = {
    totalUsers: number;
    activeDoctors: number;
    totalPatients: number;
    totalScans: number;
    acceptedReports: number;
};

type PendingDoctor = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    specialty: string;
    licenseNumber: string;
    clinic: string;
    joinedDate: string;
};

type AdminDashboardProps = {
    stats: DashboardStats;
    pendingDoctors: PendingDoctor[];
};

export default function AdminDashboardClient({ stats: initialStats, pendingDoctors: initialPendingDoctors }: AdminDashboardProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [pendingDoctors, setPendingDoctors] = useState(initialPendingDoctors);
    const [stats, setStats] = useState(initialStats);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

    // Chart Theme Logic
    const [chartColors, setChartColors] = useState({
        primary: 'rgb(59, 130, 246)',
        success: 'rgb(16, 185, 129)',
        secondary: 'rgb(139, 92, 246)',
        warning: 'rgb(245, 158, 11)',
        bg: 'rgb(255, 255, 255)',
        text: 'rgb(0, 0, 0)',
        border: 'rgb(229, 231, 235)'
    });

    useEffect(() => {
        const updateChartColors = () => {
            const styles = getComputedStyle(document.documentElement);
            setChartColors({
                primary: styles.getPropertyValue('--color-primary').trim(),
                success: styles.getPropertyValue('--color-success').trim(),
                secondary: styles.getPropertyValue('--color-secondary').trim(),
                warning: styles.getPropertyValue('--color-warning').trim(),
                bg: styles.getPropertyValue('--color-bg').trim(),
                text: styles.getPropertyValue('--color-text').trim(),
                border: styles.getPropertyValue('--color-border').trim()
            });
        };

        // Initial update
        updateChartColors();

        // Listen for theme changes (if using a theme switcher that updates local storage or adds classes)
        // Also listen for system preference changes
        const matcher = window.matchMedia('(prefers-color-scheme: dark)');
        matcher.addEventListener('change', updateChartColors);

        return () => matcher.removeEventListener('change', updateChartColors);
    }, []);

    // Pagination logic for pending doctors
    const totalPages = Math.ceil(pendingDoctors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDoctors = pendingDoctors.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page if current page becomes empty
    useMemo(() => {
        if (currentPage > 1 && paginatedDoctors.length === 0) {
            setCurrentPage(Math.max(1, totalPages));
        }
    }, [pendingDoctors.length, paginatedDoctors.length, currentPage, totalPages]);



    const handleApprove = async (doctorId: string) => {
        try {
            const response = await fetch(`/api/admin/doctors/${doctorId}/approve`, {
                method: "PATCH",
            });

            if (response.ok) {
                // Remove from pending list
                setPendingDoctors(prev => prev.filter(d => d.id !== doctorId));
                // Update stats locally
                setStats(prev => ({ ...prev, activeDoctors: prev.activeDoctors + 1 }));
                router.refresh(); // Sync with server data
            } else {
                alert("Erreur lors de l'activation du compte.");
            }
        } catch (error) {
            console.error("Error approving doctor:", error);
            alert("Une erreur est survenue.");
        }
    };

    const handleReject = async (doctorId: string) => {
        if (!confirm("Voulez-vous vraiment rejeter et supprimer ce compte médecin ?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/doctors/${doctorId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setPendingDoctors(prev => prev.filter(d => d.id !== doctorId));
                router.refresh();
            } else {
                alert("Erreur lors du rejet de la demande.");
            }
        } catch (error) {
            console.error("Error rejecting doctor:", error);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <div className="dashboard-wrapper">
            <AdminSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="dashboard-header">
                    <div>
                        <h1>📊 Tableau de Bord</h1>
                        <p>Vue d'ensemble de la plateforme Smart Health</p>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="stats-grid">
                    <div className="stat-card glass animate-fade-in">
                        <div className="stat-icon gradient-primary">👥</div>
                        <div className="stat-info">
                            <div className="stat-label">Utilisateurs Total</div>
                            <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
                            <div className="stat-trend positive">
                                <span>+12%</span> ce mois
                            </div>
                        </div>
                    </div>

                    <div className="stat-card glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="stat-icon gradient-accent">👨‍⚕️</div>
                        <div className="stat-info">
                            <div className="stat-label">Médecins Actifs</div>
                            <div className="stat-value">{stats.activeDoctors}</div>
                            <div className="stat-trend positive">
                                <span>+5%</span> ce mois
                            </div>
                        </div>
                    </div>

                    <div className="stat-card glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="stat-icon gradient-primary">👤</div>
                        <div className="stat-info">
                            <div className="stat-label">Patients Inscrits</div>
                            <div className="stat-value">{stats.totalPatients.toLocaleString()}</div>
                            <div className="stat-trend positive">
                                <span>+8%</span> ce mois
                            </div>
                        </div>
                    </div>



                    <div className="stat-card glass animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="stat-icon gradient-success">✅</div>
                        <div className="stat-info">
                            <div className="stat-label">Signalements acceptés</div>
                            <div className="stat-value">{stats.acceptedReports}</div>
                            <div className="stat-trend neutral">
                                <span>Stable</span> ce mois
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Grid and then... */}
                <div className="dashboard-grid">
                    <div className="left-column">
                        {/* Pending Approvals */}
                        <section className="content-section">
                            <div className="section-header">
                                <h2>Demandes d'Abonnement en Attente</h2>
                            </div>

                            <div className="card glass">
                                <div className="table-wrapper">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Médecin</th>
                                                <th className="hide-mobile">Spécialité</th>
                                                <th className="hide-mobile">Date</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedDoctors.map(doctor => (
                                                <tr key={doctor.id}>
                                                    <td>
                                                        <div className="user-cell">
                                                            <div className="user-avatar gradient-accent">
                                                                {doctor.firstName[0]}{doctor.lastName[0]}
                                                            </div>
                                                            <div>
                                                                <div className="user-name">Dr. {doctor.firstName} {doctor.lastName}</div>
                                                                <div className="user-email">{doctor.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hide-mobile">{doctor.specialty}</td>
                                                    <td className="hide-mobile">{doctor.joinedDate}</td>
                                                    <td>
                                                        <div className="action-buttons justify-end">
                                                            <button
                                                                onClick={() => handleApprove(doctor.id)}
                                                                className="btn-icon btn-success"
                                                                title="Valider"
                                                            >
                                                                ✓
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(doctor.id)}
                                                                className="btn-icon btn-danger"
                                                                title="Rejeter"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {pendingDoctors.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-8 text-secondary">
                                                        Aucune demande en attente.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* CHARTS SECTION */}
                        <section className="content-section charts-section">
                            <div className="section-header">
                                <h2>Analyses & Statistiques</h2>
                            </div>
                            <div className="charts-grid">
                                <div className="chart-card glass">
                                    <h3>Répartition des Utilisateurs</h3>
                                    <div className="chart-container">
                                        <Doughnut
                                            data={{
                                                labels: ['Médecins', 'Patients'],
                                                datasets: [
                                                    {
                                                        data: [stats.activeDoctors, stats.totalPatients],
                                                        backgroundColor: [
                                                            chartColors.primary,
                                                            chartColors.success,
                                                        ],
                                                        borderColor: [
                                                            chartColors.bg,
                                                            chartColors.bg,
                                                        ],
                                                        borderWidth: 2,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom' as const,
                                                        labels: { color: chartColors.text }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="chart-card glass">
                                    <h3>Activité de la Plateforme</h3>
                                    <div className="chart-container">
                                        <Bar
                                            data={{
                                                labels: ['Analyses Effectuées', 'Signalements Résolus'],
                                                datasets: [
                                                    {
                                                        label: 'Volume Total',
                                                        data: [stats.totalScans, stats.acceptedReports],
                                                        backgroundColor: [
                                                            chartColors.secondary,
                                                            chartColors.warning,
                                                        ],
                                                        borderColor: [
                                                            chartColors.secondary,
                                                            chartColors.warning,
                                                        ],
                                                        borderWidth: 0,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: {
                                                        position: 'top' as const,
                                                        labels: { color: chartColors.text }
                                                    },
                                                },
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        ticks: { color: chartColors.text },
                                                        grid: { color: chartColors.border }
                                                    },
                                                    x: {
                                                        ticks: { color: chartColors.text },
                                                        grid: { display: false }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>


                </div>


            </main>

            <style jsx>{`
                .dashboard-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background: var(--color-bg-secondary);
                }

                /* Main Content */
                .main-content {
                    flex: 1;
                    margin-left: 280px; 
                    padding: var(--spacing-2xl); 
                    width: calc(100% - 280px); 
                    transition: all 0.3s ease;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--spacing-xl);
                }

                .dashboard-header h1 {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-xs);
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .dashboard-header p {
                    color: var(--color-text-secondary);
                    margin: 0;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-xl);
                }

                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                    padding: var(--spacing-xl);
                    background: var(--color-bg);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--color-border);
                    transition: transform var(--transition-base);
                }
                
                .stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    border-radius: var(--radius-md);
                    color: white;
                    flex-shrink: 0;
                }
                
                .gradient-primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); }
                .gradient-accent { background: linear-gradient(135deg, var(--color-accent), var(--color-secondary)); }
                .gradient-success { background: linear-gradient(135deg, #10B981, #059669); }

                .stat-info { flex: 1; }

                .stat-value {
                    font-size: var(--font-size-3xl);
                    font-weight: 800;
                    color: var(--color-text);
                    line-height: 1;
                    margin-bottom: var(--spacing-xs);
                }

                .stat-label {
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    color: var(--color-text-secondary);
                    margin-bottom: var(--spacing-xs);
                }

                .stat-trend {
                    font-size: var(--font-size-xs);
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-top: var(--spacing-sm);
                }

                .stat-trend span {
                    font-weight: 700;
                }

                .stat-trend.positive { color: #10B981; }
                .stat-trend.negative { color: #EF4444; }
                .stat-trend.neutral { color: var(--color-text-secondary); }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                    opacity: 0;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Content Sections */
                .content-section { margin-bottom: var(--spacing-xl); }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-lg);
                }

                .section-header h2 {
                    font-size: var(--font-size-2xl);
                    margin: 0;
                    color: var(--color-text);
                }

                /* Table */
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
                    padding: var(--spacing-md);
                    font-weight: 600;
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                    border-bottom: 1px solid var(--color-border);
                    background: var(--color-bg-tertiary);
                }
                
                .data-table td {
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--color-border-light);
                    vertical-align: middle;
                }

                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }
                
                .user-avatar {
                    width: 40px; height: 40px; border-radius: var(--radius-full);
                    background: var(--color-primary); color: white;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 600; font-size: var(--font-size-sm);
                    flex-shrink: 0;
                }
                
                .user-name { font-weight: 600; color: var(--color-text); }
                .user-email { font-size: var(--font-size-sm); color: var(--color-text-secondary); }

                .action-buttons { display: flex; gap: var(--spacing-sm); }
                .justify-end { justify-content: flex-end; }
                .text-right { text-align: right; }

                .btn-icon {
                    width: 32px; height: 32px; border-radius: var(--radius-md);
                    border: none; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    font-size: var(--font-size-base);
                    transition: all var(--transition-fast);
                }
                
                .btn-success { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); }
                .btn-success:hover { background: var(--color-success); color: white; }
                .btn-danger { background: hsla(0, 84%, 60%, 0.1); color: var(--color-danger); }
                .btn-danger:hover { background: var(--color-danger); color: white; }

                /* Responsive */
                @media (max-width: 1200px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 968px) {
                    .mobile-header { display: flex; }
                    .main-content { margin-left: 0; padding: 5.5rem 1rem 2rem; width: 100%; transition: margin-left 0.3s ease; }
                    .sidebar { transform: translateX(-100%); width: 280px; z-index: 1045; }
                    .sidebar.open { transform: translateX(0); }
                    .dashboard-header h1 { font-size: 1.75rem; }
                    .dashboard-header { flex-direction: column; gap: var(--spacing-md); }
                    .btn-premium-nav { width: 100%; justify-content: center; }
                    .stats-grid { grid-template-columns: 1fr; }
                }


                /* Charts */
                .charts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: var(--spacing-xl);
                }

                .chart-card {
                    padding: var(--spacing-xl);
                    background: var(--color-bg);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--color-border);
                }

                .chart-card h3 {
                    margin-top: 0;
                    margin-bottom: var(--spacing-lg);
                    font-size: var(--font-size-lg);
                    color: var(--color-text);
                }

                .chart-container {
                    position: relative;
                    height: 300px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                @media (max-width: 768px) {
                    .hide-mobile { display: none; }
                    .charts-grid { grid-template-columns: 1fr; }
                }



            `}</style>
        </div>
    );
}
