"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Pagination } from "@/components/ui/Pagination";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type AdminReportsClientProps = {
    reports: any[];
};

export default function AdminReportsClient({ reports }: AdminReportsClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

    // Pagination logic
    const totalPages = Math.ceil(reports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedReports = reports.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page if current page becomes empty (e.g., after deletion)
    if (currentPage > 1 && paginatedReports.length === 0) {
        setCurrentPage(Math.max(1, totalPages));
    }

    const handleValidate = async (reportId: string) => {
        setIsProcessing(true);
        try {
            const response = await fetch(`/api/admin/reports/${reportId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status_signale: "valider" }),
            });

            if (response.ok) {
                router.refresh();
            } else {
                alert("Erreur lors de la validation");
            }
        } catch (error) {
            console.error("VALIDATION_ERROR", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (reportId: string) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce signalement ? Cette action est irréversible.")) {
            return;
        }

        setIsProcessing(true);
        try {
            const response = await fetch(`/api/admin/reports/${reportId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                router.refresh();
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("DELETE_ERROR", error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Calculate quick stats
    const totalReports = reports.length;
    const pendingReports = reports.filter(r => r.status === "PENDING").length;
    const resolvedReports = reports.filter(r => r.status === "RESOLVED").length;

    return (
        <div className="dashboard-wrapper">
            <AdminSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header flex-header">
                    <div>
                        <h1>Signalements des Utilisateurs</h1>
                        <p>Gérez les retours et les signalements de produits de la communauté.</p>
                    </div>
                    <Link href="/admin/reports_valider" className="btn-premium-nav">
                        <span className="btn-icon-sm">📂</span>
                        <span>Voir les signalements acceptés</span>
                    </Link>
                </header>

                {/* Stats Mini Grid */}
                <section className="stats-mini-grid mb-8">
                    <div className="stat-card glass animate-fade-in">
                        <div className="stat-icon gradient-primary">📝</div>
                        <div className="stat-info">
                            <div className="stat-value">{totalReports}</div>
                            <div className="stat-label">Total Signalements</div>
                        </div>
                    </div>
                    <div className="stat-card glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="stat-icon gradient-warning">⌛</div>
                        <div className="stat-info">
                            <div className="stat-value">{pendingReports}</div>
                            <div className="stat-label">Non Traités</div>
                        </div>
                    </div>
                </section>

                <div className="card glass animate-fade-in overflow-hidden mt-6" style={{ animationDelay: '0.3s' }}>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Produit / Signalement</th>
                                    <th>Utilisateur</th>
                                    <th>Date</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedReports.length > 0 ? paginatedReports.map((report) => (
                                    <tr key={report.id}>
                                        <td>
                                            <div className="product-cell">
                                                <div className="product-name">{report.productName}</div>
                                                <div className="product-message">{report.message}</div>
                                                {report.barcode && <div className="product-barcode">Code: {report.barcode}</div>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-name">{report.user?.firstName} {report.user?.lastName}</div>
                                                <div className="user-email">{report.user?.email}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="date-cell">
                                                {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: fr })}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons justify-end">
                                                <button
                                                    className="btn-icon btn-secondary"
                                                    title="Détails"
                                                    onClick={() => setSelectedReport(report)}
                                                >
                                                    👁
                                                </button>
                                                <button
                                                    className="btn-icon btn-success"
                                                    title="Valider"
                                                    onClick={() => {
                                                        if (window.confirm("Voulez-vous vraiment valider ce signalement ?")) {
                                                            handleValidate(report.id);
                                                        }
                                                    }}
                                                    disabled={isProcessing}
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    className="btn-icon btn-danger"
                                                    title="Supprimer"
                                                    onClick={() => handleDelete(report.id)}
                                                    disabled={isProcessing}
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-12 text-secondary">
                                            Aucun signalement pour le moment.
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
                        totalItems={reports.length}
                        itemsPerPage={itemsPerPage}
                        itemName="signalements"
                    />
                </div>

                {/* Detail Modal */}
                {
                    selectedReport && (
                        <div className="modal-overlay glass animate-fade-in" onClick={() => setSelectedReport(null)}>
                            <div className="modal-content glass animate-pop-in" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Détails du Signalement</h2>
                                    <button className="close-btn" onClick={() => setSelectedReport(null)}>✕</button>
                                </div>
                                <div className="modal-body">
                                    <section className="detail-section">
                                        <div className="section-label">Utilisateur</div>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <label>Nom</label>
                                                <p>{selectedReport.user?.firstName} {selectedReport.user?.lastName}</p>
                                            </div>
                                            <div className="detail-item">
                                                <label>Email</label>
                                                <p>{selectedReport.user?.email}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="detail-section">
                                        <div className="section-label">Produit</div>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <label>Nom</label>
                                                <p>{selectedReport.productName}</p>
                                            </div>
                                            <div className="detail-item">
                                                <label>Code-barres</label>
                                                <p>{selectedReport.barcode || "N/A"}</p>
                                            </div>
                                        </div>
                                        {selectedReport.imageUrl && (
                                            <div className="detail-item mt-4">
                                                <label>Photo</label>
                                                <div className="detail-image-wrapper">
                                                    <img src={selectedReport.imageUrl} alt="Produit" className="detail-image" />
                                                </div>
                                            </div>
                                        )}
                                    </section>

                                    <section className="detail-section">
                                        <div className="section-label">Signalement</div>
                                        <div className="detail-item">
                                            <label>Description</label>
                                            <p className="message-content">{selectedReport.message}</p>
                                        </div>
                                        <div className="detail-item mt-2">
                                            <label>Reçu le</label>
                                            <p>{new Date(selectedReport.createdAt).toLocaleString('fr-FR')}</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn-success w-full"
                                        onClick={() => {
                                            handleValidate(selectedReport.id);
                                            setSelectedReport(null);
                                        }}
                                        disabled={isProcessing}
                                    >
                                        ✓ Valider ce signalement
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </main >

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

                .dashboard-header {
                    margin-bottom: var(--spacing-xl);
                }

                .dashboard-header h1 {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-xs);
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .dashboard-header p {
                    color: var(--color-text-secondary);
                    margin: 0;
                    font-size: var(--font-size-lg);
                }

                /* Stats Grid */
                .stats-mini-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-lg);
                }

                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                    padding: var(--spacing-xl);
                    transition: transform var(--transition-base);
                }

                .stat-card:hover {
                    transform: translateY(-4px);
                }

                .stat-icon {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    border-radius: var(--radius-md);
                    color: white;
                    flex-shrink: 0;
                }

                .gradient-primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); }
                .gradient-warning { background: linear-gradient(135deg, var(--color-warning), #D97706); }
                .gradient-success { background: linear-gradient(135deg, #10B981, #059669); }

                .stat-value {
                    font-size: var(--font-size-2xl);
                    font-weight: 800;
                    color: var(--color-text);
                    line-height: 1;
                    margin-bottom: 2px;
                }

                .stat-label {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                /* Table */
                .table-wrapper { overflow-x: auto; }
                .data-table { width: 100%; border-collapse: separate; border-spacing: 0; }

                .data-table th {
                    text-align: left;
                    padding: var(--spacing-lg);
                    font-weight: 700;
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-xs);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid var(--color-border);
                    background: hsla(220, 15%, 94%, 0.5);
                }

                .data-table td {
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--color-border-light);
                    vertical-align: middle;
                }

                .product-cell .product-name {
                    font-weight: 700;
                    color: var(--color-text);
                    margin-bottom: 4px;
                }

                .product-cell .product-message {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    max-width: 400px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .product-cell .product-barcode {
                    font-family: monospace;
                    font-size: var(--font-size-xs);
                    color: var(--color-primary);
                    margin-top: 4px;
                }

                .user-info .user-name {
                    font-weight: 600;
                    color: var(--color-text);
                }

                .user-info .user-email {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                }

                .date-cell {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-tertiary);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                }

                .status-pill {
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-pill.pending { background: hsla(38, 92%, 50%, 0.1); color: var(--color-warning); }
                .status-pill.reviewed { background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); }
                .status-pill.resolved { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); }

                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .btn-icon {
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-icon:hover {
                    background: var(--color-border);
                    transform: translateY(-2px);
                }

                .btn-icon.btn-success {
                    color: #10b981;
                    border-color: rgba(16, 185, 129, 0.2);
                    background: rgba(16, 185, 129, 0.05);
                }

                .btn-icon.btn-success:hover {
                    background: #10b981;
                    border-color: #10b981;
                    color: white;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }

                .btn-icon.btn-danger {
                    color: #ef4444;
                    border-color: rgba(239, 68, 68, 0.2);
                    background: rgba(239, 68, 68, 0.05);
                }

                .btn-icon.btn-danger:hover {
                    background: #ef4444;
                    border-color: #ef4444;
                    color: white;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                }

                .mt-6 { margin-top: 1.5rem; }
                .mt-8 { margin-top: 2rem; }

                    .pagination-bar { display: none; }
                }
                .mobile-toggle {
                    display: none;
                    position: fixed;
                    top: 1rem;
                    left: 1rem;
                    z-index: 1100;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: var(--shadow-md);
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: var(--spacing-md);
                }

                .modal-content {
                    width: 100%;
                    max-width: 600px;
                    max-height: 90vh;
                    background: var(--color-bg);
                    border-radius: var(--radius-xl);
                    display: flex;
                    flex-direction: column;
                    box-shadow: var(--shadow-2xl);
                    border: 1px solid var(--glass-border);
                }

                .modal-header {
                    padding: var(--spacing-lg) var(--spacing-xl);
                    border-bottom: 1px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .modal-header h2 {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    margin: 0;
                }

                .close-btn {
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    cursor: pointer;
                    color: var(--color-text-secondary);
                }

                .modal-body {
                    padding: var(--spacing-xl);
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .detail-section {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .section-label {
                    font-size: var(--font-size-xs);
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--color-primary);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }

                .section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--color-border);
                }

                .detail-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-lg);
                }

                .detail-item label {
                    display: block;
                    font-size: var(--font-size-xs);
                    color: var(--color-text-tertiary);
                    margin-bottom: 2px;
                    font-weight: 600;
                }

                .detail-item p {
                    margin: 0;
                    font-weight: 500;
                    color: var(--color-text);
                }

                .message-content {
                    background: var(--color-bg-secondary);
                    padding: var(--spacing-md);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-sm);
                    line-height: 1.6;
                }

                .detail-image-wrapper {
                    margin-top: var(--spacing-sm);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    border: 1px solid var(--color-border);
                }

                .detail-image {
                    width: 100%;
                    max-height: 300px;
                    object-fit: contain;
                    background: #f0f0f0;
                }

                .modal-footer {
                    padding: var(--spacing-lg) var(--spacing-xl);
                    border-top: 1px solid var(--color-border);
                }

                .w-full { width: 100%; }

                .btn-success {
                    background: var(--color-success);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-success:hover:not(:disabled) {
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                }

                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                .animate-pop-in {
                    animation: popIn 0.3s ease-out forwards;
                }

                .mobile-header {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 65px;
                    padding: 0 1.5rem;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--color-bg);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--color-border);
                    z-index: 1050;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }

                .menu-toggle {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    width: 42px;
                    height: 42px;
                    border-radius: var(--radius-lg);
                    font-size: 1.25rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
                }

                .sidebar-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    z-index: 1035;
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @media (max-width: 968px) {
                    .mobile-header { display: flex; }
                    .main-content { margin-left: 0; padding: 5.5rem 1rem 2rem; width: 100%; }
                    .sidebar { transform: translateX(-100%); width: 280px; z-index: 1045; }
                    .sidebar.open { transform: translateX(0); box-shadow: 10px 0 30px rgba(0,0,0,0.1); }
                    .dashboard-header h1 { font-size: 2.25rem; }
                    .stats-mini-grid { grid-template-columns: 1fr; }
                }

                .flex-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: var(--spacing-xl);
                }

                .btn-premium-nav {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-xl);
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    color: var(--color-primary);
                    font-weight: 700;
                    font-size: var(--font-size-sm);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-decoration: none;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                    backdrop-filter: blur(4px);
                }

                .btn-premium-nav:hover {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    border-color: transparent;
                    color: white;
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
                }

                .btn-icon-sm {
                    font-size: 1.2rem;
                    line-height: 1;
                }

                @media (max-width: 640px) {
                    .flex-header {
                        flex-direction: column;
                        align-items: stretch;
                        gap: var(--spacing-lg);
                    }
                    .btn-premium-nav {
                        justify-content: center;
                    }
                }
            `}</style>
        </div >
    );
}
