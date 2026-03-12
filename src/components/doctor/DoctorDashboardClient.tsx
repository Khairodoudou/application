"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { DoctorSidebar } from "./DoctorSidebar";
import { useTheme } from "@/components/providers/ThemeProvider";
import { FiCalendar, FiClock, FiUser, FiPhone, FiAlertCircle, FiArrowRight } from "react-icons/fi";
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
    Filler,
    ArcElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);

type DoctorDashboardProps = {
    doctor: any;
    stats: {
        pendingCount: number;
        upcomingCount: number;
        patientCount: number;
    };
    todayAppointments: any[];
    chartData: { label: string; value: number }[];
    statusDistribution: {
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
    };
    genderDistribution: {
        male: number;
        female: number;
    };
    ageDistribution: {
        "0-18": number;
        "19-35": number;
        "36-50": number;
        "51-65": number;
        "65+": number;
    };
};

export default function DoctorDashboardClient({
    doctor,
    stats,
    todayAppointments,
    chartData,
    statusDistribution,
    genderDistribution,
    ageDistribution
}: DoctorDashboardProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Theme-aware colors for charts
    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Fallback colors for during server-rendering or before hydration
    const gridColor = mounted ? (isDark ? 'rgba(255, 255, 255, 0.1)' : '#F1F5F9') : '#F1F5F9';
    const textColor = mounted ? (isDark ? '#94A3B8' : '#64748B') : '#64748B';
    const tooltipBg = mounted ? (isDark ? '#0F172A' : '#1E293B') : '#1E293B';
    const cardText = mounted ? (isDark ? '#E2E8F0' : '#1E293B') : '#1E293B';

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

    // Activity Chart Configuration
    const lineChartData = {
        labels: chartData.map(d => d.label),
        datasets: [
            {
                label: 'Consultations',
                data: chartData.map(d => d.value),
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3B82F6',
                tension: 0.4,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: tooltipBg,
                padding: 12,
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 13 },
                displayColors: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: { stepSize: 1, color: textColor }
            },
            x: {
                grid: { display: false },
                ticks: { color: textColor }
            },
        },
    };

    // Status Doughnut Configuration
    const statusChartData = {
        labels: ['Confirmés', 'En attente', 'Terminés', 'Annulés'],
        datasets: [{
            data: [
                statusDistribution.confirmed,
                statusDistribution.pending,
                statusDistribution.completed,
                statusDistribution.cancelled
            ],
            backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    // Gender Doughnut Configuration
    const genderChartData = {
        labels: ['Hommes', 'Femmes'],
        datasets: [{
            data: [
                genderDistribution.male,
                genderDistribution.female,
            ],
            backgroundColor: ['#3B82F6', '#EC4899'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12, weight: 600 },
                    color: textColor
                }
            },
            tooltip: {
                backgroundColor: tooltipBg,
                padding: 12,
                cornerRadius: 8,
            }
        },
        cutout: '70%'
    };

    // Age Bar Chart Configuration
    const ageBarData = {
        labels: Object.keys(ageDistribution),
        datasets: [{
            label: 'Nombre de patients',
            data: Object.values(ageDistribution),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 6,
            hoverBackgroundColor: '#2563EB',
        }]
    };

    const ageBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: tooltipBg,
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: gridColor, borderDash: [2, 2] },
                ticks: { stepSize: 1, color: textColor, font: { size: 10 } }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: textColor,
                    font: { weight: 700, size: 11 },
                    padding: 8
                }
            }
        },
        layout: {
            padding: {
                bottom: 10
            }
        }
    };

    return (
        <div className="dashboard-wrapper">
            <style jsx global>{`
                .chart-container-large { height: 350px; position: relative; }
                .chart-container-small { height: 280px; position: relative; }
            `}</style>
            <DoctorSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Bonjour, Dr. {doctor.lastName}</h1>
                        <p>Bienvenue sur votre espace professionnel</p>
                    </div>
                    <div className="header-actions">
                        {doctor.avatar ? (
                            <div className="doctor-avatar-dashboard">
                                <img src={doctor.avatar} alt={`Dr. ${doctor.lastName}`} />
                            </div>
                        ) : (
                            <div className="doctor-avatar-dashboard placeholder">
                                <span>👤</span>
                            </div>
                        )}
                        <span className="date-badge">
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="stats-grid">
                    <div className="stat-card modern shadow-md">
                        <div className="stat-icon-wrapper gradient-primary">
                            <FiUser className="stat-icon-new" />
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{stats.patientCount}</div>
                            <div className="stat-label">Patients Suivis</div>
                        </div>
                    </div>

                    <div className="stat-card modern shadow-md">
                        <div className="stat-icon-wrapper gradient-accent">
                            <FiCalendar className="stat-icon-new" />
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{stats.pendingCount}</div>
                            <div className="stat-label">Rendez-vous en attente</div>
                        </div>
                    </div>
                </section>

                {/* Today's Appointments Section */}
                <section className="appointments-section">
                    <div className="section-header">
                        <h2>Rendez-vous du jour</h2>
                        <Link href="/doctor/appointments" className="view-all-btn">
                            Voir tout <FiArrowRight />
                        </Link>
                    </div>

                    <div className="table-container modern shadow-md">
                        {todayAppointments.length > 0 ? (
                            <div className="table-wrapper">
                                <table className="dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Sexe</th>
                                            <th>Âge</th>
                                            <th>Téléphone</th>
                                            <th>Heure</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todayAppointments.map((app) => (
                                            <tr key={app.id}>
                                                <td>
                                                    <div className="patient-cell">
                                                        <div className="patient-avatar-mini">
                                                            {app.patient.avatar ? (
                                                                <img src={app.patient.avatar} alt="" />
                                                            ) : (
                                                                <span>{app.patient.firstName[0]}</span>
                                                            )}
                                                        </div>
                                                        <div className="patient-info-mini">
                                                            <span className="patient-name">{app.patient.lastName} {app.patient.firstName}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{app.patient?.healthProfile?.gender === 'M' ? 'Homme' : 'Femme'}</td>
                                                <td>{calculateAge(app.patient?.healthProfile?.birthDate) || 'NC'} ans</td>
                                                <td>{app.patient.phone || 'NC'}</td>
                                                <td>
                                                    <div className="time-badge">
                                                        <FiClock className="icon-sm" />
                                                        {new Date(app.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status-pill ${app.status.toLowerCase()}`}>
                                                        {app.status === 'PENDING' ? 'En attente' :
                                                            app.status === 'CONFIRMED' ? 'Confirmé' :
                                                                app.status === 'COMPLETED' ? 'Terminé' : 'Annulé'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon-wrapper">
                                    <FiCalendar />
                                </div>
                                <h3>Aucun rendez-vous prévu pour aujourd'hui</h3>
                                <p>Profitez de ce temps pour mettre à jour vos dossiers patients.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Analysis & Activity Grid - 2x2 Professional Layout */}
                <div className="analytics-grid">
                    {/* 1. Weekly Activity */}
                    <section className="chart-card shadow-md">
                        <div className="chart-header">
                            <h3>Activité hebdomadaire</h3>
                            <span className="chart-subtitle">Consultations confirmées et terminées (7 jours)</span>
                        </div>
                        <div className="chart-container-large">
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                    </section>

                    {/* 2. Appointment Status */}
                    <section className="chart-card shadow-md">
                        <div className="chart-header">
                            <h3>État des Rendez-vous</h3>
                            <p className="chart-subtitle">Répartition globale par status</p>
                        </div>
                        <div className="chart-container-small">
                            <Doughnut data={statusChartData} options={doughnutOptions} />
                        </div>
                    </section>

                    {/* 3. Patient Gender Demographics */}
                    <section className="chart-card shadow-md">
                        <div className="chart-header">
                            <h3>Démographie Patients</h3>
                            <p className="chart-subtitle">Répartition par sexe (Hommes / Femmes)</p>
                        </div>
                        <div className="chart-container-small">
                            <Doughnut data={genderChartData} options={doughnutOptions} />
                        </div>
                    </section>

                    {/* 4. Age Pyramid */}
                    <section className="chart-card shadow-md">
                        <div className="chart-header">
                            <h3>Pyramide des âges</h3>
                            <p className="chart-subtitle">Groupes d'âge des patients</p>
                        </div>
                        <div className="chart-container-small">
                            <Bar data={ageBarData} options={ageBarOptions} />
                        </div>
                    </section>
                </div>
            </main>

            <style jsx>{`
                .dashboard-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background: var(--color-bg-secondary);
                }

                .main-content {
                    margin-left: 280px;
                    padding: 2.5rem;
                    width: calc(100% - 280px);
                    transition: all 0.3s ease;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2.5rem;
                }

                .dashboard-header h1 {
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    color: var(--color-text);
                }

                .dashboard-header p {
                    color: var(--color-text-secondary);
                    font-size: 1.125rem;
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .doctor-avatar-dashboard {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid var(--color-bg);
                    box-shadow: var(--shadow-md);
                }

                .doctor-avatar-dashboard img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .doctor-avatar-dashboard.placeholder {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    background: var(--color-bg-tertiary);
                }

                .date-badge {
                    padding: 0.75rem 1.25rem;
                    background: var(--color-bg);
                    border-radius: 1rem;
                    font-weight: 600;
                    color: var(--color-text-secondary);
                    box-shadow: var(--shadow-sm);
                    font-size: 0.95rem;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .stat-card.modern {
                    background: var(--color-bg);
                    padding: 1.75rem;
                    border-radius: 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    border: 1px solid var(--color-border-light);
                    transition: all 0.2s ease;
                }

                .stat-card.modern:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }

                .stat-icon-wrapper {
                    width: 60px;
                    height: 60px;
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.75rem;
                }

                .gradient-primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); }
                .gradient-accent { background: linear-gradient(135deg, var(--color-success), var(--color-accent-dark)); }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--color-text);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    color: var(--color-text-secondary);
                    font-weight: 500;
                    font-size: 0.95rem;
                }

                /* Appointments Section */
                .appointments-section {
                    margin-top: 2rem;
                    margin-bottom: 2.5rem;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .section-header h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-text);
                }

                .view-all-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.625rem 1.25rem;
                    background: var(--color-bg-secondary);
                    color: var(--color-primary);
                    border-radius: 0.75rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    border: 1px solid var(--color-border);
                }

                .view-all-btn:hover {
                    background: var(--color-primary);
                    color: white;
                    transform: translateX(4px);
                    box-shadow: var(--shadow-md);
                }

                .table-container.modern {
                    background: var(--color-bg);
                    border-radius: 1.25rem;
                    overflow: hidden;
                    border: 1px solid var(--color-border-light);
                }

                .table-wrapper {
                    overflow-x: auto;
                }

                .dashboard-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .dashboard-table th {
                    text-align: left;
                    padding: 1.25rem 1.5rem;
                    background: var(--color-bg-secondary);
                    font-weight: 600;
                    color: var(--color-text-secondary);
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                    border-bottom: 1px solid var(--color-border-light);
                }

                .dashboard-table td {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid var(--color-border-light);
                    color: var(--color-text);
                    font-size: 0.95rem;
                    vertical-align: middle;
                }

                .patient-cell {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .patient-avatar-mini {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #EFF6FF;
                    color: #3B82F6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    overflow: hidden;
                }

                .patient-avatar-mini img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .patient-name {
                    font-weight: 600;
                }

                .time-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    background: var(--color-bg-tertiary);
                    border-radius: 0.5rem;
                    font-weight: 700;
                    color: var(--color-primary);
                }

                .icon-sm {
                   font-size: 1.1rem;
                }

                .status-pill {
                    padding: 0.375rem 0.75rem;
                    border-radius: 2rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-pill.pending { background: #FEF3C7; color: #92400E; }
                .status-pill.confirmed { background: #DCFCE7; color: #166534; }
                .status-pill.completed { background: #DBEAFE; color: #1E40AF; }
                .status-pill.cancelled { background: #FEE2E2; color: #991B1B; }

                /* Empty State */
                .empty-state {
                    padding: 5rem 2.5rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .empty-icon-wrapper {
                    width: 80px;
                    height: 80px;
                    background: var(--color-bg-secondary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    color: var(--color-text-tertiary);
                    margin-bottom: 1.5rem;
                }

                .empty-state h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-text);
                    margin-bottom: 0.75rem;
                }

                .empty-state p {
                    color: var(--color-text-secondary);
                    max-width: 400px;
                    line-height: 1.6;
                }

                /* Analytics Grid Layout */
                .analytics-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .chart-card {
                    background: var(--color-bg);
                    padding: 2rem;
                    border-radius: 1.25rem;
                    border: 1px solid var(--color-border-light);
                    display: flex;
                    flex-direction: column;
                    min-height: 420px;
                    justify-content: space-between;
                }

                .chart-header {
                    margin-bottom: 1.5rem;
                }

                .chart-header h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--color-text);
                    margin-bottom: 0.25rem;
                }

                .chart-subtitle {
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                }

                .chart-subtitle-mini {
                    font-size: 0.75rem;
                    color: var(--color-text-tertiary);
                    font-weight: 600;
                    text-transform: uppercase;
                }

                /* Mobile Responsive */
                @media (max-width: 1280px) {
                    .analytics-grid {
                        grid-template-columns: 1fr;
                    }
                    .chart-card {
                        min-height: auto;
                    }
                }

                @media (max-width: 1024px) {
                    .main-content {
                        margin-left: 0;
                        width: 100%;
                        padding: 1.5rem;
                        padding-top: 100px;
                    }
                    .dashboard-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1.5rem;
                    }
                    .header-actions {
                        width: 100%;
                        justify-content: space-between;
                    }
                }

                @media (max-width: 768px) {
                    .dashboard-header {
                        align-items: center;
                        text-align: center;
                    }
                    .header-actions {
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 1rem;
                    }
                    .chart-container-large {
                        height: 250px;
                    }
                    .chart-container-small {
                        height: 220px;
                    }
                }
            `}</style>
        </div>
    );
}
