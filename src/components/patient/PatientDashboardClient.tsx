"use client";

import Link from "next/link";
import { useState } from "react";
import { PatientSidebar } from "./PatientSidebar";
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
import { Line, Doughnut } from 'react-chartjs-2';

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

type PatientDashboardProps = {
  patient: any;
  stats: {
    totalScans: number;
    safeScans: number;
    warningScans: number;
    unsafeScans: number;
    pendingAppointmentsCount: number;
    uniqueDoctorsCount: number;
    statusDistribution: {
      pending: number;
      confirmed: number;
      completed: number;
      cancelled: number;
    };
    chartActivity: { label: string; value: number }[];
  };
  recentScans: any[];
};

export default function PatientDashboardClient({ patient, stats, recentScans: initialScans }: PatientDashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = (patient.patientAppointments || []).filter((app: any) => {
    const searchStr = `${app.doctor.firstName} ${app.doctor.lastName} ${app.doctor.doctorProfile?.specialty || ""}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  // Chart Data: Activity (Line)
  const activityData = {
    labels: stats.chartActivity.map(d => d.label),
    datasets: [{
      label: 'Rendez-vous',
      data: stats.chartActivity.map(d => d.value),
      fill: true,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
    }]
  };

  const activityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { stepSize: 1, color: '#94A3B8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8' }
      }
    }
  };

  // Chart Data: Status (Doughnut)
  const statusChartData = {
    labels: ['En attente', 'Confirmés', 'Terminés', 'Annulés'],
    datasets: [{
      data: [
        stats.statusDistribution.pending,
        stats.statusDistribution.confirmed,
        stats.statusDistribution.completed,
        stats.statusDistribution.cancelled
      ],
      backgroundColor: ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'],
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
          color: (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#94A3B8' : '#64748B'
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="dashboard-wrapper">
      <PatientSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Bonjour, {patient.firstName} 👋</h1>
            <p>Bienvenue sur votre espace santé</p>
          </div>
          <Link href="/patient/scan" className="btn btn-primary btn-lg shadow-blue">
            <span>🔍</span> <span className="text-white">Scanner un produit</span>
          </Link>
        </header>

        {/* Quick Stats Cards */}
        <section className="highlights-grid">
          <div className="highlight-card glass shadow-sm">
            <div className="highlight-icon gradient-primary">⏳</div>
            <div className="highlight-info">
              <span className="highlight-value">{stats.pendingAppointmentsCount}</span>
              <span className="highlight-label">RDV en attente</span>
            </div>
          </div>
          <div className="highlight-card glass shadow-sm">
            <div className="highlight-icon gradient-primary">👨‍⚕️</div>
            <div className="highlight-info">
              <span className="highlight-value">{stats.uniqueDoctorsCount}</span>
              <span className="highlight-label">Médecins consultés</span>
            </div>
          </div>
        </section>

        {/* Mes Rendez-vous Section */}
        <section className="content-section">
          <div className="section-header-group">
            <div className="section-header">
              <h2>Mes Rendez-vous</h2>
            </div>

            <div className="header-actions">
              <Link href="/patient/appointments" className="view-all-link">
                Voir tout l'historique <span>→</span>
              </Link>
              <div className="search-bar-container glass">
                <div className="search-icon">🔍</div>
                <input
                  type="text"
                  placeholder="Rechercher par médecin ou spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          <div className="table-container glass shadow-md">
            {filteredAppointments.length > 0 ? (
              <div className="table-wrapper">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Docteur</th>
                      <th>Spécialité</th>
                      <th>Date & Heure</th>
                      <th>Téléphone</th>
                      <th>Localisation</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((app: any) => (
                      <tr key={app.id}>
                        <td>
                          <div className="doctor-cell">
                            <div className="doctor-avatar">
                              {app.doctor.avatar ? (
                                <img src={app.doctor.avatar} alt="" />
                              ) : (
                                <span>👨‍⚕️</span>
                              )}
                            </div>
                            <div className="doctor-name">
                              Dr. {app.doctor.lastName} {app.doctor.firstName}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="specialty-text">
                            {app.doctor.doctorProfile?.specialty || "Généraliste"}
                          </span>
                        </td>
                        <td>
                          <div className="date-cell">
                            <span className="date-icon">📅</span>
                            <div className="date-info">
                              <div className="date-primary">{new Date(app.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}</div>
                              <div className="date-secondary">{new Date(app.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {app.doctor.phone ? (
                            <a href={`tel:${app.doctor.phone}`} className="phone-link ripple">
                              <span className="phone-icon">📞</span>
                              {app.doctor.phone}
                            </a>
                          ) : (
                            <span className="text-muted">N/A</span>
                          )}
                        </td>
                        <td>
                          {app.doctor.doctorProfile?.googleMapsLink ? (
                            <a
                              href={app.doctor.doctorProfile.googleMapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="location-btn"
                              title="Voir sur Google Maps"
                            >
                              <span className="map-icon">📍</span>
                              <span>Maps</span>
                            </a>
                          ) : (
                            <span className="text-muted">N/A</span>
                          )}
                        </td>
                        <td>
                          <span className={`status-badge ${app.status.toLowerCase()}`}>
                            {app.status === 'PENDING' ? 'En attente' :
                              app.status === 'CONFIRMED' ? 'Confirmé' :
                                app.status === 'COMPLETED' ? 'Terminé' : app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>{searchTerm ? "Aucun résultat trouvé" : "Aucun rendez-vous à venir"}</h3>
                <p>
                  {searchTerm
                    ? `Aucun rendez-vous ne correspond à "${searchTerm}"`
                    : "Vous n'avez pas de consultations prévues pour le moment."
                  }
                </p>
                {!searchTerm && (
                  <Link href="/patient/doctors" className="btn btn-primary mt-4">
                    Prendre rendez-vous
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Advanced Analytics - Charts Layer */}
        <section className="analytics-section">
          <h2 className="section-title">Analyse de mon activité</h2>
          <div className="analytics-grid">
            <div className="chart-card glass shadow-sm">
              <div className="chart-header">
                <h3>Activité Mensuelle</h3>
                <p>Nombre de rendez-vous sur les 6 derniers mois</p>
              </div>
              <div className="chart-container-large">
                <Line data={activityData} options={activityOptions} />
              </div>
            </div>

            <div className="chart-card glass shadow-sm">
              <div className="chart-header">
                <h3>Répartition par Statut</h3>
                <p>Historique global de vos rendez-vous</p>
              </div>
              <div className="chart-container-small">
                <Doughnut data={statusChartData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: var(--color-bg-secondary);
          transition: background-color 0.3s ease;
        }

        /* Main Content */
        .main-content {
          margin-left: 280px;
          padding: var(--spacing-2xl);
          width: calc(100% - 280px);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
        }

        .dashboard-header h1 {
          font-size: var(--font-size-4xl);
          font-weight: 800;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-lg);
        }

        /* Highlights Grid */
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .highlight-card {
          padding: var(--spacing-lg) var(--spacing-xl);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .highlight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        .highlight-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          flex-shrink: 0;
        }

        .gradient-primary {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        }

        .highlight-value {
          display: block;
          font-size: var(--font-size-3xl);
          font-weight: 800;
          color: var(--color-text);
          line-height: 1;
        }

        .highlight-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          font-weight: 600;
        }

        /* ========================================
           SECTION HEADER & SEARCH
           ======================================== */
        .section-header-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .header-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          flex: 1;
          max-width: 420px;
        }

        .section-header h2 {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
          background: hsla(210, 100%, 56%, 0.06);
        }

        .view-all-link:hover {
          background: hsla(210, 100%, 56%, 0.12);
          transform: translateX(2px);
        }

        .search-bar-container {
          position: relative;
          min-width: 300px;
          flex: 1;
          max-width: 420px;
          border-radius: var(--radius-lg);
          transition: box-shadow 0.2s ease;
        }

        .search-bar-container:focus-within {
          box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.15);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.7rem 1rem 0.7rem 2.75rem;
          background: transparent;
          border: none;
          color: var(--color-text);
          font-size: 0.9rem;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--color-text-secondary);
          opacity: 0.7;
        }

        /* ========================================
           TABLE — PROFESSIONAL DESIGN
           ======================================== */
        .table-container {
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
        }

        .table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .appointments-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 700px;
        }

        .appointments-table thead {
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .appointments-table th {
          padding: 1rem 1.25rem;
          background: var(--color-bg-secondary);
          font-weight: 700;
          color: var(--color-text-secondary);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 2px solid var(--color-border);
          white-space: nowrap;
        }

        .appointments-table th:first-child { padding-left: 1.5rem; }
        .appointments-table th:last-child { padding-right: 1.5rem; }

        .appointments-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-text);
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .appointments-table td:first-child { padding-left: 1.5rem; }
        .appointments-table td:last-child { padding-right: 1.5rem; }

        .appointments-table tbody tr {
          transition: background 0.15s ease;
        }

        .appointments-table tbody tr:nth-child(even) {
          background: rgba(0, 0, 0, 0.015);
        }

        .appointments-table tbody tr:hover {
          background: hsla(210, 100%, 56%, 0.04);
        }

        .appointments-table tbody tr:last-child td {
          border-bottom: none;
        }

        /* Doctor Cell */
        .doctor-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .doctor-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          background: linear-gradient(135deg, hsla(210, 100%, 56%, 0.1), hsla(280, 85%, 60%, 0.1));
          flex-shrink: 0;
          overflow: hidden;
        }

        .doctor-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .doctor-name {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .specialty-text {
          display: inline-block;
          font-weight: 600;
          color: var(--color-primary);
          background: hsla(210, 100%, 56%, 0.08);
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          white-space: nowrap;
        }

        /* Date Cell */
        .date-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .date-icon {
          font-size: 1rem;
          opacity: 0.7;
        }

        .date-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .date-primary {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--color-text);
          white-space: nowrap;
        }

        .date-secondary {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        /* Phone Link */
        .phone-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .phone-link:hover {
          color: var(--color-primary);
          background: hsla(210, 100%, 56%, 0.06);
        }

        .phone-icon { font-size: 0.85rem; }

        /* Location Button */
        .location-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-md);
          background: hsla(0, 0%, 50%, 0.06);
          transition: all 0.2s ease;
        }

        .location-btn:hover {
          background: hsla(142, 71%, 45%, 0.1);
          color: var(--color-success);
        }

        .map-icon { font-size: 0.85rem; }

        .text-muted {
          color: var(--color-text-secondary);
          opacity: 0.5;
          font-size: 0.8rem;
          font-style: italic;
        }

        /* ========================================
           STATUS BADGES — PILL STYLE
           ======================================== */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .status-badge.pending {
          background: hsla(38, 92%, 50%, 0.1);
          color: hsl(38, 92%, 40%);
        }

        .status-badge.confirmed {
          background: hsla(210, 100%, 56%, 0.1);
          color: hsl(210, 100%, 45%);
        }

        .status-badge.completed {
          background: hsla(142, 71%, 45%, 0.1);
          color: hsl(142, 71%, 35%);
        }

        .status-badge.cancelled {
          background: hsla(0, 84%, 60%, 0.1);
          color: hsl(0, 84%, 45%);
        }

        /* ========================================
           EMPTY STATE — PREMIUM
           ======================================== */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .empty-icon {
          font-size: 3.5rem;
          margin-bottom: 1.25rem;
          opacity: 0.4;
          filter: grayscale(40%);
        }

        .empty-state h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          max-width: 380px;
          line-height: 1.5;
          margin-bottom: 0;
        }

        .empty-state .btn {
          margin-top: 1.5rem;
        }

        /* ========================================
           ANALYTICS SECTION
           ======================================== */
        .analytics-section {
          margin-top: 3.5rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 1.5rem;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-card {
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
        }

        .chart-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .chart-header p {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
        }

        .chart-container-large { height: 300px; position: relative; }
        .chart-container-small { height: 300px; position: relative; }

        /* Utilities */
        .shadow-blue { box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2); }
        .text-white { color: white !important; }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 1024px) {
          .main-content { margin-left: 0; width: 100%; padding: 1.5rem; padding-top: 100px; }
          .analytics-grid { grid-template-columns: 1fr; }
          .highlights-grid { grid-template-columns: 1fr; }
          .section-header-group { flex-direction: column; align-items: stretch; }
          .header-actions { max-width: 100%; align-items: center; margin-top: 1rem; }
          .search-bar-container { min-width: 100%; max-width: 100%; }
        }

        @media (max-width: 768px) {
          .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .appointments-table { min-width: 600px; }
        }
      `}</style>
    </div>
  );
}
