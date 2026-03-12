"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ReportFormProps = {
    initialData: {
        firstName: string;
        lastName: string;
        email: string;
    }
};

export function ReportForm({ initialData }: ReportFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) {
            setStatus({ type: 'error', message: 'La photo du produit est obligatoire.' });
            return;
        }

        setIsLoading(true);
        setStatus(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            productName: formData.get('productName'),
            barcode: formData.get('barcode'),
            message: formData.get('description'),
            // Note: In a real app, you'd upload the file to S3/Cloudinary first
            // For now, we'll simulate or pass the base64 if small, but let's stick to the structure
            imageUrl: imagePreview
        };

        try {
            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Votre signalement a été envoyé avec succès !' });
                form.reset();
                setImagePreview(null);
                setSelectedFile(null);

                // Auto-refresh and clear success message
                setTimeout(() => {
                    setStatus(null);
                    router.refresh();
                }, 3000);
            } else {
                setStatus({ type: 'error', message: 'Une erreur est survenue lors de l\'envoi.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erreur de connexion au serveur.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="report-form animate-fade-in">
            <div className="form-inner">
                {status && (
                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
                        <span className="alert-icon">{status.type === 'success' ? '✓' : '⚠'}</span>
                        {status.message}
                    </div>
                )}

                <div className="section-label">Informations Personnelles</div>
                {/* ... rest of the form ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="form-group">
                        <label>Nom & Prénom</label>
                        <input
                            type="text"
                            className="input disabled"
                            value={`${initialData.firstName} ${initialData.lastName}`}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="input disabled"
                            value={initialData.email}
                            disabled
                        />
                    </div>
                </div>

                <div className="section-label">Détails du Produit</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="form-group">
                        <label>Nom du produit</label>
                        <input
                            name="productName"
                            type="text"
                            className="input"
                            placeholder="Ex: Coca-Cola 33cl"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Code-barres</label>
                        <input
                            name="barcode"
                            type="text"
                            className="input"
                            placeholder="Ex: 5449000000996"
                        />
                    </div>
                </div>

                <div className="form-group mb-6">
                    <label>Description (Signalement)</label>
                    <textarea
                        name="description"
                        className="input min-h-[140px]"
                        placeholder="Détaillez le problème rencontré (composition erronée, produit manquant, etc.)..."
                        required
                    ></textarea>
                </div>

                <div className="form-group mb-8">
                    <label>Photo du produit <span className="text-danger">(obligatoire)</span></label>
                    <div className={`file-input-wrapper card ${imagePreview ? 'has-preview' : ''}`}>
                        {!imagePreview ? (
                            <>
                                <input
                                    type="file"
                                    className="file-input"
                                    accept="image/*"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    required
                                />
                                <label htmlFor="file-upload" className="file-label">
                                    <span className="icon">📸</span>
                                    <span>Cliquez pour ajouter une photo</span>
                                    <span className="subtext">Format JPG, PNG (Max. 5MB)</span>
                                </label>
                            </>
                        ) : (
                            <div className="preview-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button type="button" className="remove-preview" onClick={removeImage}>
                                    ✕
                                </button>
                                <div className="preview-overlay">
                                    <span>Photo sélectionnée</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loader-container">
                            <span className="loader"></span>
                            Envoi en cours...
                        </span>
                    ) : (
                        "🚀 Envoyer le signalement"
                    )}
                </button>
            </div>

            <style jsx>{`
                .report-form {
                    width: 100%;
                }

                .form-inner {
                    padding: var(--spacing-xl);
                }

                .section-label {
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    color: var(--color-primary);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: var(--spacing-md);
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

                .grid { display: grid; }
                .grid-cols-1 { grid-template-columns: 1fr; }
                .gap-4 { gap: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .mb-8 { margin-bottom: 2rem; }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: var(--color-text);
                    font-size: var(--font-size-sm);
                }

                .input {
                    padding: 0.875rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    width: 100%;
                    font-size: 1rem;
                    background: var(--color-bg);
                    color: var(--color-text);
                    transition: all var(--transition-fast);
                }

                .input:focus {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px hsla(210, 100%, 56%, 0.1);
                }

                .input.disabled {
                    background: var(--color-bg-secondary);
                    cursor: not-allowed;
                    color: var(--color-text-secondary);
                    border-style: dashed;
                }

                .min-h-\\[140px\\] { min-height: 140px; }

                /* File Input Styling */
                .file-input-wrapper {
                    position: relative;
                    border: 2px dashed var(--color-border);
                    background: var(--color-bg-secondary);
                    transition: all var(--transition-base);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                }

                .file-input-wrapper:hover {
                    border-color: var(--color-primary);
                    background: hsla(210, 100%, 56%, 0.02);
                }

                .file-input {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
                    width: 100%;
                    z-index: 2;
                }

                .file-label {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: var(--spacing-xl);
                    color: var(--color-text-secondary);
                    font-weight: 500;
                }

                .file-label .icon {
                    font-size: 2rem;
                }

                .file-label .subtext {
                    font-size: var(--font-size-xs);
                    opacity: 0.6;
                    margin-top: 4px;
                }

                .file-input-wrapper.has-preview {
                    border-style: solid;
                    border-color: var(--color-primary);
                    padding: var(--spacing-xs);
                }

                .preview-container {
                    position: relative;
                    width: 100%;
                    height: 250px;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                }

                .image-preview {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .remove-preview {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    color: var(--color-danger);
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    z-index: 10;
                    transition: all var(--transition-fast);
                }

                .remove-preview:hover {
                    background: var(--color-danger);
                    color: white;
                    transform: scale(1.1);
                }

                .preview-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
                    padding: var(--spacing-md);
                    color: white;
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                }

                .text-danger {
                    color: var(--color-danger);
                }

                /* Submit Button */
                .btn-submit {
                    width: 100%;
                    padding: 1.25rem;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
                    color: white;
                    border: none;
                    border-radius: var(--radius-lg);
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    cursor: pointer;
                    transition: all var(--transition-base);
                    box-shadow: 0 10px 20px -10px hsla(210, 100%, 56%, 0.5);
                }

                .btn-submit:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px -12px hsla(210, 100%, 56%, 0.6);
                    filter: brightness(1.1);
                }

                .btn-submit:active:not(:disabled) {
                    transform: translateY(0);
                }

                .btn-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* Alert Styling */
                .alert {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: 1rem 1.25rem;
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                    animation: slideDown 0.3s ease-out;
                }

                .alert-icon {
                    font-size: 1.25rem;
                }

                .alert-success {
                    background: hsla(142, 71%, 45%, 0.1);
                    color: hsla(142, 71%, 45%, 1);
                    border: 1px solid hsla(142, 71%, 45%, 0.5);
                }

                .alert-error {
                    background: hsla(0, 84%, 60%, 0.1);
                    color: var(--color-danger);
                    border: 1px solid var(--color-danger);
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                /* Loader */
                .loader-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                }

                .loader {
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @media (min-width: 768px) {
                    .md\\:grid-cols-2 {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </form>
    );
}
