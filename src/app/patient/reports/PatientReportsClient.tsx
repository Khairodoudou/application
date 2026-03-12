"use client";

import { useState } from "react";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import { ReportForm } from "./ReportForm";

type PatientReportsClientProps = {
    patient: {
        firstName: string;
        lastName: string;
        email: string;
    }
};

export default function PatientReportsClient({ patient }: PatientReportsClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="dashboard-wrapper">
            <PatientSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />


            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Signaler un Problème</h1>
                        <p>Aidez-nous à améliorer la base de données en signalant des erreurs ou des produits manquants.</p>
                    </div>
                </header>

                <section className="content-section">
                    <div className="report-container-inner">
                        <div className="card glass animate-fade-in p-0 overflow-hidden">
                            <ReportForm
                                initialData={{
                                    firstName: patient.firstName,
                                    lastName: patient.lastName,
                                    email: patient.email
                                }}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <style jsx>{`
                .dashboard-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background: var(--color-bg-secondary);
                }

                /* Main Content */
                .main-content {
                    margin-left: 280px;
                    padding: var(--spacing-2xl);
                    width: calc(100% - 280px);
                    flex: 1;
                    padding-top: 100px; /* Space for the fixed global header */
                }

                .dashboard-header {
                    margin-bottom: var(--spacing-2xl);
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

                .content-section {
                    margin-bottom: var(--spacing-2xl);
                }

                .report-container-inner {
                    max-width: 800px;
                }

                .overflow-hidden { overflow: hidden; }
                .p-0 { padding: 0; }

                /* Mobile Responsive */
                @media (max-width: 1024px) {
                    .main-content {
                        margin-left: 0;
                        width: 100%;
                        padding: var(--spacing-xl);
                        padding-top: 100px;
                    }
                    .dashboard-wrapper { display: block; }
                    
                    .dashboard-header h1 {
                        font-size: var(--font-size-3xl);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
