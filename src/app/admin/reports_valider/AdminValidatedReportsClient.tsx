"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Pagination } from "@/components/ui/Pagination";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type AdminValidatedReportsClientProps = {
    reports: any[];
};

export default function AdminValidatedReportsClient({ reports }: AdminValidatedReportsClientProps) {
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

    const handleDelete = async (reportId: string) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce signalement validé ? Cette action est irréversible.")) {
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

    return (
        <div className="dashboard-wrapper">
            <AdminSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Signalements acceptés</h1>
                        <p>Historique des signalements qui ont été traités et acceptés.</p>
                    </div>
                </header>

                <div className="card glass animate-fade-in overflow-hidden">
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
                                                <span className="status-pill resolved">Validé</span>
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
                                            Aucun signalement validé pour le moment.
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

                {/* Detail Modal - Reused from main */}
                {
                    selectedReport && (
                        <div className="modal-overlay glass animate-fade-in" onClick={() => setSelectedReport(null)}>
                            <div className="modal-content glass animate-pop-in" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Détails du Signalement (accepté)</h2>
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
                                    <button className="btn-secondary w-full" onClick={() => setSelectedReport(null)}>
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </main >

            {/* Reusing Styles from main reports client - typically moved to a global layout or shared module */}
            <style jsx>{`
                /* Copying minimal necessary styles for this view */
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                .sidebar { width: 280px; background: var(--color-bg); border-right: 1px solid var(--color-border); display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 1040; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .main-content { flex: 1; margin-left: 280px; padding: var(--spacing-2xl); width: calc(100% - 280px); transition: margin-left 0.3s ease; }
                
                .sidebar-header {
                    padding: var(--spacing-xl);
                    border-bottom: 1px solid var(--color-border);
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-family: var(--font-display);
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--color-text);
                    text-decoration: none;
                }
                
                .logo-icon { font-size: var(--font-size-2xl); }

                .sidebar-nav {
                    flex: 1;
                    padding: var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }

                .nav-item { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md); border-radius: var(--radius-md); color: var(--color-text-secondary); font-weight: 500; text-decoration: none; transition: all 0.2s; }
                .nav-item:hover {
                    background: var(--color-bg-secondary);
                    color: var(--color-text);
                    transform: translateX(4px);
                }
                .nav-item.active { background: var(--color-primary); color: white; }
                .nav-icon { font-size: var(--font-size-lg); }

                .sidebar-footer {
                    padding: var(--spacing-lg);
                    border-top: 1px solid var(--color-border);
                }

                .dashboard-header { margin-bottom: var(--spacing-xl); }
                .dashboard-header h1 { font-size: var(--font-size-4xl); margin-bottom: var(--spacing-xs); background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .dashboard-header p { color: var(--color-text-secondary); margin: 0; font-size: var(--font-size-lg); }
                
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

                .menu-toggle:active { transform: scale(0.95); }

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
                
                .data-table { width: 100%; border-collapse: separate; border-spacing: 0; }
                .data-table th { text-align: left; padding: var(--spacing-lg); border-bottom: 1px solid var(--color-border); background: hsla(220, 15%, 94%, 0.5); font-size: var(--font-size-xs); text-transform: uppercase; }
                .data-table td { padding: var(--spacing-lg); border-bottom: 1px solid var(--color-border-light); }
                
                .status-pill { padding: 4px 12px; border-radius: var(--radius-full); font-size: var(--font-size-xs); font-weight: 700; }
                .status-pill.resolved { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); }
                
                .btn-icon:hover { 
                    background: var(--color-border);
                    transform: translateY(-2px);
                }

                .btn-icon.btn-danger {
                    color: #ef4444;
                    border-color: rgba(239, 68, 68, 0.2);
                    background: rgba(239, 68, 68, 0.05);
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-icon.btn-danger:hover {
                    background: #ef4444;
                    border-color: #ef4444;
                    color: white;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                }
                
                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }
                
                .table-wrapper {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }

                /* Modal */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000; animation: fadeIn 0.2s ease-out; }
                .modal-content { width: 95%; max-width: 650px; background: var(--color-bg); border-radius: var(--radius-xl); border: 1px solid var(--glass-border); max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column; }
                .modal-header { padding: var(--spacing-lg) var(--spacing-xl); border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: var(--color-bg); z-index: 10; }
                .modal-body { padding: var(--spacing-xl); flex: 1; display: flex; flex-direction: column; gap: var(--spacing-xl); }
                .section-label { font-size: var(--font-size-xs); font-weight: 800; color: var(--color-primary); text-transform: uppercase; }
                .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
                .message-content { background: var(--color-bg-secondary); padding: var(--spacing-md); border-radius: var(--radius-md); font-size: var(--font-size-sm); line-height: 1.6; }
                .detail-image { width: 100%; max-height: 300px; object-fit: contain; border-radius: var(--radius-lg); }
                .modal-footer { padding: var(--spacing-lg) var(--spacing-xl); border-top: 1px solid var(--color-border); position: sticky; bottom: 0; background: var(--color-bg); z-index: 10; }
                .btn-secondary { background: var(--color-bg-secondary); border: 1px solid var(--color-border); padding: 0.75rem 1.5rem; border-radius: var(--radius-md); cursor: pointer; width: 100%; font-weight: 600; transition: all 0.2s; }
                .btn-secondary:hover { background: var(--color-border-light); transform: translateY(-1px); }

                @media (max-width: 968px) {
                    .mobile-header { display: flex; }
                    .main-content { margin-left: 0; padding: 5.5rem 1rem 2rem; width: 100%; }
                    .sidebar { transform: translateX(-100%); width: 280px; z-index: 1045; }
                    .sidebar.open { transform: translateX(0); box-shadow: 10px 0 30px rgba(0,0,0,0.1); }
                    .dashboard-header h1 { font-size: 2.25rem; }
                    .detail-grid { grid-template-columns: 1fr; }
                    .modal-content { width: 100%; height: 100%; max-height: 100vh; border-radius: 0; }
                }

                @media (max-width: 640px) {
                    .dashboard-header h1 { font-size: 1.8rem; }
                    .action-buttons { gap: 0.5rem; }
                }
            `}</style>
        </div>
    );
}
