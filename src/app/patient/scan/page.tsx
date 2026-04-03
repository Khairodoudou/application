"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import { BrowserMultiFormatReader } from "@zxing/library";
import productsData from "@/data/products.json";

const DISEASES = [
  { id: "coeliaque", label: "Coeliaque" },
  { id: "diabete", label: "Diabète" },
  { id: "hypercholesterolemie", label: "Hypercholestérolémie" },
  { id: "hypertension", label: "Hypertension" },
  { id: "colon_irritable", label: "Colon Irritable" },
  { id: "intolerance_lactose", label: "Intolérance au Lactose" },
  { id: "intolerance_gluten", label: "Intolérance au Gluten" },
  { id: "allergie_arachide", label: "Allergie Arachide" },
  { id: "allergie_fraise", label: "Allergie Fraise" },
  { id: "allergie_cacao", label: "Allergie Cacao" },
  { id: "asthme", label: "Asthme" },
  { id: "migraine", label: "Migraines" },
  { id: "anxiete", label: "Anxiété/Stress" },
  { id: "rgo", label: "Reflux Gastrique (RGO)" },
  { id: "constipation", label: "Constipation Chronique" },
  { id: "eczema", label: "Eczéma / Psoriasis" },
  { id: "hypothyroidie", label: "Hypothyroïdie" }
];

const SYMPTOMS = [
  "Fièvre",
  "Fatigue intense",
  "Perte d'appétit",
  "Perte de poids sans raison",
  "Sueurs nocturnes",
  "Douleurs corporelles ou articulaires",
  "Mal de tête",
  "Toux persistante ou sèche",
  "Éternuements fréquents",
  "Nez bouché ou qui coule",
  "Mal de gorge",
  "Difficulté à respirer ou oppression thoracique",
  "Nausées",
  "Vomissements",
  "Diarrhée",
  "Constipation",
  "Douleurs ou crampes abdominales",
  "Ballonnements",
  "Douleur ou pression dans la poitrine",
  "Palpitations ou rythme cardiaque rapide",
  "Essoufflement à l'effort",
  "Gonflement des pieds ou des chevilles",
  "Étourdissements ou évanouissements",
  "Éruptions cutanées ou démangeaisons",
  "Rougeurs ou plaies sur la peau",
  "Boutons ou cloques inhabituels",
  "Vertiges",
  "Engourdissement ou faiblesse des membres",
  "Difficulté de concentration ou troubles de la mémoire"
];

