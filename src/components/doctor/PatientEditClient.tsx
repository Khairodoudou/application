"use client";

import { useState } from "react";
import { DoctorSidebar } from "./DoctorSidebar";
import { FiArrowLeft, FiSave, FiAlertCircle, FiCheck, FiActivity, FiFileText, FiThermometer, FiClipboard, FiCalendar, FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PatientEditClientProps = {
    data: any;
};

interface MedicalDocument {
    type: string;
    name: string;
    date: string;
    url: string;
}

const DOCUMENT_TYPES = [
    { id: 'BLOOD_ANALYSIS', label: 'Analyses Sanguines', icon: <FiActivity /> },
    { id: 'X_RAY', label: 'Radios', icon: <FiFileText /> },
    { id: 'MRI', label: 'IRM', icon: <FiClipboard /> },
    { id: 'SCANNER', label: 'Scanner', icon: <FiThermometer /> },
    { id: 'OTHER', label: 'Autres documents', icon: <FiPlusCircle /> },
];

export default function PatientEditClient({ data }: PatientEditClientProps) {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const { patient } = data;
    const health = patient.healthProfile || {};
    const doctorPatient = data;

    const safeJoin = (val: any) => {
        if (!val) return "";
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed.join(", ") : parsed;
        } catch (e) {
            return val;
        }
    };

    const [form, setForm] = useState({
        // Isolated Clinical Data (From DoctorPatient)
        notes: doctorPatient.notes || "",
        diseases: safeJoin(doctorPatient.diseases),
        allergies: safeJoin(doctorPatient.allergies),
        medicalHistory: safeJoin(doctorPatient.medicalHistory),
        familyHistory: safeJoin(doctorPatient.familyHistory),
        surgeryHistory: safeJoin(doctorPatient.surgeryHistory),
        bloodPressure: doctorPatient.bloodPressure || "",
        heartRate: doctorPatient.heartRate || "",
        temperature: doctorPatient.temperature || "",
        symptoms: safeJoin(doctorPatient.symptoms),
        diagnosis: doctorPatient.diagnosis || "",
        treatmentPlan: safeJoin(doctorPatient.treatmentPlan),
        examsRequested: safeJoin(doctorPatient.examsRequested),
        observation: doctorPatient.observation || "",
        recommendations: doctorPatient.recommendations || "",
        documents: safeJoin(doctorPatient.documents),

        // Shared Physical Data (From HealthProfile)
        diet: health.diet || "",
        height: health.height || "",
        weight: health.weight || "",
        bloodType: health.bloodType || "",

        // Consultation Info
        nextConsultation: doctorPatient.nextConsultation ? new Date(doctorPatient.nextConsultation).toISOString().slice(0, 16) : "",
        consultationReason: doctorPatient.consultationReason || ""
    });

    // Parse initial documents
    const initialDocs = (() => {
        try {
            const parsed = JSON.parse(doctorPatient.documents || "[]");
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })();

    const [documents, setDocuments] = useState<MedicalDocument[]>(initialDocs);
    const [uploadingType, setUploadingType] = useState<string | null>(null);

    const handleFileUpload = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert("Seuls les fichiers PDF sont acceptés.");
            return;
        }

        setUploadingType(type);

        // Simulate upload delay
        setTimeout(() => {
            const newDoc: MedicalDocument = {
                type,
                name: file.name,
                date: new Date().toISOString(),
                url: "#" // Placeholder URL since we don't have real storage
            };
            setDocuments(prev => [...prev, newDoc]);
            setUploadingType(null);
        }, 1500);
    };

    const removeDocument = (index: number) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const [followUps, setFollowUps] = useState([{
        date: doctorPatient.nextConsultation ? new Date(doctorPatient.nextConsultation).toISOString().slice(0, 16) : "",
        reason: doctorPatient.consultationReason || ""
    }]);

    const addFollowUp = () => setFollowUps([...followUps, { date: "", reason: "" }]);
    const removeFollowUp = (index: number) => setFollowUps(followUps.filter((_, i) => i !== index));
    const updateFollowUp = (index: number, field: string, value: string) => {
        const newFollowUps = [...followUps];
        (newFollowUps[index] as any)[field] = value;
        setFollowUps(newFollowUps);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const split = (str: string) => str.split(",").map(s => s.trim()).filter(s => s !== "");

        try {
            const response = await fetch(`/api/doctor/patients/${patient.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // Existing
                    notes: form.notes,
                    diseases: split(form.diseases),
                    allergies: split(form.allergies),
                    diet: form.diet,
                    height: parseFloat(form.height.toString()) || null,
                    weight: parseFloat(form.weight.toString()) || null,
                    bloodType: form.bloodType,

                    // New Fields mapped back
                    medicalHistory: split(form.medicalHistory),
                    familyHistory: split(form.familyHistory),
                    surgeryHistory: split(form.surgeryHistory),

                    bloodPressure: form.bloodPressure,
                    heartRate: parseInt(form.heartRate.toString()) || null,
                    temperature: parseFloat(form.temperature.toString()) || null,

                    symptoms: split(form.symptoms),
                    diagnosis: form.diagnosis,

                    treatmentPlan: split(form.treatmentPlan),
                    examsRequested: split(form.examsRequested),

                    observation: form.observation,
                    recommendations: form.recommendations,
                    documents: documents,
                    followUps: followUps.filter(f => f.date)
                })
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour");

            setMessage({ type: 'success', text: "Le dossier a été mis à jour avec succès !" });
            setTimeout(() => {
                router.push(`/doctor/patients/${patient.id}`);
                router.refresh();
            }, 1000);
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
                            <FiArrowLeft /> Annuler
                        </Link>
                    </div>
                    <div className="header-info">
                        <h1>Gérer le Dossier Médical</h1>
                        <p>Patient : {patient.lastName} {patient.firstName}</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="edit-form-container glass animate-fade-in">
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                            {message.text}
                        </div>
                    )}

                    <div className="form-sections-wrapper">

                        {/* 1. ANTECEDENTS & MODE DE VIE */}
                        <section className="form-section">
                            <div className="section-header">
                                <FiActivity />
                                <h3>1. Antécédents & Mode de Vie</h3>
                            </div>
                            <div className="grid-2">
                                <div className="input-group">
                                    <label>Antécédents Personnels (Maladies chroniques)</label>
                                    <textarea name="medicalHistory" value={form.medicalHistory} onChange={handleChange} placeholder="Diabète, Hypertension, Asthme..." className="input glass" rows={2} />
                                </div>
                                <div className="input-group">
                                    <label>Antécédents Familiaux</label>
                                    <textarea name="familyHistory" value={form.familyHistory} onChange={handleChange} placeholder="Père: Cardiaque, Mère: Diabétique..." className="input glass" rows={2} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Antécédents Chirurgicaux (Opérations)</label>
                                <textarea name="surgeryHistory" value={form.surgeryHistory} onChange={handleChange} placeholder="Appendicite (2010)..." className="input glass" rows={2} />
                            </div>
                            <div className="grid-2">
                                <div className="input-group">
                                    <label>Allergies</label>
                                    <input type="text" name="allergies" value={form.allergies} onChange={handleChange} placeholder="Pénicilline, Arachides..." className="input glass" />
                                </div>
                                <div className="input-group">
                                    <label>Régime Alimentaire</label>
                                    <select name="diet" value={form.diet} onChange={handleChange} className="input glass">
                                        <option value="">-- Non spécifié --</option>
                                        <option value="Aucun">Aucun (Normal)</option>
                                        <option value="Végétarien">Végétarien</option>
                                        <option value="Végétalien">Végétalien (Vegan)</option>
                                        <option value="Sans Gluten">Sans Gluten</option>
                                        <option value="Sans Sel">Sans Sel (Hyposodé)</option>
                                        <option value="Sans Sucre">Sans Sucre (Diabétique)</option>
                                        <option value="Halal">Halal</option>
                                        <option value="Casher">Casher</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* 2. CONSTANTES / VITALS */}
                        <section className="form-section">
                            <div className="section-header">
                                <FiThermometer />
                                <h3>2. Paramètres Vitaux</h3>
                            </div>
                            <div className="grid-4">
                                <div className="input-group">
                                    <label>Tension (mmHg)</label>
                                    <input type="text" name="bloodPressure" value={form.bloodPressure} onChange={handleChange} placeholder="12/8" className="input glass" />
                                </div>
                                <div className="input-group">
                                    <label>Fréquence Cardiaque (bpm)</label>
                                    <input type="number" name="heartRate" value={form.heartRate} onChange={handleChange} placeholder="75" className="input glass" />
                                </div>
                                <div className="input-group">
                                    <label>Température (°C)</label>
                                    <input type="number" step="0.1" name="temperature" value={form.temperature} onChange={handleChange} placeholder="37.5" className="input glass" />
                                </div>
                                <div className="input-group">
                                    <label>Groupe Sanguin</label>
                                    <select name="bloodType" value={form.bloodType} onChange={handleChange} className="input glass">
                                        <option value="">--</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid-2">
                                <div className="input-group">
                                    <label>Poids (kg)</label>
                                    <input type="number" name="weight" value={form.weight} onChange={handleChange} className="input glass" />
                                </div>
                                <div className="input-group">
                                    <label>Taille (cm)</label>
                                    <input type="number" name="height" value={form.height} onChange={handleChange} className="input glass" />
                                </div>
                            </div>
                        </section>

                        {/* 3. DIAGNOSTIC */}
                        <section className="form-section">
                            <div className="section-header">
                                <FiClipboard />
                                <h3>3. Diagnostic</h3>
                            </div>
                            <div className="input-group">
                                <label>Symptômes (séparés par virgules)</label>
                                <textarea name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="Fièvre, Toux, Fatigue..." className="input glass" rows={2} />
                            </div>
                            <div className="input-group">
                                <label>Diagnostic du Médecin</label>
                                <textarea name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Grippe saisonnière..." className="input glass" rows={3} />
                            </div>
                        </section>

                        {/* 4. TRAITEMENT */}
                        <section className="form-section">
                            <div className="section-header">
                                <FiFileText />
                                <h3>4. Traitement & Prescription</h3>
                            </div>
                            <div className="grid-2">
                                <div className="input-group">
                                    <label>Prescription (Médicaments, Posologie, Durée)</label>
                                    <textarea name="treatmentPlan" value={form.treatmentPlan} onChange={handleChange} placeholder="Doliprane 1000mg (1 matin/soir, 5 jours)..." className="input glass" rows={4} />
                                    <small>Séparez chaque médicament par une virgule pour créer une liste.</small>
                                </div>
                                <div className="input-group">
                                    <label>Examens Demandés</label>
                                    <textarea name="examsRequested" value={form.examsRequested} onChange={handleChange} placeholder="Prise de sang, Radio Thorax..." className="input glass" rows={4} />
                                </div>
                            </div>
                        </section>

                        {/* 6. DOCUMENTS MEDICAUX */}
                        <section className="form-section">
                            <div className="section-header">
                                <FiFileText />
                                <h3>6. Documents Médicaux</h3>
                            </div>

                            <div className="documents-grid">
                                {DOCUMENT_TYPES.map(type => (
                                    <div key={type.id} className="document-upload-card glass">
                                        <div className="upload-header">
                                            <div className="upload-icon">{type.icon}</div>
                                            <h4>{type.label}</h4>
                                        </div>

                                        <div className="existing-files">
                                            {documents.filter(d => d.type === type.id).map((doc, idx) => (
                                                <div key={idx} className="file-item">
                                                    <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                                                        <span>📄 {doc.name}</span>
                                                    </a>
                                                    <button type="button" onClick={() => {
                                                        const realIndex = documents.indexOf(doc);
                                                        removeDocument(realIndex);
                                                    }} className="btn-remove-small">×</button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="upload-action">
                                            <input
                                                type="file"
                                                id={`file-${type.id}`}
                                                className="hidden-input"
                                                accept=".pdf,application/pdf"
                                                onChange={(e) => handleFileUpload(type.id, e)}
                                                disabled={uploadingType === type.id}
                                            />
                                            <label htmlFor={`file-${type.id}`} className="btn-upload">
                                                {uploadingType === type.id ? 'Envoi...' : <><FiPlusCircle /> Ajouter un fichier PDF</>}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 5. NOTES & SUIVI (Moved down) */}
                        <section className="form-section">
                            <div className="section-header">
                                <FiCalendar />
                                <h3>5. Notes & Suivi</h3>
                            </div>
                            <div className="grid-2">
                                <div className="input-group">
                                    <label>Observation Générale</label>
                                    <textarea name="observation" value={form.observation} onChange={handleChange} className="input glass" rows={3} />
                                </div>
                                <div className="input-group">
                                    <label>Recommandations</label>
                                    <textarea name="recommendations" value={form.recommendations} onChange={handleChange} placeholder="Repos, Hydratation..." className="input glass" rows={3} />
                                </div>
                            </div>
                            <div className="followups-container">
                                <div className="section-header-alt">
                                    <label>Calendrier des Prochains RDV</label>
                                    <button type="button" onClick={addFollowUp} className="btn-add">
                                        <FiPlusCircle /> Ajouter un suivi
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
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Motif</label>
                                                    <div className="input-with-action">
                                                        <input
                                                            type="text"
                                                            value={followup.reason}
                                                            onChange={(e) => updateFollowUp(index, "reason", e.target.value)}
                                                            placeholder="Suivi..."
                                                            className="input glass"
                                                        />
                                                        {followUps.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFollowUp(index)}
                                                                className="btn-remove"
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
                            <div className="input-group">
                                <label>Notes Privées (Visible uniquement par vous)</label>
                                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes confidentielles..." className="input glass" rows={2} style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }} />
                            </div>
                        </section>

                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Enregistrement..." : <><FiSave /> Enregistrer le dossier</>}
                        </button>
                    </div>
                </form >
            </main >

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                .main-content { margin-left: 280px; padding: var(--spacing-2xl); width: calc(100% - 280px); }
                
                .header-info h1 { font-size: 2.2rem; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
                
                .edit-form-container { padding: 40px; border-radius: var(--radius-xl); max-width: 1000px; margin: 0 auto; }
                
                .form-sections-wrapper { display: flex; flex-direction: column; gap: 40px; }
                .form-section { background: var(--color-bg); padding: 24px; border-radius: 16px; border: 1px solid var(--color-border-light); box-shadow: var(--shadow-sm); }
                
                .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border-light); }
                .section-header svg { font-size: 1.4rem; color: var(--color-primary); }
                .section-header h3 { font-size: 1.2rem; color: var(--color-text); margin: 0; }
                
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
                
                .input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
                .input-group label { font-size: 0.9rem; font-weight: 600; color: var(--color-text-secondary); }
                .input-group small { font-size: 0.8rem; color: var(--color-text-tertiary); }
                
                .input { padding: 12px 16px; border-radius: 10px; font-size: 0.95rem; border: 1px solid var(--color-border); width: 100%; color: var(--color-text); background: var(--glass-bg); }
                .input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-light); }
                textarea.input { resize: vertical; font-family: inherit; }
                
                .alert { padding: 16px; border-radius: 12px; margin-bottom: 30px; display: flex; align-items: center; gap: 12px; font-weight: 600; }
                .alert.success { background: hsla(142, 71%, 45%, 0.1); color: var(--color-success); }
                .alert.error { background: hsla(0, 84%, 60%, 0.1); color: var(--color-danger); }

                .section-header-alt { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .section-header-alt label { font-size: 0.9rem; font-weight: 600; color: var(--color-text-secondary); }
                .btn-add { display: flex; align-items: center; gap: 8px; background: hsla(210, 100%, 56%, 0.1); color: var(--color-primary); border: 1px solid rgba(0, 112, 243, 0.2); padding: 6px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                .btn-add:hover { background: var(--color-primary); color: white; }

                .followups-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
                .followup-item { padding: 15px; border-radius: 12px; border: 1px solid var(--color-border-light); }
                .input-with-action { display: flex; gap: 10px; align-items: center; }
                .btn-remove { background: hsla(0, 100%, 50%, 0.1); color: #d32f2f; border: none; width: 32px; height: 32px; border-radius: 8px; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                .btn-remove:hover { background: #d32f2f; color: white; }
                
                .form-actions { margin-top: 40px; display: flex; justify-content: flex-end; position: sticky; bottom: 20px; z-index: 10; }
                .btn-primary { padding: 16px 48px; font-size: 1.1rem; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                
                .back-link { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; background: white; border: 1px solid var(--color-border); color: var(--color-text-secondary); font-weight: 600; margin-bottom: 20px; }
                .back-link:hover { color: var(--color-primary); border-color: var(--color-primary); }

                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; width: 100%; padding: 20px; padding-top: 100px; }
                    .grid-2, .grid-4 { grid-template-columns: 1fr; }
                    .documents-grid { grid-template-columns: 1fr; }
                }

                .documents-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
                .document-upload-card { padding: 20px; border-radius: 12px; border: 1px solid var(--color-border-light); display: flex; flex-direction: column; gap: 15px; }
                .upload-header { display: flex; align-items: center; gap: 10px; }
                .upload-icon { color: var(--color-primary); font-size: 1.2rem; background: hsla(210, 100%, 56%, 0.1); padding: 8px; border-radius: 8px; }
                .upload-header h4 { margin: 0; font-size: 1rem; color: var(--color-text); }
                
                .existing-files { display: flex; flex-direction: column; gap: 8px; }
                .file-item { display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-secondary); padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; }
                .btn-remove-small { background: none; border: none; color: #d32f2f; cursor: pointer; font-size: 1.2rem; padding: 0 4px; }
                
                .hidden-input { display: none; }
                .btn-upload { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; border: 1px dashed var(--color-primary); color: var(--color-primary); border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 0.9rem; font-weight: 600; }
                .btn-upload:hover { background: hsla(210, 100%, 56%, 0.05); }
            `}</style>
        </div >
    );
}
