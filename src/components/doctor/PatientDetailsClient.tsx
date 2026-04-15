"use client";

import { DoctorSidebar } from "./DoctorSidebar";
import { FiArrowLeft, FiEdit3, FiUser, FiActivity, FiThermometer, FiClipboard, FiFileText, FiCalendar, FiFile, FiCheck, FiFolder, FiDownload, FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

type PatientDetailsClientProps = {
    data: any;
};

const DOCUMENT_TYPES = {
    BLOOD_ANALYSIS: { label: 'Analyses Sanguines', icon: <FiActivity /> },
    X_RAY: { label: 'Radios', icon: <FiFileText /> },
    MRI: { label: 'IRM', icon: <FiClipboard /> },
    SCANNER: { label: 'Scanner', icon: <FiThermometer /> },
    OTHER: { label: 'Autres documents', icon: <FiPlusCircle /> },
};

export default function PatientDetailsClient({ data }: PatientDetailsClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Safely handle data
    const patient = data.patient || {};
    const sharedHealth = patient.healthProfile || {};
    const doctorPatient = data || {};

    // Helper for isolated vs shared fields
    // Clinical data is now in doctorPatient
    const clinical = doctorPatient;

    // Parse documents
    const documents = (() => {
        try {
            const parsed = JSON.parse(clinical.documents || "[]");
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })();

    // Helper to join or return string
    const formatList = (val: any) => {
        if (!val) return "Non renseigné";
        try {
            const parsed = typeof val === 'string' ? JSON.parse(val) : val;
            if (Array.isArray(parsed)) {
                return parsed.length > 0 ? parsed.map((item, i) => (
                    <span key={i} className="badge" style={{ marginRight: '4px', marginBottom: '4px', display: 'inline-block' }}>{item}</span>
                )) : "Aucun";
            }
            return val;
        } catch (e) {
            return val;
        }
    };

    const calculateAge = (birthDate: any) => {
        if (!birthDate) return "N/A";
        const diff = Date.now() - new Date(birthDate).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    return (
        <div className="dashboard-wrapper">
            <DoctorSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="dashboard-header">
                    <div className="header-nav">
                        <Link href="/doctor/patients" className="back-link">
                            <FiArrowLeft /> Retour aux patients
                        </Link>
                    </div>
                    <div className="header-actions">
                        <Link href={`/doctor/patients/${patient.id}/edit`} className="btn-action">
                            <FiEdit3 /> Gérer le dossier
                        </Link>
                    </div>
                </header>

                <div className="patient-header glass animate-fade-in">
                    <div className="avatar-large">
                        {patient.avatar ? (
                            <img src={patient.avatar} alt="Avatar" />
                        ) : (
                            <div className="avatar-placeholder">{patient.firstName?.[0]}{patient.lastName?.[0]}</div>
                        )}
                    </div>
                    <div className="patient-info-primary">
                        <h1>{patient.firstName} {patient.lastName}</h1>
                        <p className="subtitle">{calculateAge(sharedHealth.birthDate)} ans • {sharedHealth.gender === "M" ? "Homme" : "Femme"} • {sharedHealth.bloodType || "Groupe sanguin inconnu"}</p>
                    </div>
                </div>

                <div className="details-grid animate-fade-in-up">

                    {/* 1. ANTECEDENTS */}
                    <div className="card glass">
                        <div className="card-header">
                            <FiActivity />
                            <h2>Antécédents & Mode de Vie</h2>
                        </div>
                        <div className="card-content">
                            <div className="info-row">
                                <label>Médicaux :</label>
                                <div className="tags-wrapper">{formatList(clinical.medicalHistory)}</div>
                            </div>
                            <div className="info-row">
                                <label>Familiaux :</label>
                                <div className="tags-wrapper">{formatList(clinical.familyHistory)}</div>
                            </div>
                            <div className="info-row">
                                <label>Chirurgicaux :</label>
                                <div className="tags-wrapper">{formatList(clinical.surgeryHistory)}</div>
                            </div>
                            <div className="grid-2 inner-grid">
                                <div className="info-row compact">
                                    <label>Allergies :</label>
                                    <div className="tags-wrapper warning">{formatList(clinical.allergies)}</div>
                                </div>
                                <div className="info-row compact">
                                    <label>Pathologies :</label>
                                    <div className="tags-wrapper">{formatList(clinical.diseases)}</div>
                                </div>
                            </div>
                            <div className="info-row mt-3">
                                <label>Régime Alimentaire :</label>
                                <span className="text-secondary">{sharedHealth.diet || "Non spécifié"}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. CONSTANTES VITALES */}
                    <div className="card glass">
                        <div className="card-header">
                            <FiActivity />
                            <h2>Dernières Constantes</h2>
                        </div>
                        <div className="card-content">
                            <div className="vitals-grid">
                                <div className="vital-item">
                                    <label>Tension Artérielle</label>
                                    <div className="vital-value">
                                        <FiActivity className="text-primary" />
                                        <span>{clinical.bloodPressure || "--"}</span>
                                    </div>
                                </div>
                                <div className="vital-item">
                                    <label>Pouls (bpm)</label>
                                    <div className="vital-value">
                                        <FiActivity className="text-success" />
                                        <span>{clinical.heartRate || "--"}</span>
                                    </div>
                                </div>
                                <div className="vital-item">
                                    <label>Température (°C)</label>
                                    <div className="vital-value">
                                        <FiThermometer className="text-warning" />
                                        <span>{clinical.temperature || "--"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="physical-stats mt-4">
                                <div className="stat-box">
                                    <label>Taille</label>
                                    <span>{sharedHealth.height ? `${sharedHealth.height} cm` : "--"}</span>
                                </div>
                                <div className="stat-box">
                                    <label>Poids</label>
                                    <span>{sharedHealth.weight ? `${sharedHealth.weight} kg` : "--"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. DIAGNOSTIC & TRAITEMENT */}
                    <div className="card glass full-width">
                        <div className="card-header">
                            <FiClipboard />
                            <h2>Diagnostic & Traitement</h2>
                        </div>
                        <div className="card-content grid-2">
                            <div className="col">
                                <h3>Diagnostic Actuel</h3>
                                <div className="info-block">
                                    <label>Symptômes</label>
                                    <div className="tags-wrapper">{formatList(clinical.symptoms)}</div>
                                </div>
                                <div className="info-block">
                                    <label>Diagnostic Médecin</label>
                                    <p className="text-content">{clinical.diagnosis || "Aucun diagnostic enregistré."}</p>
                                </div>
                            </div>
                            <div className="col border-left">
                                <h3>Prescription</h3>
                                <div className="info-block">
                                    <label>Traitement en cours</label>
                                    <div className="tags-wrapper primary">{formatList(clinical.treatmentPlan)}</div>
                                </div>
                                <div className="info-block">
                                    <label>Examens demandés</label>
                                    <div className="tags-wrapper">{formatList(clinical.examsRequested)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. NOTES & SUIVI */}
                    <div className="card glass full-width">
                        <div className="card-header">
                            <FiFileText />
                            <h2>Notes Médecin & Suivi</h2>
                        </div>
                        <div className="card-content grid-2">
                            <div className="col">
                                <div className="info-block">
                                    <label>Observation Générale</label>
                                    <p className="text-content">{clinical.observation || "Aucune observation."}</p>
                                </div>
                                <div className="info-block">
                                    <label>Recommandations</label>
                                    <p className="text-content">{clinical.recommendations || "Aucune recommandation."}</p>
                                </div>
                            </div>
                            <div className="col border-left">
                                <div className="info-block">
                                    <label>Calendrier des Consultations</label>
                                    <div className="sessions-list">
                                        {patient.patientAppointments && patient.patientAppointments.length > 0 ? (
                                            <>
                                                {/* Upcoming Sessions */}
                                                {patient.patientAppointments.filter((a: any) => a.status === "PENDING").length > 0 && (
                                                    <div className="session-group">
                                                        <h4 className="group-title upcoming">À Venir</h4>
                                                        {patient.patientAppointments
                                                            .filter((a: any) => a.status === "PENDING")
                                                            .map((app: any, idx: number) => (
                                                                <div key={`pending-${idx}`} className="session-item glass upcoming">
                                                                    <div className="session-date">
                                                                        <FiCalendar />
                                                                        <span>{new Date(app.date).toLocaleString('fr-FR', {
                                                                            weekday: 'long',
                                                                            day: 'numeric',
                                                                            month: 'long',
                                                                            year: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}</span>
                                                                    </div>
                                                                    {app.notes && <p className="session-reason">Motif : {app.notes}</p>}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )}

                                                {/* Past Sessions */}
                                                {patient.patientAppointments.filter((a: any) => a.status === "COMPLETED").length > 0 && (
                                                    <div className="session-group mt-6">
                                                        <h4 className="group-title past">Historique des Séances</h4>
                                                        <div className="sessions-scrollable">
                                                            {patient.patientAppointments
                                                                .filter((a: any) => a.status === "COMPLETED")
                                                                .reverse() // Most recent first for history
                                                                .map((app: any, idx: number) => (
                                                                    <div key={`completed-${idx}`} className="session-item glass past mb-3">
                                                                        <div className="session-date">
                                                                            <div className="status-dot"></div>
                                                                            <span>{new Date(app.date).toLocaleString('fr-FR', {
                                                                                day: 'numeric',
                                                                                month: 'long',
                                                                                year: 'numeric'
                                                                            })}</span>
                                                                        </div>
                                                                        {app.notes && <p className="session-reason-history">{app.notes}</p>}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <p className="no-sessions">Aucun rendez-vous enregistré.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="info-block mt-4">
                                    <label>Documents Médicaux</label>
                                    <div className="docs-list">
                                        {documents.length > 0 ? (
                                            <div className="documents-grid-view">
                                                {documents.map((doc: any, idx: number) => {
                                                    const typeInfo = DOCUMENT_TYPES[doc.type as keyof typeof DOCUMENT_TYPES] || { label: 'Document', icon: <FiFileText /> };
                                                    return (
                                                        <div key={idx} className="doc-item-view glass">
                                                            <div className="doc-icon-view">{typeInfo.icon}</div>
                                                            <div className="doc-info-view">
                                                                <span className="doc-name-view">{doc.name}</span>
                                                                <span className="doc-type-view">{typeInfo.label} • {new Date(doc.date).toLocaleDateString()}</span>
                                                            </div>
                                                            <a href={doc.url} download={doc.name || "document"} target="_blank" rel="noreferrer" className="btn-download-view">
                                                                <FiDownload />
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <span className="text-muted">Aucun document joint</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                .main-content { margin-left: 280px; padding: var(--spacing-2xl); width: calc(100% - 280px); }
                
                .header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                
                .back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--color-text-secondary); font-weight: 500; transition: color 0.2s; }
                .back-link:hover { color: var(--color-primary); }
                
                .btn-action { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--color-primary); color: white; border-radius: 50px; font-weight: 600; box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3); transition: transform 0.2s; }
                .btn-action:hover { transform: translateY(-2px); }
                
                .patient-header { display: flex; align-items: center; gap: 24px; padding: 30px; margin-bottom: 30px; border-radius: 20px; background: var(--color-bg); border: 1px solid var(--color-border-light); }
                .avatar-large { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; background: var(--color-bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--color-primary); font-weight: 700; }
                .avatar-large img { width: 100%; height: 100%; object-fit: cover; }
                .patient-info-primary h1 { margin: 0; font-size: 1.8rem; color: var(--color-text); }
                .subtitle { color: var(--color-text-secondary); margin-top: 4px; font-size: 1.1rem; }
                
                .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .card { background: var(--color-bg); border-radius: 16px; padding: 24px; border: 1px solid var(--color-border-light); display: flex; flex-direction: column; gap: 20px; box-shadow: var(--shadow-sm); }
                .full-width { grid-column: span 2; }
                
                .card-header { display: flex; align-items: center; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border-light); }
                .card-header svg { font-size: 1.4rem; color: var(--color-primary); }
                .card-header h2 { font-size: 1.1rem; font-weight: 600; margin: 0; color: var(--color-text); }
                
                .card-content { display: flex; flex-direction: column; gap: 16px; }
                
                /* List Styles */
                .info-row { display: flex; align-items: flex-start; gap: 12px; }
                .info-row label { min-width: 100px; font-weight: 600; color: var(--color-text-secondary); font-size: 0.9rem; margin-top: 4px; }
                .inner-grid { display: grid; gap: 12px; }
                .info-row.compact label { min-width: auto; margin-right: 8px; }
                
                .tags-wrapper { display: flex; flex-wrap: wrap; gap: 8px; }
                .badge { padding: 4px 10px; background: var(--color-bg-tertiary); color: var(--color-text); border-radius: 6px; font-size: 0.85rem; border: 1px solid var(--color-border); }
                .warning .badge { background: #fff0f0; color: #d63031; border-color: #ffcccc; }
                .primary .badge { background: #eef2ff; color: #4361ee; border-color: #dbeafe; }
                
                /* Vitals Grid */
                .vitals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
                .vital-item { display: flex; flex-direction: column; align-items: center; padding: 12px; background: var(--color-bg-secondary); border-radius: 12px; }
                .vital-item .label { font-size: 0.8rem; color: var(--color-text-tertiary); margin-bottom: 4px; }
                .vital-item .value { font-size: 1.2rem; font-weight: 700; color: var(--color-text); }
                .vital-item .unit { font-size: 0.75rem; color: var(--color-text-secondary); }
                
                /* Layout Columns */
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .col { display: flex; flex-direction: column; gap: 16px; }
                .border-left { border-left: 1px solid var(--color-border-light); padding-left: 24px; }
                
                .info-block label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
                .text-content { font-size: 0.95rem; color: var(--color-text); line-height: 1.5; background: var(--color-bg-secondary); padding: 12px; border-radius: 8px; }
                
                .highlight { background: linear-gradient(135deg, var(--color-primary-light), var(--color-bg)); padding: 16px; border-radius: 12px; border: 1px solid var(--color-primary-light); }
                .big-date { font-size: 1.1rem; font-weight: 700; color: var(--color-primary); text-transform: capitalize; }
                .reason { margin-top: 4px; font-style: italic; color: var(--color-text-secondary); }
                
                .sessions-list { display: flex; flex-direction: column; gap: 12px; }
                .session-group { display: flex; flex-direction: column; gap: 10px; }
                .sessions-scrollable { 
                    max-height: 280px; 
                    overflow-y: auto; 
                    padding-right: 8px;
                }
                .sessions-scrollable::-webkit-scrollbar { width: 4px; }
                .sessions-scrollable::-webkit-scrollbar-track { background: transparent; }
                .sessions-scrollable::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }

                .group-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; padding-left: 5px; opacity: 0.8; }
                .group-title.upcoming { color: var(--color-primary); }
                .group-title.past { color: var(--color-text-tertiary); }

                .session-item { padding: 14px; border-radius: 12px; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
                .session-item:hover { transform: translateX(8px); background: hsla(210, 100%, 56%, 0.08); }
                
                .session-item.upcoming { background: hsla(210, 100%, 56%, 0.05); border: 1px solid var(--color-primary-light); border-left: 4px solid var(--color-primary); }
                .session-item.past { background: var(--color-bg-secondary); border: 1px solid var(--color-border-light); border-left: 3px solid var(--color-text-tertiary); opacity: 0.9; }
                
                .session-date { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 0.95rem; text-transform: capitalize; margin-bottom: 4px; }
                .upcoming .session-date { color: var(--color-primary); }
                .past .session-date { color: var(--color-text-secondary); }
                
                .status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
                .session-date svg { font-size: 1rem; }
                .session-reason { font-size: 0.85rem; color: var(--color-text-secondary); font-style: italic; margin-left: 26px; line-height: 1.4; }
                .session-reason-history { font-size: 0.82rem; color: var(--color-text-tertiary); margin-left: 26px; line-height: 1.4; }
                
                .no-sessions { color: var(--color-text-tertiary); font-style: italic; padding: 20px; text-align: center; background: var(--color-bg-secondary); border-radius: 12px; }

                .mt-6 { margin-top: 24px; }
                .mb-3 { margin-bottom: 12px; }
                .mt-4 { margin-top: 16px; }
                .text-muted { color: var(--color-text-tertiary); font-style: italic; font-size: 0.9rem; }
                
                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; width: 100%; padding: 20px; padding-top: 80px; }
                    .details-grid { grid-template-columns: 1fr; }
                    .full-width { grid-column: span 1; }
                    .grid-2 { grid-template-columns: 1fr; }
                    .border-left { border-left: none; padding-left: 0; border-top: 1px solid var(--color-border-light); padding-top: 24px; }
                    .vitals-grid { grid-template-columns: 1fr 1fr; }
                }

                .documents-grid-view { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px; }
                .doc-item-view { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 8px; border: 1px solid var(--color-border-light); background: var(--color-bg-secondary); transition: all 0.2s; }
                .doc-item-view:hover { border-color: var(--color-primary-light); background: hsla(210, 100%, 56%, 0.05); }
                .doc-icon-view { color: var(--color-primary); font-size: 1.2rem; }
                .doc-info-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .doc-name-view { font-weight: 600; font-size: 0.9rem; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .doc-type-view { font-size: 0.75rem; color: var(--color-text-tertiary); }
                .btn-download-view { color: var(--color-text-secondary); padding: 6px; border-radius: 6px; transition: all 0.2s; }
                .btn-download-view:hover { background: var(--color-auth-bg); color: var(--color-primary); }
            `}</style>
        </div>
    );
}