export default function ScanPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scanMethod, setScanMethod] = useState<"barcode" | "manual">("barcode");
  const [barcode, setBarcode] = useState("");
  const [manualData, setManualData] = useState({
    description: "",
  });
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [barcodeError, setBarcodeError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBarcodeError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const zxingReader = new BrowserMultiFormatReader();
      const result = await zxingReader.decodeFromImageUrl(URL.createObjectURL(file));
      const code = result.getText();
      setBarcode(code);
    } catch {
      setBarcodeError("Impossible de lire un code-barres. Essayez une image plus nette ou saisissez le code manuellement.");
    } finally {
      setIsUploading(false);
    }
  };

  const calculateNutriScore = (data: any) => {
    if (!data) return { score: 0, grade: 'C' };

    // Negative points (0-10 each)
    const energyPoints = Math.min(10, Math.floor(data.energy / 80)); // 80 kcal ≈ 335 kJ
    const sugarPoints = Math.min(10, Math.floor(data.sugar / 4.5));
    const fatPoints = Math.min(10, Math.floor(data.saturated_fat / 1));
    const saltPoints = Math.min(10, Math.floor(data.salt / 0.1));

    const negativePoints = energyPoints + sugarPoints + fatPoints + saltPoints;

    // Positive points (0-5 each)
    const producePoints = Math.min(5, Math.floor(data.fruits_veggies_nuts / 20));
    const fiberPoints = Math.min(5, Math.floor(data.fiber / 0.9));
    const proteinPoints = Math.min(5, Math.floor(data.protein / 1.6));

    const positivePoints = producePoints + fiberPoints + proteinPoints;

    const finalScore = negativePoints - positivePoints;

    let grade = 'E';
    if (finalScore <= -1) grade = 'A';
    else if (finalScore <= 2) grade = 'B';
    else if (finalScore <= 10) grade = 'C';
    else if (finalScore <= 18) grade = 'D';

    return { score: finalScore, grade };
  };

  const handleProductLookup = (codeToSearch: string) => {
    const product = productsData.products.find(p => p.code_bar === codeToSearch);

    if (product) {
      // Calculate status based on selected diseases
      let finalStatus: "SAFE" | "WARNING" | "UNSAFE" = "SAFE";
      const issues: string[] = [];
      const reasons: string[] = [];

      selectedDiseases.forEach(diseaseId => {
        const condition = (product.conditions as any)[diseaseId];
        if (condition) {
          if (condition.status === "not_safe") {
            finalStatus = "UNSAFE";
            issues.push(`${diseaseId} (Critique)`);
          } else if (condition.status === "moderation" && finalStatus !== "UNSAFE") {
            finalStatus = "WARNING";
            issues.push(`${diseaseId} (Vigilance)`);
          }
          reasons.push(`${DISEASES.find(d => d.id === diseaseId)?.label}: ${condition.reason}`);
        }
      });

      const nutriData = calculateNutriScore(product.nutritional_values);

      setScanResult({
        productName: product.product_name,
        barcode: codeToSearch,
        ingredients: product.ingredients.split(", "),
        result: finalStatus,
        dangerousIngredients: issues,
        recommendation: reasons.length > 0
          ? reasons.join(" | ")
          : "Aucune contre-indication majeure trouvée pour votre profil.",
        fullConditions: product.conditions,
        nutriScore: nutriData,
        nutritionalValues: product.nutritional_values
      });
    } else {
      alert("Produit non trouvé dans notre base de données locale.");
    }
  };

  const handleBarcodeScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode) return;
    setIsScanning(true);
    handleProductLookup(barcode);
    setIsScanning(false);
  };

  const handleManualScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);

    // Build final text: merge free text with selected symptoms
    const symptomsText = selectedSymptoms.length > 0
      ? selectedSymptoms.join(", ")
      : "";
    const freeText = manualData.description.trim();
    const combinedText = freeText && symptomsText
      ? `${freeText}. Symptômes sélectionnés : ${symptomsText}`
      : freeText || symptomsText;

    if (!combinedText) {
      alert("Veuillez décrire vos symptômes ou en sélectionner depuis la liste.");
      setIsScanning(false);
      return;
    }

    try {
      const response = await fetch("/api/analyze-medical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: combinedText }),
      });

      if (!response.ok) throw new Error("Erreur d'analyse");

      const result = await response.json();
      setScanResult(result);
    } catch (error) {
      console.error("Scan error:", error);
      alert("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setBarcode("");
    setManualData({ description: "" });
    setSelectedSymptoms([]);
    setImagePreview(null);
  };

  return (
    <div className="dashboard-wrapper">
      <PatientSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Analyse Santé Intelligente</h1>
            <p>Scannez un produit ou décrivez vos symptômes pour une analyse instantanée par ClinicalBERT.</p>
          </div>
          <Link href="/patient/dashboard" className="btn btn-secondary">
            ← Retour au Dashboard
          </Link>
        </header>

        {!scanResult ? (
          <div className="scan-container fade-in">
            {/* Method Selection */}
            <div className="method-selector">
              <button
                className={`method-btn ${scanMethod === "barcode" ? "active" : ""}`}
                onClick={() => setScanMethod("barcode")}
              >
                <span className="method-icon">📷</span>
                <div className="method-info">
                  <h3>Code-barres</h3>
                  <p>Scan automatique via caméra ou saisie</p>
                </div>
              </button>
              <button
                className={`method-btn ${scanMethod === "manual" ? "active" : ""}`}
                onClick={() => setScanMethod("manual")}
              >
                <span className="method-icon">✍️</span>
                <div className="method-info">
                  <h3>Saisie Médicale</h3>
                  <p>Décrivez vos symptômes (ClinicalBERT)</p>
                </div>
              </button>
            </div>

            {/* Scanner Content */}
            <div className="scan-content card">
              {scanMethod === "barcode" && (
                <div className="scan-form-wrapper">
                  <div className="scan-visual">
                    {imagePreview ? (
                      <div className="image-preview-container">
                        <img src={imagePreview} alt="Produit" className="image-preview" />
                        <button onClick={() => setImagePreview(null)} className="btn-remove-image">Changer</button>
                      </div>
                    ) : (
                      <div className="scan-icon-large gradient-primary">📷</div>
                    )}
                  </div>
                  <h2>Scanner un produit</h2>
                  <p>Téléchargez une photo du produit pour extraire son code-barres automatiquement.</p>

                  <div className="upload-actions">
                    <label className="btn btn-secondary btn-full mb-4 cursor-pointer">
                      <span>📸 Télécharger une image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden-input"
                      />
                    </label>
                    {barcodeError && (
                      <div className="barcode-error-msg">
                        ⚠️ {barcodeError}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleBarcodeScan} className="scan-form">
                    <div className="form-group">
                      <label htmlFor="barcode">Saisie manuelle</label>
                      <div className="input-with-icon">
                        <span className="input-icon">🔢</span>
                        <input
                          type="text"
                          id="barcode"
                          className="input"
                          value={barcode}
                          onChange={(e) => setBarcode(e.target.value)}
                          placeholder="Ex: 3033491579714"
                          required
                        />
                      </div>
                      {isUploading && <small className="text-primary animate-pulse">Extraction du code en cours...</small>}
                    </div>

                    <div className="disease-selector-inline">
                      <div className="inline-header">
                        <h4>🩺 Votre Profil Santé</h4>
                        <p>Sélectionnez vos conditions :</p>
                      </div>
                      <div className="disease-grid-mini">
                        {DISEASES.map(disease => (
                          <button
                            type="button"
                            key={disease.id}
                            className={`disease-tag-mini ${selectedDiseases.includes(disease.id) ? "active" : ""}`}
                            onClick={() => {
                              setSelectedDiseases(prev =>
                                prev.includes(disease.id)
                                  ? prev.filter(id => id !== disease.id)
                                  : [...prev, disease.id]
                              );
                            }}
                          >
                            {disease.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-full"
                      disabled={isScanning || selectedDiseases.length === 0}
                    >
                      {isScanning ? (
                        <>
                          <span className="spinner"></span> Analyse...
                        </>
                      ) : (
                        <><span>🔍</span> Analyser le produit</>
                      )}
                    </button>
                    {selectedDiseases.length === 0 && (
                      <p className="error-text mt-2" style={{ fontSize: "0.8rem", color: "var(--color-danger)" }}>
                        Veuillez d'abord sélectionner votre profil santé.
                      </p>
                    )}
                  </form>
                </div>
              )}

              {scanMethod === "manual" && (
                <div className="scan-form-wrapper">
                  <div className="scan-visual">
                    <div className="scan-icon-large gradient-accent">🩺</div>
                  </div>
                  <h2>Saisie Médicale</h2>
                  <p>Décrivez vos symptômes, leur durée et vos antécédents pour une pré-analyse médicale par notre IA.</p>

                  <form onSubmit={handleManualScan} className="scan-form">
                    <div className="form-group">
                      <label htmlFor="description">Description des symptômes</label>
                      <textarea
                        id="description"
                        className="input textarea"
                        value={manualData.description}
                        onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                        rows={5}
                        placeholder="Ex: J'ai une douleur à la poitrine et je me sens essoufflé depuis ce matin..."
                      />
                      <small>ClinicalBERT analysera votre texte pour extraire les données médicales clés.</small>
                    </div>

                    {/* Symptom selection */}
                    <div className="symptom-selector">
                      <div className="symptom-selector-header">
                        <span className="symptom-selector-icon">🩻</span>
                        <div>
                          <h4>Sélection des symptômes</h4>
                          <p>Cochez les symptômes qui correspondent à votre état — ils seront intégrés à l'analyse.</p>
                        </div>
                      </div>

                      {selectedSymptoms.length > 0 && (
                        <div className="symptom-selected-bar">
                          <span>✅ {selectedSymptoms.length} symptôme{selectedSymptoms.length > 1 ? 's' : ''} sélectionné{selectedSymptoms.length > 1 ? 's' : ''}</span>
                          <button
                            type="button"
                            className="symptom-clear-btn"
                            onClick={() => setSelectedSymptoms([])}
                          >
                            Tout effacer
                          </button>
                        </div>
                      )}

                      <div className="symptom-grid">
                        {SYMPTOMS.map((symptom) => (
                          <label
                            key={symptom}
                            className={`symptom-chip ${selectedSymptoms.includes(symptom) ? 'active' : ''}`}
                          >
                            <input
                              type="checkbox"
                              className="symptom-checkbox"
                              checked={selectedSymptoms.includes(symptom)}
                              onChange={() => {
                                setSelectedSymptoms(prev =>
                                  prev.includes(symptom)
                                    ? prev.filter(s => s !== symptom)
                                    : [...prev, symptom]
                                );
                              }}
                            />
                            <span className="symptom-chip-label">{symptom}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-full"
                      disabled={isScanning || (manualData.description.trim() === '' && selectedSymptoms.length === 0)}
                    >
                      {isScanning ? (
                        <>
                          <span className="spinner"></span> Analyse Médicale en cours...
                        </>
                      ) : (
                        <><span>🤖</span> Lancer l'analyse ClinicalBERT</>
                      )}
                    </button>
                    {manualData.description.trim() === '' && selectedSymptoms.length === 0 && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-danger)', marginTop: '0.5rem', textAlign: 'center' }}>
                        Veuillez décrire vos symptômes ou en sélectionner dans la liste.
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Usage Tips */}
            <div className="tips-grid">
              <div className="tip-card glass">
                <div className="tip-icon">✨</div>
                <div>
                  <h4>Analyse Personnalisée</h4>
                  <p>L'IA croise les ingrédients avec <strong>votre profil santé</strong>.</p>
                </div>
              </div>
              <div className="tip-card glass">
                <div className="tip-icon">🛡️</div>
                <div>
                  <h4>Fiabilité Médicale</h4>
                  <p>Détection des allergènes cachés et des additifs controversés.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Scan Result */
          <div className="result-container fade-in">
            <div className={`result-card card result-${scanResult.result.toLowerCase()}`}>
              <div className="result-header">
                {scanResult.barcode && (
                  <div className={`result-badge ${scanResult.result.toLowerCase()}`}>
                    {scanResult.result === "SAFE" && "✓ Compatible Santé"}
                    {scanResult.result === "WARNING" && "⚠ Consommation Modérée"}
                    {scanResult.result === "UNSAFE" && "✗ Produit Déconseillé"}
                  </div>
                )}
                {scanResult.barcode && (
                  <div className="result-barcode">EAN: {scanResult.barcode}</div>
                )}
              </div>

              <h2 className="result-product-name">{scanResult.productName}</h2>

              <div className="result-grid">
                <div className="result-main">
                  {scanResult.nutriScore && (
                    <div className="nutri-score-badge fade-in">
                      <div className={`nutri-grade grade-${scanResult.nutriScore.grade.toLowerCase()}`}>
                        {scanResult.nutriScore.grade}
                      </div>
                      <div className="nutri-label">
                        <h4>Nutri-Score</h4>
                        <p>Qualité Nutritionnelle</p>
                      </div>
                    </div>
                  )}
                  {scanResult.isUrgent && (
                    <div className="urgent-alert fade-in">
                      <div className="urgent-icon">🚨</div>
                      <div className="urgent-content">
                        <h4>ALERTE URGENCE MÉDICALE</h4>
                        <p>
                          {scanResult.recommendation}{" "}
                          <Link href="/patient/doctors" className="urgent-link">
                            consultez un médecin sans attendre
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="result-section recommendation-section">
                    <h3><span className="icon"></span> Avis de l'Assistant Santé</h3>
                    <div className="recommendation-box">
                      {!scanResult.isUrgent && scanResult.recommendation}
                      {scanResult.isUrgent && "Une intervention médicale immédiate est recommandée. Ne négligez pas ces symptômes."}
                    </div>
                  </div>

                  {/* Disease Probability Panel — shown only for medical analysis */}
                  {!scanResult.barcode && scanResult.diseases && scanResult.diseases.length > 0 && (
                    <div className="result-section diseases-section fade-in">
                      <h3><span className="icon">🔬</span> Probabilités Diagnostiques</h3>
                      <p className="diseases-subtitle">
                        Sur la base de vos symptômes, notre IA a calculé les probabilités suivantes :
                      </p>
                      <div className="diseases-list">
                        {scanResult.diseases.map((disease: any, index: number) => (
                          <div key={index} className="disease-item">
                            <div className="disease-header">
                              <div className="disease-name">
                                <span className="disease-icon">{disease.icon}</span>
                                <span>{disease.name}</span>
                              </div>
                              <span className="disease-pct" style={{ color: disease.color }}>
                                {disease.probability}%
                              </span>
                            </div>
                            <div className="disease-bar-bg">
                              <div
                                className="disease-bar-fill"
                                style={{
                                  width: `${disease.probability}%`,
                                  background: disease.color
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="diseases-disclaimer">
                        ⚠️ Ces probabilités sont indicatives et basées sur une correspondance de mots-clés — elles ne constituent pas un diagnostic médical.
                      </p>
                    </div>
                  )}

                  {/* Per-disease advice cards */}
                  {!scanResult.barcode && scanResult.diseases && scanResult.diseases.length > 0 && (
                    <div className="result-section advice-by-disease fade-in">
                      <h3><span className="icon">💡</span> Recommandations Personnalisées</h3>
                      <p className="diseases-subtitle">Conseils adaptés selon les pathologies les plus probables :</p>
                      <div className="advice-cards-grid">
                        {scanResult.diseases.slice(0, 2).map((disease: any, dIdx: number) => (
                          <div key={dIdx} className="advice-card" style={{ borderLeftColor: disease.color }}>
                            <div className="advice-card-header" style={{ color: disease.color }}>
                              {disease.icon} {disease.name}
                            </div>
                            <ul className="advice-card-list">
                              {disease.advice.map((tip: string, tIdx: number) => (
                                <li key={tIdx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generic advice fallback or extra tips */}
                  {(!scanResult.diseases || scanResult.diseases.length === 0) && scanResult.advice && scanResult.advice.length > 0 && (
                    <div className="result-section advice-section glass fade-in">
                      <h3><span className="icon">💡</span> Conseils recommandés</h3>
                      <ul className="advice-list">
                        {scanResult.advice.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {scanResult.dangerousIngredients && scanResult.dangerousIngredients.length > 0 && (
                    <div className="result-section danger-section">
                      <h3><span className="icon">⚠️</span> Points de Vigilance</h3>
                      <ul className="danger-list">
                        {scanResult.dangerousIngredients.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {scanResult.riskFactors && scanResult.riskFactors.length > 0 && (
                    <div className="result-section">
                      <h3><span className="icon">🛡️</span> Facteurs de Risque Détectés</h3>
                      <div className="ingredients-list">
                        {scanResult.riskFactors.map((risk: string, index: number) => (
                          <span key={index} className="ingredient-tag dangerous">
                            {risk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="result-actions">
                    <button onClick={resetScan} className="btn btn-primary btn-lg">
                      {scanResult.barcode ? "Analyser un autre produit" : "Nouvelle analyse médicale"}
                    </button>
                    <Link href="/patient/reports" className="btn btn-secondary btn-lg">
                      Signaler un problème
                    </Link>
                  </div>
                </div>

                <div className="result-sidebar">
                  {scanResult.barcode ? (
                    <>
                      <div className="result-section">
                        <h3>Ingrédients Détectés</h3>
                        <div className="ingredients-list">
                          {scanResult.ingredients.map((ingredient: string, index: number) => (
                            <span
                              key={index}
                              className={`ingredient-tag ${scanResult.dangerousIngredients.some((d: string) =>
                                d.toLowerCase().includes(ingredient.toLowerCase())
                              )
                                ? "dangerous"
                                : ""
                                }`}
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>

                      {scanResult.nutritionalValues && (
                        <div className="result-section">
                          <h3>Valeurs Nutritionnelles</h3>
                          <div className="nutri-details">
                            <div className="nutri-item">
                              <label>Énergie</label>
                              <span>{scanResult.nutritionalValues.energy} kcal</span>
                            </div>
                            <div className="nutri-item">
                              <label>Sucres</label>
                              <span>{scanResult.nutritionalValues.sugar} g</span>
                            </div>
                            <div className="nutri-item">
                              <label>Gras Sat.</label>
                              <span>{scanResult.nutritionalValues.saturated_fat} g</span>
                            </div>
                            <div className="nutri-item">
                              <label>Sel</label>
                              <span>{scanResult.nutritionalValues.salt} g</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </>
                  ) : (
                    <>
                      <div className="result-section">
                        <h3>Symptômes Extraits</h3>
                        <div className="ingredients-list">
                          {scanResult.symptoms && scanResult.symptoms.length > 0 ? (
                            scanResult.symptoms.map((symptom: string, index: number) => (
                              <span key={index} className="ingredient-tag">
                                {symptom}
                              </span>
                            ))
                          ) : (
                            <div className="insufficient-info">
                              <span className="text-muted">Aucun symptôme spécifique détecté</span>
                              <p className="info-text">Le texte fourni ne contient pas suffisamment d’informations médicales pour extraire des symptômes précis.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="medical-info-card glass">
                        <div className="info-item">
                          <span className="label">⏳ Durée :</span>
                          <span className="value">{scanResult.duration}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">📊 Sévérité :</span>
                          <span className={`value severity-${scanResult.severity?.toLowerCase()}`}>
                            {scanResult.severity === "SEVERE" ? "Sévère" : scanResult.severity === "MODERATE" ? "Modérée" : scanResult.severity === "UNKNOWN" ? "Non déterminée" : "Légère"}
                          </span>
                        </div>
                      </div>

                      <div className="disclaimer-box">
                        <small>
                          ⚠️ <strong>Avertissement :</strong> Cette analyse est générée par une IA (ClinicalBERT) et ne remplace pas un diagnostic médical professionnel. En cas de doute, consultez un médecin.
                        </small>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


        <style jsx>{`
        /* ========================================
           LAYOUT & STRUCTURE
           ======================================== */
        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg-secondary);
        }

        .main-content {
          margin-left: 280px;
          padding: 2rem;
          width: calc(100% - 280px);
          max-width: 1200px;
          margin-right: auto;
        }

        /* ========================================
           PAGE HEADER
           ======================================== */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .page-header h1 {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .page-header p {
          color: var(--color-text-secondary);
          margin: 0;
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          line-height: 1.5;
          max-width: 600px;
        }

        /* ========================================
           SCAN CONTAINER
           ======================================== */
        .scan-container {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ========================================
           METHOD SELECTOR — ENHANCED
           ======================================== */
        .method-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .method-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: 2rem 1.5rem;
          background: var(--glass-bg);
          border: 2px solid var(--glass-border);
          border-radius: var(--radius-xl);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .method-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 0;
        }

        .method-btn > * {
          position: relative;
          z-index: 1;
        }

        .method-btn:hover {
          border-color: var(--color-primary);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .method-btn.active {
          border-color: var(--color-primary);
          background: hsla(210, 100%, 56%, 0.05);
          box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.15);
        }

        .method-btn.active::before {
          opacity: 0.03;
        }

        .method-icon {
          font-size: 2.5rem;
          background: var(--color-bg-secondary);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .method-btn:hover .method-icon {
          transform: scale(1.1);
        }

        .method-btn.active .method-icon {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          transform: scale(1.05);
        }

        .method-info {
          flex: 1;
        }

        .method-info h3 {
          font-size: 1.125rem;
          margin-bottom: 0.35rem;
          color: var(--color-text);
          font-weight: 700;
        }

        .method-info p {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        /* ========================================
           SCAN CONTENT CARD
           ======================================== */
        .scan-content {
          padding: 2.5rem;
          margin-bottom: 2rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-2xl);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .scan-form-wrapper {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .scan-visual {
          margin-bottom: 1.5rem;
        }

        .scan-icon-large {
          width: 90px;
          height: 90px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          line-height: 1;
          color: white;
          border-radius: var(--radius-2xl);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }

        .gradient-primary {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        }

        .gradient-accent {
          background: linear-gradient(135deg, hsl(280, 85%, 60%), hsl(320, 85%, 60%));
        }

        .scan-form-wrapper h2 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 0.75rem;
          color: var(--color-text);
          font-weight: 700;
        }

        .scan-form-wrapper > p {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        /* ========================================
           FORM STYLES
           ======================================== */
        .scan-form {
          text-align: left;
          background: var(--color-bg-secondary);
          padding: 2rem;
          border-radius: var(--radius-xl);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group:last-of-type {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.6rem;
          color: var(--color-text);
          font-size: 0.95rem;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          opacity: 0.6;
          pointer-events: none;
        }

        .input-with-icon .input {
          padding-left: 3rem;
        }

        .input, .textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          color: var(--color-text);
          font-size: 0.95rem;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .input:focus, .textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.12);
        }

        .textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .form-group small {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }

        .btn-full {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          padding: 1rem 1.5rem;
        }

        .btn-full:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ========================================
           SYMPTOM SELECTOR
           ======================================== */
        .symptom-selector {
          margin-bottom: 1.75rem;
          background: var(--color-bg);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .symptom-selector-header {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          padding: 1.125rem 1.25rem;
          background: hsla(210, 100%, 56%, 0.06);
          border-bottom: 1px solid var(--color-border);
        }

        .symptom-selector-icon {
          font-size: 1.6rem;
          flex-shrink: 0;
          line-height: 1;
          margin-top: 0.1rem;
        }

        .symptom-selector-header h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 0.2rem;
        }

        .symptom-selector-header p {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.45;
        }

        .symptom-selected-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1.25rem;
          background: hsla(142, 70%, 50%, 0.1);
          border-bottom: 1px solid hsla(142, 70%, 50%, 0.2);
          font-size: 0.82rem;
          color: hsl(142, 60%, 38%);
          font-weight: 600;
          gap: 0.75rem;
        }

        .symptom-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-danger, #e53e3e);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: background 0.15s ease;
          white-space: nowrap;
        }

        .symptom-clear-btn:hover {
          background: hsla(0, 80%, 55%, 0.1);
        }

        .symptom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 0.55rem;
          padding: 1rem 1.25rem;
        }

        .symptom-chip {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.525rem 0.75rem;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--color-border);
          background: var(--color-bg-secondary);
          cursor: pointer;
          transition: all 0.18s ease;
          user-select: none;
        }

        .symptom-chip:hover {
          border-color: var(--color-primary);
          background: hsla(210, 100%, 56%, 0.06);
          transform: translateY(-1px);
        }

        .symptom-chip.active {
          border-color: var(--color-primary);
          background: hsla(210, 100%, 56%, 0.12);
          box-shadow: 0 0 0 2px hsla(210, 100%, 56%, 0.18);
        }

        .symptom-checkbox {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          accent-color: var(--color-primary);
          cursor: pointer;
        }

        .symptom-chip-label {
          font-size: 0.815rem;
          color: var(--color-text);
          line-height: 1.3;
          font-weight: 500;
        }

        .symptom-chip.active .symptom-chip-label {
          color: var(--color-primary);
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .symptom-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 0.45rem;
            padding: 0.75rem 0.875rem;
          }
          .symptom-chip {
            padding: 0.45rem 0.6rem;
          }
          .symptom-chip-label {
            font-size: 0.78rem;
          }
        }

        /* ========================================
           TIPS GRID
           ======================================== */
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .tip-card {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          transition: transform 0.2s ease;
        }

        .tip-card:hover {
          transform: translateY(-2px);
        }

        .tip-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .tip-card h4 {
          font-size: 0.95rem;
          margin-bottom: 0.4rem;
          color: var(--color-text);
          font-weight: 700;
        }

        .tip-card p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        /* ========================================
           RESULT CONTAINER
           ======================================== */
        .result-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .result-card {
          padding: 2.5rem;
          background: var(--glass-bg);
          border-radius: var(--radius-2xl);
          box-shadow: 0 4px 25px rgba(0,0,0,0.08);
          border: 1px solid var(--glass-border);
        }

        .result-card.result-safe {
          border-top: 6px solid var(--color-success);
        }

        .result-card.result-warning {
          border-top: 6px solid var(--color-warning);
        }

        .result-card.result-unsafe {
          border-top: 6px solid var(--color-danger);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .result-badge {
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .result-badge.safe {
          background: hsla(142, 71%, 45%, 0.12);
          color: var(--color-success);
        }

        .result-badge.warning {
          background: hsla(38, 92%, 50%, 0.12);
          color: var(--color-warning);
        }

        .result-badge.unsafe {
          background: hsla(0, 84%, 60%, 0.12);
          color: var(--color-danger);
        }

        .result-barcode {
          font-family: 'Courier New', monospace;
          background: var(--color-bg-secondary);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .result-product-name {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          margin-bottom: 2rem;
          line-height: 1.2;
          color: var(--color-text);
          font-weight: 800;
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }

        .result-section {
          margin-bottom: 1.75rem;
        }

        .result-section:last-child {
          margin-bottom: 0;
        }

        .result-section h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text);
          font-weight: 700;
        }

        .result-section .icon {
          font-size: 1.25rem;
        }

        .recommendation-box {
          padding: 1.5rem;
          background: linear-gradient(135deg, hsla(210, 100%, 56%, 0.04), hsla(280, 85%, 60%, 0.04));
          border-radius: var(--radius-lg);
          font-size: 1rem;
          line-height: 1.7;
          border-left: 4px solid var(--color-primary);
          color: var(--color-text);
        }

        .danger-section {
          background: hsla(0, 84%, 60%, 0.05);
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid hsla(0, 84%, 60%, 0.2);
        }

        .danger-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .danger-list li {
          padding: 0.6rem 0;
          color: var(--color-danger);
          font-weight: 600;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .danger-list li::before {
          content: "⚠️";
          flex-shrink: 0;
        }

        .ingredients-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .ingredient-tag {
          padding: 0.4rem 0.9rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          border: 1px solid var(--color-border);
        }

        .ingredient-tag.dangerous {
          background: hsla(0, 84%, 60%, 0.12);
          color: var(--color-danger);
          font-weight: 700;
          border-color: hsla(0, 84%, 60%, 0.3);
        }

        .nutri-score-placeholder {
          text-align: center;
          padding: 1.5rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        .placeholder-label {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .placeholder-value {
          font-family: var(--font-display);
          font-size: 4rem;
          font-weight: 800;
          color: var(--color-warning);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .nutri-score-placeholder small {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }

        .result-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .result-actions .btn {
          flex: 1;
          min-width: 200px;
        }

        /* ========================================
           ANIMATIONS
           ======================================== */
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ========================================
           RESPONSIVE DESIGN
           ======================================== */
        @media (max-width: 1024px) {
          .main-content {
            margin-left: 0;
            width: 100%;
            padding: 5.5rem 1.5rem 2rem 1.5rem;
          }

          .page-header h1 {
            font-size: 1.75rem;
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

          .result-sidebar {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .method-selector {
            grid-template-columns: 1fr;
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }

          .scan-content {
            padding: 1.5rem;
          }

          .result-product-name {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
          }

          .scan-form {
            padding: 1.5rem;
          }

          .result-card {
            padding: 1.5rem;
          }

          .result-actions {
            flex-direction: column;
          }

          .result-actions .btn {
            width: 100%;
            min-width: 0;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 1rem;
          }

          .method-btn {
            padding: 1rem;
          }

          .method-icon {
            width: 52px;
            height: 52px;
            font-size: 2rem;
          }

          .scan-icon-large {
            width: 70px;
            height: 70px;
            font-size: 2.5rem;
          }

          .placeholder-value {
            font-size: 3rem;
          }
        }

        /* ========================================
           MEDICAL SPECIFIC STYLES
           ======================================== */
        .urgent-alert {
          background: hsla(0, 84%, 60%, 0.1);
          border: 2px solid var(--color-danger);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          gap: 1.25rem;
          margin-bottom: 2rem;
          border-left: 8px solid var(--color-danger);
        }

        .urgent-icon {
          font-size: 2.5rem;
          display: flex;
          align-items: center;
        }

        .urgent-content h4 {
          color: var(--color-danger);
          font-weight: 800;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          text-transform: uppercase;
        }

        .urgent-content p {
          color: var(--color-text);
          font-weight: 500;
          line-height: 1.6;
          margin: 0;
        }

        .urgent-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: white;
          background: var(--color-danger);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .urgent-link:hover {
          background: white;
          color: var(--color-danger);
          transform: translateY(-1px);
        }

        .medical-info-card {
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .info-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-item .label {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          font-weight: 600;
        }

        .info-item .value {
          font-weight: 700;
          color: var(--color-text);
        }

        .value.severity-severe { color: var(--color-danger); }
        .value.severity-moderate { color: var(--color-warning); }
        .value.severity-mild { color: var(--color-success); }
        .value.severity-unknown { color: var(--color-text-secondary); }

        .disclaimer-box {
          padding: 1rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          border: 1px dashed var(--color-border);
          line-height: 1.5;
        }

        .text-muted {
          color: var(--color-text-secondary);
          font-style: italic;
          font-size: 0.9rem;
        }

        .advice-section {
          margin-top: 2rem;
          padding: 1.5rem;
          border-left: 4px solid var(--color-primary);
        }

        .advice-list {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .advice-list li {
          font-size: 0.95rem;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .advice-list li::before {
          content: "•";
          color: var(--color-primary);
          font-weight: bold;
        }

        .insufficient-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem 0;
        }

        .info-text {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        /* Disease Selector */
        .disease-selector {
          margin-bottom: 2rem;
          padding: 1.5rem;
        }

        .disease-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .disease-tag {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--color-text);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .disease-tag:hover {
          border-color: var(--color-primary);
          background: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.05);
        }

        .disease-tag.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.3);
        }

        .tag-status {
          font-weight: 800;
          opacity: 0.7;
          margin-left: 0.5rem;
        }

        .selection-hint {
          margin-top: 1rem;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }

        /* Image Preview */
        .image-preview-container {
          position: relative;
          width: 100%;
          max-width: 300px;
          aspect-ratio: 1/1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--color-bg-secondary);
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 2px solid var(--color-primary);
        }

        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .btn-remove-image {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(4px);
        }

        .barcode-error-msg {
          margin-top: 0.75rem;
          padding: 0.75rem 1rem;
          background: hsla(38, 92%, 50%, 0.1);
          border: 1px solid hsla(38, 92%, 50%, 0.3);
          border-radius: var(--radius-md);
          color: var(--color-warning);
          font-size: 0.87rem;
          font-weight: 500;
          line-height: 1.5;
          text-align: left;
        }

        .hidden-input {
          display: none;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        .disease-selector-inline {
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(var(--color-bg-secondary-rgb), 0.5);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
        }

        .inline-header h4 {
          margin: 0;
          font-size: 1rem;
          color: var(--color-text);
        }

        .inline-header p {
          margin: 0.2rem 0 0.8rem 0;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .disease-grid-mini {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .disease-tag-mini {
          padding: 0.4rem 0.8rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          color: var(--color-text);
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .disease-tag-mini:hover {
          border-color: var(--color-primary);
        }

        .disease-tag-mini.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        /* Nutri-Score Styling */
        .nutri-score-badge {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
          padding: 0.8rem 1.2rem;
          background: rgba(var(--color-bg-secondary-rgb), 0.5);
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-border);
        }

        .nutri-grade {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .grade-a { background: #038141; }
        .grade-b { background: #85bb2f; }
        .grade-c { background: #fecb02; color: #333; text-shadow: none; }
        .grade-d { background: #ee8100; }
        .grade-e { background: #e63e11; }

        .nutri-label h4 {
          margin: 0;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nutri-label p {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .nutri-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.8rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--glass-border);
        }

        .nutri-item {
          display: flex;
          flex-direction: column;
        }

        .nutri-item label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .nutri-item span {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .mb-4 { margin-bottom: 1rem; }
        .mt-2 { margin-top: 0.5rem; }

        /* ========================================
           DISEASE PROBABILITY & ADVICE CARDS
           ======================================== */
        .diseases-section {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .diseases-subtitle {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .diseases-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .disease-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .disease-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }

        .disease-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text);
        }

        .disease-icon {
          font-size: 1.25rem;
        }

        .disease-pct {
          font-weight: 800;
          font-size: 1.1rem;
        }

        .disease-bar-bg {
          width: 100%;
          height: 8px;
          background: rgba(var(--color-text-rgb), 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .disease-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .diseases-disclaimer {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          font-style: italic;
          text-align: center;
        }

        .advice-by-disease {
          margin-bottom: 2rem;
        }

        .advice-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .advice-card {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          border-left: 4px solid var(--color-primary);
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .advice-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        .advice-card-header {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .advice-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .advice-card-list li {
          position: relative;
          padding-left: 1.5rem;
          font-size: 0.95rem;
          color: var(--color-text);
          line-height: 1.5;
        }

        .advice-card-list li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: inherit;
          opacity: 0.6;
          font-weight: bold;
        }
      `}</style>
      </main>
    </div>
  );
}

