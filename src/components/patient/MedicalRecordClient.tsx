"use client";

import { useState } from "react";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import {
    FiUser,
    FiActivity,
    FiClipboard,
    FiFileText,
    FiCalendar,
    FiChevronRight,
    FiCheck,
    FiAlertCircle,
    FiFolder,
    FiDownload,
    FiThermometer,
    FiPlusCircle
} from "react-icons/fi";

const DOCUMENT_TYPES = {
    BLOOD_ANALYSIS: { label: 'Analyses Sanguines', icon: <FiActivity /> },
    X_RAY: { label: 'Radios', icon: <FiFileText /> },
    MRI: { label: 'IRM', icon: <FiClipboard /> },
    SCANNER: { label: 'Scanner', icon: <FiThermometer /> },
    OTHER: { label: 'Autres documents', icon: <FiPlusCircle /> },
};

type MedicalRecordClientProps = {
    data: any[];
};

export default function MedicalRecordClient({ data }: MedicalRecordClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(data.length > 0 ? data[0].doctorId : null);

    const selectedEntry = data.find(d => d.doctorId === selectedDoctorId);

    // Shared data (Immutable across doctors)
    const sharedHealth = selectedEntry?.patient?.healthProfile || {};

    // Clinical data (Private to this doctor)
    const clinical = selectedEntry || {};

    const doctor = selectedEntry?.doctor || {};
    const appointments = selectedEntry?.patient?.patientAppointments?.filter((a: any) => a.doctorId === selectedDoctorId) || [];

    const documents = (() => {
        try {
            const parsed = JSON.parse(clinical.documents || "[]");
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })();

    const formatList = (jsonStr: string) => {
        try {
            const arr = JSON.parse(jsonStr || "[]");
            if (!Array.isArray(arr) || arr.length === 0) return "Aucun";
            return arr.join(", ");
        } catch {
            return jsonStr || "Aucun";
        }
    };

    const formatBadgeList = (jsonStr: string) => {
        try {
            const arr = JSON.parse(jsonStr || "[]");
            if (!Array.isArray(arr) || arr.length === 0) return <span>Aucun</span>;
            return arr.map((item, idx) => (
                <span key={idx} className="badge">{item}</span>
            ));
        } catch {
            return <span>{jsonStr || "Aucun"}</span>;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <PatientSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Mon Dossier Médical</h1>
                        <p>Consultez vos informations médicales par médecin</p>
                    </div>
                </header>

                <div className="medical-grid">
                    {/* Doctors List Column */}
                    <div className="doctors-column">
                        <div className="card glass sticky">
                            <div className="card-header">
                                <FiFolder />
                                <h2>Mes Médecins</h2>
                            </div>
                            <div className="doctors-list">
                                {data.length > 0 ? (
                                    data.map((entry) => (
                                        <button
                                            key={entry.id}
                                            onClick={() => setSelectedDoctorId(entry.doctorId)}
                                            className={`doctor-item glass ${selectedDoctorId === entry.doctorId ? 'active' : ''}`}
                                        >
                                            <div className="doctor-avatar">
                                                {entry.doctor.avatar ? (
                                                    <img src={entry.doctor.avatar} alt="" />
                                                ) : (
                                                    <div className="placeholder">{entry.doctor.firstName[0]}</div>
                                                )}
                                            </div>
                                            <div className="doctor-info">
                                                <strong>Dr. {entry.doctor.lastName}</strong>
                                                <span>{entry.doctor.doctorProfile?.specialty || "Généraliste"}</span>
                                            </div>
                                            <FiChevronRight className="arrow" />
                                        </button>
                                    ))
                                ) : (
                                    <div className="no-doctors">
                                        <FiAlertCircle />
                                        <p>Aucun médecin associé</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Medical Details Column */}
                    <div className="details-column">
                        {selectedEntry ? (
                            <div className="details-wrapper">
                                {/* 1. General Info & Vitals */}
                                <div className="details-section grid-2">
                                    <div className="card glass">
                                        <div className="card-header">
                                            <FiUser />
                                            <h2>Informations Générales</h2>
                                        </div>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <label>Sexe</label>
                                                <span>{sharedHealth.gender === 'M' ? 'Homme' : sharedHealth.gender === 'F' ? 'Femme' : '--'}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Groupe Sanguin</label>
                                                <span className="blood-type">{sharedHealth.bloodType || "--"}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Poids</label>
                                                <span>{sharedHealth.weight ? `${sharedHealth.weight} kg` : "--"}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Taille</label>
                                                <span>{sharedHealth.height ? `${sharedHealth.height} cm` : "--"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card glass">
                                        <div className="card-header">
                                            <FiActivity />
                                            <h2>Dernières Constantes</h2>
                                        </div>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <label>Tension</label>
                                                <span>{clinical.bloodPressure || "--"}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Pouls</label>
                                                <span>{clinical.heartRate ? `${clinical.heartRate} bpm` : "--"}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Température</label>
                                                <span>{clinical.temperature ? `${clinical.temperature} °C` : "--"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. History & Conditions */}
                                <div className="details-section">
                                    <div className="card glass">
                                        <div className="card-header">
                                            <FiAlertCircle />
                                            <h2>Antécédents & Conditions</h2>
                                        </div>
                                        <div className="card-content">
                                            <div className="condition-row">
                                                <label>Pathologies</label>
                                                <div className="tags-container">{formatBadgeList(clinical.diseases)}</div>
                                            </div>
                                            <div className="condition-row">
                                                <label>Allergies</label>
                                                <div className="tags-container">{formatBadgeList(clinical.allergies)}</div>
                                            </div>
                                            <div className="condition-row">
                                                <label>Chirurgies</label>
                                                <div className="tags-container">{formatBadgeList(clinical.surgeryHistory)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Diagnosis & Treatment */}
                                <div className="details-section">
                                    <div className="card glass primary-border">
                                        <div className="card-header">
                                            <FiClipboard />
                                            <h2>Diagnostic & Traitement (Dernière séance)</h2>
                                        </div>
                                        <div className="card-content grid-2">
                                            <div className="info-block">
                                                <h3>Symptômes</h3>
                                                <div className="tags-container">{formatBadgeList(clinical.symptoms)}</div>
                                                <h3 className="mt-4">Diagnostic</h3>
                                                <p className="text-content">{clinical.diagnosis || "Aucun diagnostic récent."}</p>
                                            </div>
                                            <div className="info-block border-left">
                                                <h3>Traitement</h3>
                                                <div className="tags-container primary">{formatBadgeList(clinical.treatmentPlan)}</div>
                                                <h3 className="mt-4">Examens</h3>
                                                <div className="tags-container">{formatBadgeList(clinical.examsRequested)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* 4. Notes & History */}
                                <div className="details-section grid-2">
                                    <div className="card glass">
                                        <div className="card-header">
                                            <FiFileText />
                                            <h2>Notes & Recommandations</h2>
                                        </div>
                                        <div className="info-block">
                                            <label>Observations du Dr. {doctor.lastName}</label>
                                            <p className="text-content">{clinical.observation || "Aucune note disponible."}</p>
                                            <label className="mt-4">Recommandations</label>
                                            <p className="text-content highlight">{clinical.recommendations || "Aucune recommandation."}</p>
                                        </div>
                                    </div>

                                    <div className="card glass">
                                        <div className="card-header">
                                            <FiCalendar />
                                            <h2>Historique des Séances</h2>
                                        </div>
                                        <div className="timeline-container">
                                            {appointments.length > 0 ? (
                                                appointments.map((app: any) => (
                                                    <div key={app.id} className={`timeline-item ${app.status.toLowerCase()}`}>
                                                        <div className="timeline-marker">
                                                            {app.status === 'COMPLETED' ? <FiCheck /> : <FiCalendar />}
                                                        </div>
                                                        <div className="timeline-content">
                                                            <div className="timeline-date">
                                                                {new Date(app.date).toLocaleDateString('fr-FR', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                })}
                                                            </div>
                                                            <div className="timeline-type">{app.type}</div>
                                                            {app.notes && <div className="timeline-notes">{app.notes}</div>}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-data">Aucune séance enregistrée</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 5. DOCUMENTS MEDICAUX */}
                                {documents.length > 0 && (
                                    <div className="details-section">
                                        <div className="card glass">
                                            <div className="card-header">
                                                <FiFolder />
                                                <h2>Documents Médicaux</h2>
                                            </div>
                                            <div className="documents-list">
                                                {documents.map((doc: any, idx: number) => {
                                                    const typeInfo = DOCUMENT_TYPES[doc.type as keyof typeof DOCUMENT_TYPES] || { label: 'Document', icon: <FiFileText /> };
                                                    return (
                                                        <div key={idx} className="document-item glass">
                                                            <div className="doc-icon">{typeInfo.icon}</div>
                                                            <div className="doc-info">
                                                                <span className="doc-name">{doc.name}</span>
                                                                <span className="doc-type">{typeInfo.label} • {new Date(doc.date).toLocaleDateString()}</span>
                                                            </div>
                                                            <a href={doc.url} target="_blank" rel="noreferrer" className="btn-download">
                                                                <FiDownload />
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="card glass empty-state">
                                <FiFolder size={48} />
                                <h2>Sélectionnez un médecin</h2>
                                <p>Choisissez un médecin dans la liste de gauche pour consulter votre dossier médical correspondant.</p>
                            </div>
                        )}
                    </div>
                </div >
            </main >

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                .main-content { margin-left: 280px; padding: var(--spacing-2xl); width: calc(100% - 280px); }
                
                .dashboard-header { margin-bottom: 30px; }
                .dashboard-header h1 { font-size: 2.5rem; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .dashboard-header p { color: var(--color-text-secondary); }

                .medical-grid { display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: start; }
                
                .card { background: var(--color-bg); border-radius: 20px; padding: 24px; border: 1px solid var(--color-border-light); box-shadow: var(--shadow-sm); }
                .card.glass { background: var(--glass-bg); backdrop-filter: blur(10px); }
                .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border-light); }
                .card-header h2 { font-size: 1.1rem; font-weight: 700; margin: 0; color: var(--color-text); }
                .card-header svg { color: var(--color-primary); font-size: 1.2rem; }

                .sticky { position: sticky; top: 24px; }

                /* Doctors List */
                .doctors-list { display: flex; flex-direction: column; gap: 12px; }
                .doctor-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 15px; 
                    padding: 15px; 
                    border-radius: 15px; 
                    border: 1px solid var(--color-border-light); 
                    text-align: left; 
                    width: 100%; 
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .doctor-item:hover { background: hsla(210, 100%, 56%, 0.05); border-color: var(--color-primary-light); transform: translateX(5px); }
                .doctor-item.active { background: var(--color-primary); border-color: var(--color-primary); color: white; box-shadow: 0 8px 20px rgba(var(--color-primary-rgb), 0.2); }
                .doctor-avatar { width: 45px; height: 45px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
                .doctor-avatar img { width: 100%; height: 100%; object-fit: cover; }
                .placeholder { width: 100%; height: 100%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-weight: 700; }
                .active .placeholder { background: white; color: var(--color-primary); }
                .doctor-info { flex: 1; display: flex; flex-direction: column; }
                .doctor-info strong { font-size: 0.95rem; }
                .doctor-info span { font-size: 0.8rem; opacity: 0.8; }
                .arrow { opacity: 0.3; }
                .active .arrow { opacity: 1; }

                /* Details Column */
                .details-wrapper { display: flex; flex-direction: column; gap: 24px; }
                .details-section { display: flex; flex-direction: column; gap: 24px; }
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .info-item { display: flex; flex-direction: column; gap: 5px; }
                .info-item label { font-size: 0.75rem; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; }
                .info-item span { font-size: 1.1rem; font-weight: 600; color: var(--color-text-secondary); }
                .blood-type { color: #ef4444 !important; font-weight: 800 !important; }

                .condition-row { margin-bottom: 15px; }
                .condition-row:last-child { margin-bottom: 0; }
                .condition-row label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-text-tertiary); margin-bottom: 8px; }
                .tags-container { display: flex; flex-wrap: wrap; gap: 8px; }
                .badge { background: var(--color-bg-secondary); color: var(--color-text-secondary); padding: 5px 12px; border-radius: 10px; font-size: 0.85rem; font-weight: 600; border: 1px solid var(--color-border-light); }
                .tags-container.primary .badge { background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); border-color: var(--color-primary-light); }

                .primary-border { border: 1.5px solid var(--color-primary-light); }
                .info-block h3 { font-size: 0.9rem; font-weight: 750; color: var(--color-text); margin-bottom: 10px; opacity: 0.9; }
                .text-content { font-size: 0.95rem; line-height: 1.6; color: var(--color-text-secondary); }
                .text-content.highlight { background: hsla(210, 100%, 56%, 0.05); padding: 12px; border-radius: 10px; border-left: 3px solid var(--color-primary); }
                .border-left { border-left: 1px solid var(--color-border-light); padding-left: 24px; }
                .mt-4 { margin-top: 16px; }

                /* Timeline */
                .timeline-container { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 20px; 
                    max-height: 400px; 
                    overflow-y: auto; 
                    padding-right: 10px;
                }
                .timeline-container::-webkit-scrollbar { width: 4px; }
                .timeline-container::-webkit-scrollbar-track { background: transparent; }
                .timeline-container::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }
                .timeline-container::-webkit-scrollbar-thumb:hover { background: var(--color-primary-light); }

                .timeline-item { position: relative; display: flex; gap: 15px; padding-left: 15px; }
                .timeline-item::before { content: ''; position: absolute; left: 24px; top: 40px; bottom: -20px; width: 2px; background: var(--color-border-light); }
                .timeline-item:last-child::before { display: none; }
                .timeline-marker { 
                    width: 20px; 
                    height: 20px; 
                    border-radius: 50%; 
                    background: white; 
                    border: 2px solid var(--color-border); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    z-index: 1;
                    font-size: 0.7rem;
                }
                .timeline-item.completed .timeline-marker { background: var(--color-success); border-color: var(--color-success); color: white; }
                .timeline-item.pending .timeline-marker { background: var(--color-primary); border-color: var(--color-primary); color: white; }
                .timeline-content { flex: 1; background: var(--color-bg-secondary); padding: 12px; border-radius: 12px; }
                .timeline-date { font-weight: 700; font-size: 0.9rem; color: var(--color-text); }
                .timeline-type { font-size: 0.75rem; color: var(--color-text-tertiary); font-weight: 600; text-transform: uppercase; margin-top: 2px; }
                .timeline-notes { font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 5px; font-style: italic; }

                .empty-state { text-align: center; padding: 60px; color: var(--color-text-tertiary); }
                .empty-state h2 { margin-top: 20px; color: var(--color-text); }
                
                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; width: 100%; padding-top: 100px; }
                    .medical-grid { grid-template-columns: 1fr; }
                    .doctors-column { order: 2; }
                    .details-column { order: 1; }
                    .grid-2 { grid-template-columns: 1fr; }
                    .doctors-column { order: 2; }
                    .details-column { order: 1; }
                    .grid-2 { grid-template-columns: 1fr; }
                }

                .documents-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
                .document-item { display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 12px; border: 1px solid var(--color-border-light); transition: all 0.2s; }
                .document-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); border-color: var(--color-primary-light); }
                .doc-icon { font-size: 1.5rem; color: var(--color-primary); background: hsla(210, 100%, 56%, 0.1); padding: 10px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .doc-info { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .doc-name { font-weight: 600; font-size: 0.95rem; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .doc-type { font-size: 0.8rem; color: var(--color-text-tertiary); margin-top: 2px; }
                .btn-download { color: var(--color-text-secondary); padding: 8px; border-radius: 8px; transition: all 0.2s; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .btn-download:hover { background: var(--color-auth-bg); color: var(--color-primary); }
            `}</style>
        </div>
    );
}
