"use client";

import { useState } from "react";
import { DoctorSidebar } from "./DoctorSidebar";
import { FiArrowLeft, FiPlusCircle, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PatientCreateRecordClientProps = {
    data: any;
};

export default function PatientCreateRecordClient({ data }: PatientCreateRecordClientProps) {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<string>("");
    const [notes, setNotes] = useState("");
    const [followUps, setFollowUps] = useState([{ date: "", reason: "" }]);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const { patient } = data;
    const appointments = patient.patientAppointments || [];

    const addFollowUp = () => setFollowUps([...followUps, { date: "", reason: "" }]);
    const removeFollowUp = (index: number) => setFollowUps(followUps.filter((_, i) => i !== index));
    const updateFollowUp = (index: number, field: string, value: string) => {
        const newFollowUps = [...followUps];
        (newFollowUps[index] as any)[field] = value;
        setFollowUps(newFollowUps);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAppointment) {
            setMessage({ type: 'error', text: "Veuillez sélectionner un rendez-vous." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`/api/appointments/${selectedAppointment}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "COMPLETED",
                    notes: notes,
                    followUps: followUps.filter(f => f.date) // Only send ones with dates
                })
            });

            if (!response.ok) throw new Error("Erreur lors de la création du compte-rendu");

            setMessage({ type: 'success', text: "Compte-rendu créé et rendez-vous validé !" });
            setTimeout(() => {
                router.push(`/doctor/patients/${patient.id}`);
                router.refresh();
            }, 1500);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
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
                        <Link href={`/doctor/patients/${patient.id}`} className="back-link">
                            <FiArrowLeft /> Retour
                        </Link>
                    </div>
                    <div className="header-info">
                        <h1>Nouveau Compte-rendu</h1>
                        <p>Patient : {patient.lastName} {patient.firstName}</p>
                    </div>
                </header>

                <div className="create-record-container glass animate-fade-in">
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.type === 'success' ? <FiCheckCircle /> : <FiCalendar />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>1. Sélectionner le rendez-vous</h3>
                            {appointments.length > 0 ? (
                                <div className="appointments-list">
                                    {appointments.map((app: any) => (
                                        <label key={app.id} className={`appointment-option glass ${selectedAppointment === app.id ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="appointment"
                                                value={app.id}
                                                checked={selectedAppointment === app.id}
                                                onChange={(e) => setSelectedAppointment(e.target.value)}
                                            />
                                            <div className="app-info">
                                                <div className="app-date">
                                                    <FiCalendar />
                                                    <span>{new Date(app.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                                </div>
                                                <div className="app-time">
                                                    <FiClock />
                                                    <span>{new Date(app.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>
                                            <div className="app-type">{app.type || 'Consultation'}</div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-appointments glass">
                                    <FiCalendar className="empty-icon" />
                                    <p>Aucun rendez-vous à valider pour ce patient.</p>
                                    <p className="hint">Note: Seuls les rendez-vous en attente ou confirmés apparaissent ici.</p>
                                </div>
                            )}
                        </div>

                        <div className="form-section">
                            <h3>2. Compte-rendu de consultation</h3>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Saisissez ici vos observations, diagnostics et recommandations..."
                                className="input glass record-textarea"
                                rows={8}
                                disabled={appointments.length === 0}
                            />
                        </div>

                        <div className="form-section">
                            <div className="section-header">
                                <h3>3. Prochains Suivis (Optionnel)</h3>
                                <button type="button" onClick={addFollowUp} className="btn-add">
                                    <FiPlusCircle /> Ajouter un autre suivi
                                </button>
                            </div>

                            <div className="followups-list">
                                {followUps.map((followup, index) => (
                                    <div key={index} className="followup-item glass">
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label>Date de Contrôle</label>
                                                <input
                                                    type="datetime-local"
                                                    value={followup.date}
                                                    onChange={(e) => updateFollowUp(index, "date", e.target.value)}
                                                    className="input glass"
                                                    disabled={appointments.length === 0}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Motif du RDV</label>
                                                <div className="input-with-action">
                                                    <input
                                                        type="text"
                                                        value={followup.reason}
                                                        onChange={(e) => updateFollowUp(index, "reason", e.target.value)}
                                                        placeholder="Suivi post-opératoire, etc."
                                                        className="input glass"
                                                        disabled={appointments.length === 0}
                                                    />
                                                    {followUps.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFollowUp(index)}
                                                            className="btn-remove"
                                                            title="Supprimer ce suivi"
                                                        >
                                                            ×
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading || appointments.length === 0 || !selectedAppointment}
                            >
                                {loading ? "Traitement..." : <><FiPlusCircle /> Enregistrer le compte-rendu</>}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                
                .main-content { 
                    margin-left: 280px; 
                    padding: var(--spacing-2xl); 
                    width: calc(100% - 280px); 
                    transition: all 0.3s ease;
                }
                
                .dashboard-header { margin-bottom: var(--spacing-2xl); }
                .back-link { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 8px; 
                    padding: 8px 16px; 
                    border-radius: var(--radius-md); 
                    background: var(--color-bg); 
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }
                .back-link:hover { color: var(--color-primary); border-color: var(--color-primary); background: var(--color-bg-secondary); }
                
                .header-info h1 { font-size: 2.5rem; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-fill-color: transparent; margin-bottom: 0.5rem; }
                .header-info p { color: var(--color-text-secondary); font-size: 1.1rem; }

                .create-record-container { padding: 40px; border-radius: var(--radius-xl); max-width: 800px; }
                
                .alert { 
                    padding: 16px; 
                    border-radius: var(--radius-md); 
                    margin-bottom: 30px; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    font-weight: 600;
                }
                .alert.success { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); border: 1px solid hsla(142, 71%, 45%, 0.2); }
                .alert.error { background: hsla(0, 84%, 60%, 0.1); color: var(--color-danger); border: 1px solid hsla(0, 84%, 60%, 0.2); }

                .form-section { margin-bottom: 40px; }
                .form-section h3 { font-size: 1.1rem; color: var(--color-text-tertiary); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }

                .appointments-list { display: flex; flex-direction: column; gap: 12px; }
                .appointment-option { 
                    display: flex; 
                    align-items: center; 
                    gap: 20px; 
                    padding: 16px 20px; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    border: 1px solid var(--glass-border);
                }
                .appointment-option:hover { background: var(--color-bg-secondary); border-color: var(--color-primary-light); }
                .appointment-option.selected { background: hsla(210, 100%, 56%, 0.1); border-color: var(--color-primary); }
                
                .app-info { flex: 1; display: flex; gap: 24px; }
                .app-date, .app-time { display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--color-text); }
                .app-date svg, .app-time svg { color: var(--color-primary); }
                
                .app-type { font-size: 0.85rem; font-weight: 700; color: var(--color-text-tertiary); text-transform: uppercase; }
                
                input[type="radio"] { width: 20px; height: 20px; accent-color: var(--color-primary); }

                .record-textarea { padding: 20px; border-radius: 16px; font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px; }
                
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .btn-add { display: flex; align-items: center; gap: 8px; background: hsla(145, 63%, 42%, 0.1); color: #2e7d32; border: 1px solid rgba(46, 125, 50, 0.2); padding: 8px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                .btn-add:hover { background: #2e7d32; color: white; }

                .followups-list { display: flex; flex-direction: column; gap: 15px; }
                .followup-item { padding: 20px; border-radius: 12px; border: 1px solid var(--color-border); }
                
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .input-group { display: flex; flex-direction: column; gap: 8px; }
                .input-with-action { display: flex; gap: 10px; align-items: center; }
                .btn-remove { background: hsla(0, 100%, 50%, 0.1); color: #d32f2f; border: none; width: 32px; height: 32px; border-radius: 8px; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
                .btn-remove:hover { background: #d32f2f; color: white; }

                .input-group label { font-size: 0.9rem; font-weight: 600; color: var(--color-text-secondary); }
                .input { padding: 12px 16px; border-radius: 10px; font-size: 0.95rem; border: 1px solid var(--color-border); width: 100%; color: var(--color-text); background: var(--glass-bg); }

                .empty-appointments { padding: 40px; text-align: center; border-radius: 16px; color: var(--color-text-tertiary); }
                .empty-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.3; }
                .hint { font-size: 0.85rem; margin-top: 8px; font-style: italic; }

                .form-actions { display: flex; justify-content: flex-end; margin-top: 30px; }
                .btn-primary { padding: 14px 40px; font-size: 1.1rem; border-radius: 14px; }

                @media (max-width: 768px) {
                    .main-content { margin-left: 0; width: 100%; padding: var(--spacing-xl); padding-top: 100px; }
                    .create-record-container { padding: 20px; }
                    .app-info { flex-direction: column; gap: 8px; }
                    .grid-2 { grid-template-columns: 1fr; }
                    .section-header { flex-direction: column; align-items: flex-start; gap: 10px; }
                }
            `}</style>
        </div>
    );
}
