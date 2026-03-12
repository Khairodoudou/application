import { NextResponse } from "next/server";

// ─────────────────────────────────────────────
//  Disease knowledge base
// ─────────────────────────────────────────────
interface DiseaseRule {
  name: string;
  nameFr: string;
  icon: string;
  keywords: string[];
  advice: string[];
  color: string; // for UI
}

const DISEASE_RULES: DiseaseRule[] = [
  // ── MALADIES RESPIRATOIRES ET ORL ──
  {
    name: "flu",
    nameFr: "Grippe / Syndrome grippal",
    icon: "🤧",
    color: "#f59e0b",
    keywords: ["fièvre", "fever", "toux", "cough", "fatigue", "courbatures", "corps", "frissons", "chills", "nez", "nose", "rhume", "courbature"],
    advice: [
      "Reposez-vous autant que possible et restez bien hydraté(e).",
      "Prenez du paracétamol ou de l'ibuprofène (si non contre-indiqué) pour réduire la fièvre.",
      "Aérez régulièrement votre chambre et gardez une température fraîche.",
      "Si la fièvre dépasse 39.5°C ou persiste plus de 3 jours, consultez un médecin."
    ]
  },
  {
    name: "angina",
    nameFr: "Angine / Pharyngite",
    icon: "🫁",
    color: "#ef4444",
    keywords: ["gorge", "throat", "avaler", "swallow", "amygdale", "tonsil", "mal de gorge", "sore throat", "douleur gorge", "enrouement", "hoarse"],
    advice: [
      "Faites des gargarismes à l'eau tiède salée plusieurs fois par jour.",
      "Sucez des pastilles antiseptiques pour la gorge.",
      "Si vous avez de la fièvre ou des plaques blanches, consultez un médecin (des antibiotiques peuvent être nécessaires)."
    ]
  },
  {
    name: "covid",
    nameFr: "COVID-19",
    icon: "🦠",
    color: "#0ea5e9",
    keywords: ["goût", "taste", "odorat", "smell", "perte goût", "perte odorat", "covid", "corona", "essoufflement", "fatigue intense", "fièvre", "toux sèche"],
    advice: [
      "Isolez-vous pour protéger les autres et envisagez de faire un test.",
      "Surveillez attentivement votre respiration et votre taux d'oxygène si possible.",
      "Reposez-vous et hydratez-vous abondamment.",
      "Appelez immédiatement les urgences (15/112) en cas de détresse respiratoire."
    ]
  },
  {
    name: "asthma",
    nameFr: "Asthme / Crise d'asthme",
    icon: "💨",
    color: "#f97316",
    keywords: ["asthme", "asthma", "respirer", "breathing", "sifflement", "wheezing", "bronche", "inhalateur", "inhaler", "oppression", "essoufflement"],
    advice: [
      "Utilisez votre bronchodilatateur à action rapide (ex: Ventoline) dès l'apparition des symptômes.",
      "Éloignez-vous des déclencheurs évidents (poussière, fumée, animaux).",
      "Asseyez-vous droit et essayez de vous calmer.",
      "Si la crise ne passe pas après 2 bouffées, appelez immédiatement les urgences."
    ]
  },
  {
    name: "bronchitis",
    nameFr: "Bronchite",
    icon: "🫁",
    color: "#d946ef",
    keywords: ["toux", "cough", "crachat", "expectoration", "mucus", "glaires", "poitrine", "bronchite", "respiratoire", "gêne respiratoire"],
    advice: [
      "Buvez beaucoup d'eau chaude (tisanes, bouillon) pour fluidifier les sécrétions.",
      "Évitez formellement le tabac et les environnements enfumés ou pollués.",
      "Reposez-vous.",
      "Consultez un médecin si la toux persiste plus de 3 semaines ou si le mucus est teinté de sang."
    ]
  },
  {
    name: "sinusitis",
    nameFr: "Sinusite",
    icon: "👃",
    color: "#a855f7",
    keywords: ["sinus", "nez bouché", "front", "visage", "douleur faciale", "face pain", "mouchage", "congestion", "pression visage"],
    advice: [
      "Faites des lavages de nez (sérum physiologique ou eau de mer).",
      "Faites des inhalations de vapeur chaude pour dégager les sinus.",
      "Prenez des antalgiques pour soulager la douleur.",
      "Consultez un médecin si la douleur faciale est intense et s'accompagne d'une forte fièvre."
    ]
  },

  // ── MALADIES DIGESTIVES ──
  {
    name: "gastroenteritis",
    nameFr: "Gastro-entérite",
    icon: "🤢",
    color: "#10b981",
    keywords: ["nausée", "nausea", "vomissement", "vomiting", "diarrhée", "diarrhea", "ventre", "abdomen", "estomac", "stomach", "crampe", "gastro"],
    advice: [
      "Hydratez-vous par petites gorgées fréquentes avec de l'eau ou des solutés de réhydratation (SRO).",
      "Adoptez le régime BRAT (bananes, riz, compote de pommes, pain grillé).",
      "Évitez les laitages, l'alcool, les aliments très gras ou très sucrés.",
      "En cas d'impossibilité totale de boire sans vomir ou de sang dans les selles, consultez vite."
    ]
  },
  {
    name: "reflux",
    nameFr: "Reflux Gastrique (RGO) / Brûlure d'estomac",
    icon: "🔥",
    color: "#fb923c",
    keywords: ["brûlure", "heartburn", "acidité", "acid", "remontée", "reflux", "estomac", "digestion", "aigreur", "rgo"],
    advice: [
      "Évitez les repas trop copieux, gras, épicés, ainsi que l'alcool et le café.",
      "Ne vous allongez pas immédiatement après avoir mangé (attendez au moins 2 heures).",
      "Surélevez la tête de votre lit pendant la nuit.",
      "Vous pouvez utiliser un pansement gastrique vendu en pharmacie."
    ]
  },
  {
    name: "appendicitis",
    nameFr: "Appendicite (Suspicion)",
    icon: "🏥",
    color: "#b91c1c",
    keywords: ["douleur fosse iliaque droite", "douleur bas droite", "ventre bas droite", "appendice", "douleur brutale ventre", "nausée ventre", "jambe pliée"],
    advice: [
      "⚠️ ALERTE : Une douleur vive et soudaine en bas à droite du ventre est une urgence absolue.",
      "Ne mangez rien et ne buvez rien.",
      "Ne prenez AUCUN antalgique (cela masquerait les symptômes).",
      "Rendez-vous immédiatement aux urgences les plus proches."
    ]
  },
  {
    name: "constipation",
    nameFr: "Constipation",
    icon: "🚻",
    color: "#8b5cf6",
    keywords: ["constipation", "bloqué", "selles", "aller aux toilettes", "ventre gonflé", "ballonnement", "difficulté selles"],
    advice: [
      "Augmentez votre consommation d'eau (au moins 1.5L à 2L par jour).",
      "Mangez plus de fibres : fruits frais, légumes verts, céréales complètes, pruneaux.",
      "Pratiquez une activité physique (la marche active stimule le transit).",
      "Si la constipation persiste plus d'une semaine et devient douloureuse, consultez."
    ]
  },

  // ── MALADIES NEUROLOGIQUES ET PSYCHOLOGIQUES ──
  {
    name: "migraine",
    nameFr: "Migraine / Céphalée forte",
    icon: "🧠",
    color: "#8b5cf6",
    keywords: ["maux de tête", "headache", "migraine", "tête", "pulsation", "throbbing", "lumière", "light sensitivity", "visuelle", "yeux", "aura"],
    advice: [
      "Isolez-vous dans une pièce sombre, calme et aérez la chambre.",
      "Appliquez du froid sur votre front ou vos tempes.",
      "Prenez votre traitement antalgique dès le début de la crise.",
      "Hydratez-vous bien."
    ]
  },
  {
    name: "anxiety",
    nameFr: "Crise d'Anxiété / Attaque de panique",
    icon: "😰",
    color: "#6366f1",
    keywords: ["anxiété", "anxiety", "stress", "angoisse", "panique", "panic", "palpitation", "nerveux", "inquiet", "insomnie", "peur", "tremblement"],
    advice: [
      "Concentrez-vous sur votre respiration : inspirez profondément par le nez (4s), retenez (4s) et expirez lentement par la bouche (6s).",
      "Ancrez-vous dans le présent : nommez 5 objets que vous voyez, 4 que vous pouvez toucher, 3 que vous entendez.",
      "Parlez à une personne bienveillante.",
      "Si ces attaques sont fréquentes, un suivi en thérapie cognitivo-comportementale (TCC) est très efficace."
    ]
  },
  {
    name: "depression",
    nameFr: "Symptômes Dépressifs",
    icon: "🌧️",
    color: "#475569",
    keywords: ["triste", "sad", "dépression", "plus envie", "pleur", "idées noires", "fatigue mentale", "désespoir", "déprimé", "sombre"],
    advice: [
      "Parlez de ce que vous ressentez à un proche de confiance ou à votre médecin généraliste.",
      "Si vous avez des pensées sombres ou suicidaires, appelez immédiatement un numéro d'urgence psychiatrique ou d'écoute (comme le 3114 en France).",
      "Ne restez pas seul(e) face à cette souffrance, c'est une vraie maladie qui se soigne très bien."
    ]
  },
  {
    name: "stroke",
    nameFr: "AVC (Accident Vasculaire Cérébral)",
    icon: "⚠️",
    color: "#991b1b",
    keywords: ["paralysie", "visage affaissé", "bras lourd", "difficulté parler", "stroke", "avc", "confusion soudaine", "perte vision", "engourdissement soudain", "moitié corps"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE. APPELEZ LES SECOURS (15, 112 ou 911) INSTANTANÉMENT.",
      "Notez l'heure exacte d'apparition des symptômes.",
      "Allongez la personne et ne lui donnez RIEN à manger ni à boire.",
      "Chaque minute compte pour sauver les neurones."
    ]
  },

  // ── MALADIES CARDIOVASCULAIRES ──
  {
    name: "hypertension",
    nameFr: "Poussée Hypertensive",
    icon: "❤️",
    color: "#dc2626",
    keywords: ["tension", "blood pressure", "bourdonnement", "oreilles", "vision trouble", "mouches volantes", "saignement nez", "rouge", "hypertension"],
    advice: [
      "Asseyez-vous ou allongez-vous au calme.",
      "Reprenez votre tension après 10 minutes de repos complet.",
      "Si vous prenez un traitement antihypertenseur, vérifiez que vous ne l'avez pas oublié.",
      "Si la tension reste très élevée (> 18/10) ou s'accompagne de douleur poitrine/tête, aux urgences."
    ]
  },
  {
    name: "heart_attack",
    nameFr: "Infarctus (Crise Cardiaque)",
    icon: "💔",
    color: "#7f1d1d",
    keywords: ["douleur poitrine", "chest pain", "poitrine écrasée", "bras gauche", "mâchoire", "sueur froide", "infarctus", "crise cardiaque", "heart attack"],
    advice: [
      "🔴 URGENCE VITALE. APPELEZ LE SAMU/LES SECOURS IMMEDIATEMENT.",
      "Asseyez-vous et restez le plus calme possible.",
      "Si vous n'êtes pas allergique et si un médecin au téléphone vous le confirme, mâchez une aspirine.",
      "Ne prenez pas le volant pour aller à l'hôpital vous-même."
    ]
  },

  // ── ALLERGIES ET DERMATOLOGIE ──
  {
    name: "allergy",
    nameFr: "Allergie",
    icon: "🌿",
    color: "#84cc16",
    keywords: ["allergie", "allergic", "éternuement", "sneezing", "pollen", "rhinite", "acariens", "poils", "chat", "chien", "larmoiement"],
    advice: [
      "Évitez immédiatement le contact avec l'allergène suspecté.",
      "Prenez un antihistaminique si vous en avez un habituel.",
      "Rincez vos yeux à l'eau ou au sérum physiologique.",
      "Aérez votre domicile le matin très tôt ou le soir tard pour éviter les pics de pollens."
    ]
  },
  {
    name: "anaphylaxis",
    nameFr: "Choc Anaphylactique",
    icon: "🐝",
    color: "#b91c1c",
    keywords: ["gonflement gorge", "gonflement lèvre", "étouffement", "allergie grave", "choc", "arachide", "piqûre", "gorge serrée", "oedème"],
    advice: [
      "🔴 URGENCE VITALE. APPELEZ LES SECOURS IMMEDIATEMENT.",
      "Si vous disposez d'un stylo auto-injecteur d'adrénaline (EpiPen, Anapen), utilisez-le immédiatement dans la cuisse.",
      "Allongez-vous et surélevez vos jambes (ou asseyez-vous si vous avez du mal à respirer)."
    ]
  },
  {
    name: "urticaria",
    nameFr: "Urticaire / Éruption cutanée",
    icon: "🔴",
    color: "#f43f5e",
    keywords: ["démangeaison", "itching", "urticaire", "hives", "éruption", "rash", "plaque rouge", "gratte", "bouton", "peau"],
    advice: [
      "Ne vous grattez pas pour éviter la surinfection (appliquez du froid pour soulager).",
      "Portez des vêtements amples en coton.",
      "Prenez un antihistaminique.",
      "Si les rougeurs s'accompagnent d'un gonflement du visage ou de difficultés à respirer : URGENCES."
    ]
  },
  {
    name: "eczema",
    nameFr: "Eczéma / Psoriasis",
    icon: "🧴",
    color: "#ec4899",
    keywords: ["eczéma", "eczema", "psoriasis", "peau sèche", "squames", "peau qui pèle", "rougeur plis", "sécheresse", "croûte"],
    advice: [
      "Hydratez la peau plusieurs fois par jour avec un émollient non parfumé.",
      "Prenez des douches tièdes (pas trop chaudes) et courtes.",
      "Utilisez des savons sans savon (surgras).",
      "Évitez les vêtements en laine directement sur la peau (préférez le coton)."
    ]
  },
  {
    name: "burn",
    nameFr: "Brûlure",
    icon: "🔥",
    color: "#ea580c",
    keywords: ["brûlure", "brûlé", "burn", "feu", "eau bouillante", "chaleur", "cloque", "coup de soleil"],
    advice: [
      "Refroidissez IMMÉDIATEMENT avec de l'eau tempérée (15°C) à 15 cm de la brûlure, pendant au moins 15 minutes.",
      "Ne percez JAMAIS les cloques (risque d'infection).",
      "Si la zone est plus grande que la paume de la main, ou située sur le visage, les mains, ou les organes génitaux, allez aux urgences.",
      "N'appliquez pas de gras, beurre ou dentifrice sur une brûlure fraîche."
    ]
  },

  // ── MALADIES METABOLIQUES ET CHRONIQUES ──
  {
    name: "diabetes_symptoms",
    nameFr: "Symptômes du Diabète",
    icon: "🩸",
    color: "#eab308",
    keywords: ["soif", "thirst", "uriner", "urination", "polyurie", "polydipsie", "diabète", "diabetes", "glycémie", "sucre", "amaigrissement inexpliqué", "faim constante"],
    advice: [
      "Faites mesurer votre glycémie capillaire si vous avez accès à un lecteur.",
      "Hydratez-vous avec de l'eau (strictement aucun soda ni boisson sucrée).",
      "Consultez rapidement un médecin pour faire une prise de sang à jeun.",
      "En cas d'odeur d'acétone dans l'haleine, de vomissements ou de confusion, rendez-vous aux urgences."
    ]
  },
  {
    name: "hypoglycemia",
    nameFr: "Hypoglycémie",
    icon: "📉",
    color: "#3b82f6",
    keywords: ["tremblement", "sueur froide", "hypoglycémie", "malaise", "faiblesse soudaine", "faim intense", "palpitation", "sucre", "tourne"],
    advice: [
      "Mangez immédiatement 15g de sucres rapides (ex: 3 morceaux de sucre, un jus de fruit, du soda classique).",
      "Asseyez-vous et attendez 15 minutes pour que le sucre fasse effet.",
      "Prenez ensuite un sucre lent (un morceau de pain, un biscuit) pour stabiliser.",
      "Si la personne perd connaissance, ne lui mettez rien dans la bouche et appelez les secours."
    ]
  },
  {
    name: "hypothyroidism",
    nameFr: "Hypothyroïdie (Suspicion)",
    icon: "🦋",
    color: "#8b5cf6",
    keywords: ["frileux", "froid", "prise de poids", "fatigue chronique", "thyroïde", "perte cheveux", "constipation chronique", "ralentissement", "déprime inexpliquée"],
    advice: [
      "Ces symptômes chroniques nécessitent un bilan sanguin (dosage de la TSH).",
      "Consultez votre médecin généraliste ou un endocrinologue.",
      "Maintenez un mode de vie sain et ne prenez pas de suppléments iodés sans avis médical."
    ]
  },

  // ── MALADIES URO-NEPHROLOGIQUES & GYNECO ──
  {
    name: "uti",
    nameFr: "Infection Urinaire (Cystite)",
    icon: "🚽",
    color: "#f43f5e",
    keywords: ["uriner souvent", "brule", "sang", "urine", "cystite", "bas ventre", "pesanteur", "brûlure pipi", "infection urinaire", "uti"],
    advice: [
      "Buvez BEAUCOUP d'eau (au moins 2 litres) pour rincer la vessie.",
      "Le jus de canneberge (cranberry) aide à empêcher les bactéries d'adhérer.",
      "Uriner toujours après les rapports sexuels.",
      "Si la fièvre apparaît ou que vous avez mal au dos (reins), consultez un médecin dans les 24h (risque de pyélonéphrite)."
    ]
  },
  {
    name: "kidney_stones",
    nameFr: "Colique Néphrétique (Calculs)",
    icon: "🪨",
    color: "#eab308",
    keywords: ["douleur dos", "flanc", "douleur rein", "atroce", "irradie", "calcul", "pierre rein", "colique", "rein", "sang urine"],
    advice: [
      "🔴 C'est l'une des douleurs les plus intenses. Rendez-vous aux urgences ou consultez un médecin pour avoir des antalgiques forts.",
      "RESTREIGNEZ temporairement votre apport en boisson pendant la crise très douloureuse (pour ne pas augmenter la pression dans le rein).",
      "Filtrez vos urines si on vous l'a conseillé, pour récupérer le calcul."
    ]
  },
  {
    name: "period_pain",
    nameFr: "Règles douloureuses / Endométriose",
    icon: "🩸",
    color: "#be185d",
    keywords: ["règles", "menstruations", "dyspareunie", "douleur cycle", "endométriose", "saignement", "crampe utérus", "ovaire", "bas ventre douleur"],
    advice: [
      "Appliquez une bouillotte chaude sur le bas-ventre.",
      "Prenez des antispasmodiques ou des AINS (Ibuprofène) dès le début des douleurs.",
      "Si les douleurs vous empêchent de vivre normalement, consultez un(e) gynécologue (dépistage endométriose)."
    ]
  },

  // ── INFECTIEUX / DIVERS ──
  {
    name: "otitis",
    nameFr: "Otite",
    icon: "👂",
    color: "#fbbf24",
    keywords: ["oreille", "ear", "douleur oreille", "audition baisse", "écoulement oreille", "otite"],
    advice: [
      "Prenez un antalgique classique (paracétamol) pour calmer la douleur.",
      "Ne mettez AUCUN liquide dans votre oreille si vous n'êtes pas certain que votre tympan est intact.",
      "Évitez l'eau dans les oreilles (utilisez des bouchons pour la douche).",
      "Consultez un médecin, les otites bactériennes nécessitent des antibiotiques."
    ]
  },
  {
    name: "conjunctivitis",
    nameFr: "Conjonctivite",
    icon: "👁️",
    color: "#fb7185",
    keywords: ["œil", "yeux", "rouge", "conjonctivite", "colle", "pus", "œil rouge", "paupière gonflée", "larme", "gratouille œil"],
    advice: [
      "Lavez-vous les mains très fréquemment (c'est souvent très contagieux).",
      "Nettoyez l'œil avec des compresses stériles et du sérum physiologique (toujours de l'intérieur vers l'extérieur).",
      "Ne partagez pas vos serviettes de toilette.",
      "Changez de coussin et ne portez pas de lentilles de contact pendant l'infection."
    ]
  },
  {
    name: "dental_pain",
    nameFr: "Rage de dents / Carie",
    icon: "🦷",
    color: "#f1f5f9",
    keywords: ["dent", "tooth", "mâchoire ache", "carie", "abcès", "gencive", "douleur dentaire", "froid", "chaud"],
    advice: [
      "Prenez du paracétamol ou de l'ibuprofène pour calmer la douleur.",
      "Évitez le chaud, le froid, le sucre et les aliments acides.",
      "Prenez rendez-vous en URGENCE chez le dentiste.",
      "Si votre joue gonfle (abcès dentaire) ou avec fièvre, l'urgence est absolue (risque de septicémie)."
    ]
  },
  {
    name: "fever",
    nameFr: "Fièvre isolée (Non spécifique)",
    icon: "🌡️",
    color: "#fcd34d",
    keywords: ["fièvre", "fever", "chaleur", "transpire", "température", "chaud au toucher", "thermomètre", "sudation"],
    advice: [
      "Découvrez-vous et aérez la pièce (gardez-la autour de 19°C).",
      "Buvez beaucoup d'eau, plusieurs fois par heure.",
      "Prenez du paracétamol (respectez un délai de 6h entre les prises).",
      "Consultez si la fièvre persiste plus de 3-4 jours, ou immédiatement si elle s'accompagne de plaques cutanées, raideur de nuque ou maux de tête intenses."
    ]
  },

  // ── EXTENSION 1 : GASTRO-ENTÉROLOGIE & HÉPATOLOGIE AVANCÉE ──
  {
    name: "ulcer",
    nameFr: "Ulcère Gastro-duodénal",
    icon: "🔥",
    color: "#f97316",
    keywords: ["douleur estomac", "crampe estomac", "brûlure après repas", "faim douloureuse", "ulcère", "selles noires", "vomissement sang", "méléna"],
    advice: [
      "Si vous vomissez du sang ou si vos selles sont noires comme du goudron, allez aux urgences (hémorragie).",
      "Fractionnez vos repas et mangez lentement.",
      "Arrêtez l'alcool, le tabac, et NE PRENEZ PAS d'anti-inflammatoires (AINS comme l'ibuprofène).",
      "Consultez un gastro-entérologue pour un traitement et une recherche d'Helicobacter pylori."
    ]
  },
  {
    name: "hepatitis",
    nameFr: "Hépatite / Problème Hépatique",
    icon: "🦠",
    color: "#eab308",
    keywords: ["jaunisse", "ictère", "peau jaune", "yeux jaunes", "urines foncées", "foie", "douleur foie", "fatigue extrême", "hépatite"],
    advice: [
      "🔴 Toute apparition de jaunisse (yeux/peau jaunes) nécessite une consultation urgente.",
      "Cessez immédiatement toute consommation d'alcool.",
      "Ne prenez AUCUN médicament contenant du paracétamol sans avis médical (très toxique pour le foie malade).",
      "Hydratez-vous bien."
    ]
  },
  {
    name: "gallstones",
    nameFr: "Colique Hépatique (Calculs Biliaires)",
    icon: "🪨",
    color: "#ca8a04",
    keywords: ["douleur flanc droit", "douleur sous côtes droite", "irradie épaule", "vésicule", "calculs biliaires", "crise de foie"],
    advice: [
      "Appliquez de la chaleur sur le côté droit de l'abdomen.",
      "Évitez tout aliment gras pour ne pas stimuler la vésicule.",
      "Si la douleur persiste plusieurs heures ou s'associe à de la fièvre et/ou jaunisse, consultez aux urgences (risque de cholécystite)."
    ]
  },
  {
    name: "hemorrhoids",
    nameFr: "Hémorroïdes",
    icon: "🩸",
    color: "#ef4444",
    keywords: ["saignement anus", "douleur anale", "boule anus", "sang toilettes", "hémorroïdes", "gratte anus"],
    advice: [
      "Baignez la zone dans de l'eau tiède (bains de siège) plusieurs fois par jour.",
      "Luttez contre la constipation : buvez beaucoup d'eau et mangez des fibres (pruneaux, légumes).",
      "Utilisez des crèmes apaisantes vendues en pharmacie.",
      "Si le saignement est abondant ou continu, consultez un médecin pour éliminer d'autres causes."
    ]
  },
  {
    name: "crohn",
    nameFr: "Maladie de Crohn / RCH",
    icon: "⚕️",
    color: "#7c3aed",
    keywords: ["diarrhée chronique", "sang selles", "glaires selles", "douleur ventre chronique", "perte de poids", "crohn", "rectocolite"],
    advice: [
      "Gardez une alimentation pauvre en résidus (peu de fibres) lors des poussées.",
      "Hydratez-vous très régulièrement pour compenser les pertes.",
      "Prenez contact rapidement avec votre gastro-entérologue.",
      "Ne prenez pas d'anti-inflammatoires (AINS) qui pourraient aggraver la poussée."
    ]
  },
  {
    name: "celiac",
    nameFr: "Maladie Cœliaque (Intolérance au gluten)",
    icon: "🌾",
    color: "#d97706",
    keywords: ["gluten", "diarrhée", "fatigue", "anémie", "ballonnement", "coeliaque", "cœliaque", "intolérance gluten"],
    advice: [
      "Optez pour un régime strictement sans gluten à vie (évitez blé, seigle, orge).",
      "Attention aux contaminations croisées dans votre cuisine.",
      "Consultez pour un bilan sanguin (vitamines, fer) car la malabsorption est fréquente."
    ]
  },
  {
    name: "ibs",
    nameFr: "Syndrome de l'Intestin Irritable",
    icon: "🌀",
    color: "#6d28d9",
    keywords: ["ballonnement", "gaz", "alternance diarrhée", "digestion difficile", "colon irritable", "stress ventre"],
    advice: [
      "Testez le régime pauvre en FODMAPs (réduction de certains sucres fermentescibles).",
      "Pratiquez la relaxation ou le yoga, le stress aggravant fortement les symptômes.",
      "Mangez lentement et à des heures régulières.",
      "Vous pouvez essayer des probiotiques en cure d'un mois."
    ]
  },
  {
    name: "pancreatitis",
    nameFr: "Pancréatite (Suspicion)",
    icon: "🔥",
    color: "#b91c1c",
    keywords: ["douleur ventre atroce", "douleur transperce le dos", "douleur ceinture", "post alcool", "pancréas", "vomissements sévères"],
    advice: [
      "🔴 URGENCE MÉDICALE. Allez aux urgences immédiatement.",
      "Cessez toute alimentation et toute boisson en attendant les secours.",
      "Une douleur abdominale qui irradie dans le dos en coup de poignard est un signe d'alerte majeur."
    ]
  },

  // ── EXTENSION 2 : NEUROLOGIE & PSYCHIATRIE AVANCÉE ──
  {
    name: "vertigo",
    nameFr: "Vertige Positionnel (VPPB) / Ménière",
    icon: "💫",
    color: "#3b82f6",
    keywords: ["tournis", "vertige", "pièce tourne", "nausée tête", "équilibre", "mouvement tête", "oreille interne", "malaise"],
    advice: [
      "Asseyez-vous ou allongez-vous immédiatement au sol, sans bouger la tête.",
      "Fixez un point immobile devant vous.",
      "Évitez les lumières vives et le bruit.",
      "Consultez un médecin ORL ou un kinésithérapeute pour faire des manœuvres libératoires."
    ]
  },
  {
    name: "sciatica",
    nameFr: "Sciatique",
    icon: "⚡",
    color: "#ea580c",
    keywords: ["douleur fesse", "douleur jambe", "décharge électrique", "dos", "sciatique", "hernie", "engourdissement jambe"],
    advice: [
      "Ne restez pas couché toute la journée, la marche douce (selon la douleur) est bénéfique.",
      "Appliquez du chaud sur le bas du dos.",
      "Prenez un antalgique. ⚠️ Ne prenez pas d'anti-inflammatoires sans avis médical.",
      "Si vous avez des fuites urinaires ou une insensibilité dans la zone génitale (syndrome de la queue de cheval) : allez immédiatement aux urgences."
    ]
  },
  {
    name: "epilepsy",
    nameFr: "Crise d'Épilepsie",
    icon: "🧠",
    color: "#8b5cf6",
    keywords: ["convulsion", "tremblement", "perte connaissance", "absence", "évanouissement", "morsure langue", "urine culotte", "épilepsie"],
    advice: [
      "Pour un proche : Dégagez l'espace autour de la personne, mettez un coussin SOUS sa tête.",
      "Ne mettez RIEN dans sa bouche.",
      "Une fois la crise terminée, placez la personne en Position Latérale de Sécurité (PLS).",
      "Si la crise dure plus de 5 minutes ou s'il s'agit de la première crise de sa vie, appelez le SAMU (15)."
    ]
  },
  {
    name: "burnout",
    nameFr: "Burn-out / Épuisement",
    icon: "🔋",
    color: "#64748b",
    keywords: ["épuisement", "travail", "plus la force", "trop de stress", "vide", "burnout", "sommeil non réparateur", "perte motivation"],
    advice: [
      "Arrêtez-vous. Vous avez besoin d'un arrêt de travail immédiat prescrit par un médecin.",
      "Déconnectez-vous totalement de vos outils professionnels (emails, téléphone pro).",
      "Reposez-vous, dormez sans mettre de réveil.",
      "Un accompagnement psychologique est fortement recommandé pour comprendre et se reconstruire."
    ]
  },
  {
    name: "bipolar",
    nameFr: "Trouble Bipolaire (Phase aiguë)",
    icon: "🎢",
    color: "#c026d3",
    keywords: ["euphorie extrême", "dépense", "pas besoin dormir", "idées s'enchaînent", "dépression forte", "bipolaire", "maniaque"],
    advice: [
      "Si vous sentez une accélération de la pensée ou un effondrement, contactez votre psychiatre traitant sans attendre.",
      "Veillez à sanctuariser votre sommeil (le manque de sommeil déclenche les crises maniaques).",
      "Ne prenez pas de décisions financières ou professionnelles importantes dans cet état.",
      "Si des idées délirantes ou suicidaires apparaissent, faites appel aux urgences psychiatriques."
    ]
  },
  {
    name: "tinnitus",
    nameFr: "Acouphènes",
    icon: "🔔",
    color: "#f59e0b",
    keywords: ["sifflement oreille", "bourdonnement", "bruit oreille", "acouphène", "oreille siffle"],
    advice: [
      "Alerte : si les acouphènes sont apparus soudainement (surtout après un choc sonore), consultez un ORL en urgence (dans les 24h).",
      "Évitez l'alcool, la caféine et le stress qui peuvent augmenter la perception du bruit.",
      "Le soir, utilisez un bruit blanc (ventilateur, bruit d'eau coulant) pour masquer l'acouphène et faciliter le sommeil."
    ]
  },

  // ── EXTENSION 3 : DERMATOLOGIE AVANCÉE ──
  {
    name: "acne",
    nameFr: "Acné (Poussée sévère)",
    icon: "🔴",
    color: "#ef4444",
    keywords: ["bouton", "acné", "kyste", "visage", "pores", "points noirs", "inflammation visage"],
    advice: [
      "Ne percez SURTOUT PAS vos boutons (risque de cicatrices et de dissémination des bactéries).",
      "Lavez votre visage avec un nettoyant doux sans savon matin et soir.",
      "Utilisez des cosmétiques non comédogènes.",
      "Si des kystes douloureux apparaissent, consultez un dermatologue pour un traitement spécifique."
    ]
  },
  {
    name: "shingles",
    nameFr: "Zona",
    icon: "🔥",
    color: "#dc2626",
    keywords: ["brûlure peau", "plaque rouge", "vésicules", "douleur nerveuse", "côtes", "zoster", "zona", "boutons douloureux"],
    advice: [
      "Consultez URGENCE un médecin (un traitement anti-viral donné dans les 72h réduit drastiquement les douleurs nerveuses chroniques).",
      "Ne grattez pas les vésicules et ne mettez pas de crèmes dessus.",
      "Si le zona touche le visage (proche de l'œil), c'est une urgence ophtalmologique."
    ]
  },
  {
    name: "scabies",
    nameFr: "Gale",
    icon: "🪲",
    color: "#8b5cf6",
    keywords: ["gratte soir", "gratte nuit", "démangeaison nocturne", "sillons", "міжdoigts", "gale", "contagieux"],
    advice: [
      "Consultez un médecin pour confirmer le diagnostic et obtenir un traitement local (ivermectine/perméthrine).",
      "Lavez tous les vêtements, draps et serviettes portés depuis une semaine à 60°C.",
      "Traitez l'ensemble de la famille et vos contacts intimes en même temps."
    ]
  },
  {
    name: "melanoma",
    nameFr: "Suspicion Mélanome (Cancer Peau)",
    icon: "🎗️",
    color: "#1e293b",
    keywords: ["grain de beauté", "tache peau", "change de couleur", "bords irréguliers", "saigne", "mélanome"],
    advice: [
      "Appliquez la règle ABCDE : Asymétrie, Bords irréguliers, Couleur non homogène, Diamètre > 6mm, Évolution.",
      "Tout grain de beauté qui change de forme, de couleur ou qui saigne nécessite une consultation rapide.",
      "Prenez rendez-vous avec un dermatologue pour une dermoscopie."
    ]
  },
  {
    name: "psoriasis",
    nameFr: "Psoriasis (Poussée)",
    icon: "🧩",
    color: "#ec4899",
    keywords: ["plaque épaisse", "squames blanches", "coude", "genou", "cuir chevelu", "démangeaison plaque", "psoriasis"],
    advice: [
      "Hydratez très régulièrement votre peau avec des émollients.",
      "Ne grattez pas les squames (cela aggrave l'inflammation).",
      "Des expositions courtes au soleil peuvent améliorer les plaques, mais sans coup de soleil."
    ]
  },
  {
    name: "rosacea",
    nameFr: "Rosacée / Couperose",
    icon: "🍅",
    color: "#f43f5e",
    keywords: ["rougeur visage", "joues rouges", "vaisseaux", "bouton visage rouge", "chaleur visage", "rosacée", "couperose"],
    advice: [
      "Identifiez vos déclencheurs (plats épicés, alcool, chaud/froid, stress) et limitez-les.",
      "Protégez systématiquement votre visage du soleil (écran total).",
      "Évitez les gommages abrasifs sur le visage.",
      "Consultez un dermatologue (crèmes spécifiques ou laser disponibles)."
    ]
  },

  // ── EXTENSION 4 : CARDIOLOGIE & PNEUMOLOGIE AVANCÉE ──
  {
    name: "pulmonary_embolism",
    nameFr: "Embolie Pulmonaire (Suspicion)",
    icon: "🫁",
    color: "#991b1b",
    keywords: ["douleur poitrine respire", "essoufflement brutal", "crachat sang", "jambe gonflée", "phlébite", "embolie"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE. Appelez immédiatement le SAMU/15/112.",
      "Ne faites AUCUN effort physique.",
      "Si vous avez ressenti une douleur dans le mollet les jours précédents, le risque est très élevé."
    ]
  },
  {
    name: "arrhythmia",
    nameFr: "Arythmie / Fibrillation Auriculaire",
    icon: "💓",
    color: "#f43f5e",
    keywords: ["cœur bat vite", "cœur irrégulier", "palpitation forte", "cœur s'emballe", "arythmie", "fibrillation"],
    advice: [
      "Asseyez-vous et essayez de respirer calmement.",
      "Prenez vos pulsations au poignet. Si le rythme est anarchique (irrégulier), allez aux urgences ou appelez un médecin.",
      "Si cette arythmie s'accompagne d'un essoufflement ou d'une douleur poitrine, c'est une urgence grave."
    ]
  },
  {
    name: "heart_failure",
    nameFr: "Insuffisance Cardiaque (Décompensation)",
    icon: "🫀",
    color: "#1d4ed8",
    keywords: ["jambes gonflées", "œdème", "essoufflement allongé", "réveillé nuit pour respirer", "prise de poids rapide", "fatigue marcher"],
    advice: [
      "Consultez rapidement un médecin ou allez aux urgences si vous ne pouvez plus dormir couché à plat.",
      "Pesez-vous : une prise de poids rapide (2kg en 3 jours) indique une rétention d'eau.",
      "Cessez tout apport en sel immédiatement."
    ]
  },
  {
    name: "phlebitis",
    nameFr: "Phlébite (Thrombose Veineuse)",
    icon: "🦵",
    color: "#7f1d1d",
    keywords: ["mollet douloureux", "mollet rouge", "mollet chaud", "mollet gonflé", "douleur marche mollet", "phlébite", "thrombose"],
    advice: [
      "🔴 URGENCE. Une phlébite peut provoquer une embolie pulmonaire.",
      "Allez aux urgences pour faire un écho-Doppler.",
      "Surtout ne massez SURTOUT PAS votre mollet (risque de décoller le caillot de sang)."
    ]
  },
  {
    name: "pneumonia",
    nameFr: "Pneumonie",
    icon: "🌬️",
    color: "#0369a1",
    keywords: ["fièvre forte", "frissons", "toux grasse", "crachats jaunes", "vert", "douleur respirant", "pneumonie", "froid intense"],
    advice: [
      "Consultez un médecin rapidement (dans la journée) : vous aurez probablement besoin d'antibiotiques et/ou d'une radio des poumons.",
      "Reposez-vous au lit et hydratez-vous (fièvre élevée).",
      "Si vous avez du mal à respirer ou si vos lèvres ou doigts bleuissent, appelez le SAMU."
    ]
  },

  // ── EXTENSION 5 : UROLOGIE, NEPHROLOGIE & GYNECOLOGIE AVANCÉE ──
  {
    name: "pyelonephritis",
    nameFr: "Pyélonéphrite (Infection des Reins)",
    icon: "🔥",
    color: "#dc2626",
    keywords: ["fièvre urine", "douleur dos", "douleur lombaire", "frissons infection", "pyélonéphrite", "infection urinaire fièvre", "rein douleur infection"],
    advice: [
      "🔴 Une infection urinaire accompagnée de fièvre ou de douleur dans le dos au niveau d'un rein est une URGENCE MÉDICALE.",
      "Consultez un médecin le jour même ou allez aux urgences (risque de septicémie).",
      "Buvez beaucoup d'eau sans attendre."
    ]
  },
  {
    name: "prostatitis",
    nameFr: "Prostatite / Problème Prostatique",
    icon: "🚽",
    color: "#7e22ce",
    keywords: ["difficulté uriner homme", "jet faible", "brûlure prostate", "fièvre uriner homme", "douleur périnée", "prostate"],
    advice: [
      "Si vous avez de la fièvre associée, c'est une urgence médicale absolue (risque de blocage total et septicémie).",
      "Si c'est chronique (mal à uriner la nuit), consultez un urologue pour un bilan prostatique."
    ]
  },
  {
    name: "yeast_infection",
    nameFr: "Mycose Vaginale / Candidose",
    icon: "🦠",
    color: "#ec4899",
    keywords: ["démangeaison intime", "perte blanche", "lait caillé", "brule sexe", "mycose", "champignon intimité"],
    advice: [
      "Allez en pharmacie pour obtenir un traitement local (ovule et crème antifongique), souvent sans ordonnance.",
      "Ne faites PAS de douches vaginales internes (cela détruit la flore protectrice).",
      "Portez des sous-vêtements en coton et évitez les pantalons trop serrés."
    ]
  },
  {
    name: "pcos",
    nameFr: "SOPK (Syndrome Ovaires Polykystiques)",
    icon: "🥚",
    color: "#d946ef",
    keywords: ["règles irrégulières", "poils visage", "acné adulte", "chute cheveux femme", "sopk", "ovaires polykystiques"],
    advice: [
      "Consultez un(e) gynécologue ou endocrinologue pour un bilan hormonal et une échographie pelvienne.",
      "La gestion du poids (même une perte de 5%) et l'activité physique ont un effet très positif sur les symptômes.",
      "Il existe des traitements hormonaux pour réguler les cycles."
    ]
  },
  {
    name: "miscarriage",
    nameFr: "Fausse Couche (Suspicion)",
    icon: "💔",
    color: "#9f1239",
    keywords: ["enceinte saigne", "sang grossesse", "crampe grossesse", "caillots grossesse", "fausse couche"],
    advice: [
      "🔴 URGENCE : Tout saignement pendant la grossesse, peu importe le terme, justifie une consultation aux urgences gynécologiques ou la maternité.",
      "Reposez-vous et ne mettez pas de tampons.",
      "Faites-vous accompagner par un proche pour vous rendre à l'hôpital."
    ]
  },

  // ── EXTENSION 6 : RHUMATOLOGIE & ORTHOPÉDIE ──
  {
    name: "gout",
    nameFr: "Crise de Goutte",
    icon: "🦶",
    color: "#ef4444",
    keywords: ["gros orteil", "orteil rouge", "orteil chaud", "douleur pied nuit", "goutte", "acide urique"],
    advice: [
      "C'est extrêmement douloureux : ne mettez aucun poids sur le pied.",
      "Consultez très rapidement pour obtenir de la colchicine ou un anti-inflammatoire approprié.",
      "Cessez immédiatement toute consommation d'alcool (notamment la bière) et de viande rouge."
    ]
  },
  {
    name: "arthritis",
    nameFr: "Atrhite / Polyarthrite",
    icon: "🦴",
    color: "#8b5cf6",
    keywords: ["douleur articulation", "doigts gonflés", "réveil raideur", "articulation chaude", "arthrite", "polyarthrite", "rhumatisme"],
    advice: [
      "Si une articulation est isolément rouge, chaude et gonflée, c'est une urgence médicale (risque d'infection articulaire).",
      "Si la raideur concerne vos deux mains le matin, consultez un rhumatologue.",
      "Appliquez du froid sur l'articulation chaude pour calmer la douleur."
    ]
  },
  {
    name: "osteoarthritis",
    nameFr: "Arthrose",
    icon: "🦴",
    color: "#64748b",
    keywords: ["douleur genou", "douleur hanche", "genou craque", "douleur mécanique", "arthrose", "usure cartilage"],
    advice: [
      "Maintenez une activité physique douce (marche, vélo, natation) c'est le meilleur traitement de l'arthrose.",
      "Perdez du poids si nécessaire pour soulager les hanches et les genoux.",
      "Prenez du paracétamol en cas de crise douloureuse."
    ]
  },
  {
    name: "sprain",
    nameFr: "Entorse (Cheville, Poignet...)",
    icon: "🩹",
    color: "#f59e0b",
    keywords: ["tordu", "cheville", "poignet", "gonflé bleu", "entorse", "foulure", "craquement articulation"],
    advice: [
      "Appliquez le protocole GREC : Glace, Repos, Élévation (surélevez la jambe/bras), Contention (bande).",
      "Si vous ne pouvez pas faire au moins 4 pas sur votre jambe, une radiographie est nécessaire pour éliminer une fracture.",
      "Ne massez pas et ne mettez pas de chaleur les 3 premiers jours."
    ]
  },
  {
    name: "tendonitis",
    nameFr: "Tendinite",
    icon: "💪",
    color: "#f97316",
    keywords: ["épaule", "tennis elbow", "tendon", "douleur mouvement", "tendinite", "inflammation bras"],
    advice: [
      "Reposez l'articulation concernée sans l'immobiliser complètement.",
      "Glacez la zone douloureuse plusieurs fois par jour (15min max).",
      "Massez avec une pommade anti-inflammatoire vendue en pharmacie.",
      "Buvez beaucoup d'eau (les tendons déshydratés s'enflamment plus vite)."
    ]
  },
  {
    name: "lumbago",
    nameFr: "Lumbago / Tour de rein",
    icon: "⚡",
    color: "#eab308",
    keywords: ["bloqué dos", "lumbago", "tour de rein", "bas du dos", "effort dos bloqué", "lumbalgie stricte"],
    advice: [
      "Ne restez PAS alité(e) plus de 48h : bouger un peu, marcher est essentiel pour guérir le dos.",
      "Appliquez du chaud (bouillotte, patch) sur les muscles tendus du bas du dos.",
      "Prenez des antalgiques et décontractants musculaires.",
      "Évitez les faux mouvements et pliez les genoux pour ramasser des objets."
    ]
  },

  // ── EXTENSION 7 : PÉDIATRIE (MALADIES INFANTILES) ──
  {
    name: "chickenpox",
    nameFr: "Varicelle",
    icon: "🧒",
    color: "#ef4444",
    keywords: ["boutons enfant", "enfant vésicules", "gratte enfant", "varicelle", "bouton croûte", "pédiatrie", "bébé", "enfant fièvre"],
    advice: [
      "Coupez court les ongles de l'enfant pour éviter qu'il ne s'infecte en se grattant.",
      "Appliquez une lotion asséchante (type Cytelium) sur les boutons.",
      "NE DONNEZ JAMAIS D'IBUPROFÈNE NI D'ASPIRINE à un enfant ayant la varicelle (risque grave pour la peau et le cerveau). Utilisez uniquement du paracétamol pour la fièvre."
    ]
  },
  {
    name: "bronchiolitis",
    nameFr: "Bronchiolite (Nourrisson)",
    icon: "👶",
    color: "#3b82f6",
    keywords: ["bébé tousse", "nourrisson respire mal", "sifflement bébé", "bronchiolite", "tirage bébé", "narines bébé", "bébé fièvre"],
    advice: [
      "Lavez très régulièrement le nez de votre bébé avec du sérum physiologique.",
      "Fractionnez ses repas (plus petite quantité, plus souvent) car la toux fatigue et faire boire est crucial.",
      "🔴 URGENCE : Si le bébé respire très vite, creuse son ventre/ses côtes pour respirer, refuse de s'alimenter, ou devient bleu : allez aux urgences pédiatriques IMMÉDIATEMENT."
    ]
  },
  {
    name: "measles",
    nameFr: "Rougeole (Suspicion)",
    icon: "🔴",
    color: "#b91c1c",
    keywords: ["enfant plaque rouge", "toux conjonctivite", "grosse fièvre", "rougeole", "éruption visage descend"],
    advice: [
      "C'est une maladie extrêmement contagieuse. Isolez l'enfant immédiatement.",
      "Consultez un médecin (informez le cabinet AVANT d'arriver pour qu'il vous isole).",
      "Vérifiez le carnet de vaccination de l'enfant (vaccin ROR)."
    ]
  },
  {
    name: "hand_foot_mouth",
    nameFr: "Syndrome Pieds-Mains-Bouche",
    icon: "🦶",
    color: "#f87171",
    keywords: ["bouton main", "bouton pied", "bouton bouche", "bébé bave", "enfant crèche bouton"],
    advice: [
      "Très contagieux (crèche) mais généralement bénin.",
      "Proposez à boire ou à manger des choses froides (glaces, yaourts) car la bouche est douloureuse.",
      "Évitez les aliments acides ou salés."
    ]
  },
  {
    name: "otitis_media_child",
    nameFr: "Otite Moyenne Aiguë (Enfant)",
    icon: "👂",
    color: "#f59e0b",
    keywords: ["enfant pleure oreille", "bébé touche oreille", "fièvre enfant oreille", "réveil nuit enfant"],
    advice: [
      "Donnez du paracétamol adapté au poids de l'enfant.",
      "Surélevez la tête de son lit.",
      "Consultez un pédiatre, car chez l'enfant de moins de 2 ans, une otite purulente nécessite très souvent un antibiotique."
    ]
  },

  // ── EXTENSION 8 : OPHTALMOLOGIE AVANCÉE ──
  {
    name: "glaucoma",
    nameFr: "Crise de Glaucome / Œil Rouge Douloureux",
    icon: "👁️",
    color: "#b91c1c",
    keywords: ["œil très rouge", "douleur atroce œil", "baisse vision brutale", "halos", "œil dur", "glaucome", "crise œil"],
    advice: [
      "🔴 URGENCE OPHTALMOLOGIQUE ABSOLUE. Risque de cécité (perte de l'œil).",
      "Allez aux urgences d'un hôpital ayant un service ophtalmologique IMMÉDIATEMENT.",
      "Ne mettez pas de collyre lambda dans vos yeux."
    ]
  },
  {
    name: "retinal_detachment",
    nameFr: "Décollement de Rétine (Suspicion)",
    icon: "🔦",
    color: "#475569",
    keywords: ["voile noir", "flash lumineux", "éclairs œil", "mouches volantes brutales", "perte champ de vision", "rétine"],
    advice: [
      "🔴 URGENCE OPHTALMOLOGIQUE. Rendez-vous à l'hôpital rapidement.",
      "L'apparition brutale de flashs lumineux et/ou d'un rideau sombre qui baisse sur la vision est un signal d'alarme absolu."
    ]
  },
  {
    name: "stye",
    nameFr: "Orgelet / Chalazion",
    icon: "👁️",
    color: "#eab308",
    keywords: ["paupière", "boule paupière", "orgelet", "chalazion", "paupière rouge gonflement"],
    advice: [
      "Appliquez une compresse d'eau très chaude sur la paupière fermée pendant 10 minutes, 3 à 4 fois par jour.",
      "Massez très doucement la boule après la compresse chaude.",
      "Ne percez jamais.",
      "Si la paupière entière gonfle ou que vous avez de la fièvre, consultez rapidement."
    ]
  },

  // ── EXTENSION 9 : DIVERS & MÉDECINE GÉNÉRALE RÉPANDUE ──
  {
    name: "thrush",
    nameFr: "Muguet Buccal / Candidose Buccale",
    icon: "👅",
    color: "#fbcfe8",
    keywords: ["langue blanche", "plaque blanche bouche", "brûle manger", "muguet", "langue", "candidose bouche"],
    advice: [
      "Faites des bains de bouche au bicarbonate de sodium.",
      "Consultez votre médecin ou pharmacien pour un traitement antifongique local (gel oral).",
      "Stérilisez la tétine, brosse à dents ou votre inhalateur si vous êtes asthmatique."
    ]
  },
  {
    name: "anemia",
    nameFr: "Anémie (Suspicion) / Carence en Fer",
    icon: "🩸",
    color: "#9ca3af",
    keywords: ["pâle", "fatigue marcher escalier", "essoufflement l'effort", "ongles cassants", "chute cheveux anémie", "anémie", "fer"],
    advice: [
      "Une anémie nécessite obligatoirement un bilan sanguin (NFS, Fer, Ferritine). Prenez rendez-vous.",
      "Pendant ce temps, augmentez l'apport en fer naturel (viande rouge, lentilles associées à de la vitamine C comme le citron).",
      "N'achetez pas de compléments de fer sans avis d'un médecin (le fer est toxique en excès)."
    ]
  },
  {
    name: "lyme",
    nameFr: "Maladie de Lyme (Morsure de tique)",
    icon: "🕷️",
    color: "#166534",
    keywords: ["tique", "morsure", "tache rouge grandit", "érythème migrant", "forêt bois tique", "lyme"],
    advice: [
      "Si la tique est encore là, retirez-la avec un tire-tique en tournant DOUCEMENT. N'utilisez ni éther ni alcool.",
      "Désinfectez après avoir retiré la tique.",
      "Si une auréole rouge qui s'agrandit (Érythème migrant) apparaît dans les jours/semaines, consultez un médecin pour antibiotiques.",
      "Notez la date de la morsure."
    ]
  },
  {
    name: "sunstroke",
    nameFr: "Insolation / Coup de chaleur",
    icon: "☀️",
    color: "#f59e0b",
    keywords: ["soleil", "chaleur", "chaud", "insolation", "tête tourne soleil", "rouge soleil", "déshydratation", "pas transpirer"],
    advice: [
      "Mettez-vous immédiatement à l'ombre ou dans une pièce fraîche/climatisée.",
      "Buvez de l'eau fraîche mais pas glacée, par petites gorgées.",
      "Prenez une douche fraîche ou appliquez des linges mouillés et froids.",
      "Si la personne a un comportement étrange, est très confuse ou s'évanouit : APPELEZ LE SAMU (Urgence vitale : hyperthermie maligne)."
    ]
  },
  {
    name: "hypothermia",
    nameFr: "Hypothermie",
    icon: "❄️",
    color: "#38bdf8",
    keywords: ["froid", "gel", "hypothermie", "tremblement froid", "lèvres bleues", "neige montagne", "gelures"],
    advice: [
      "Mettez la personne à l'abri du froid et retirez tout vêtement mouillé.",
      "Réchauffez LENTEMENT en plaçant des couvertures (ne frottez pas la peau !).",
      "Donnez des boissons chaudes sucrées si la personne est consciente.",
      "Si la personne cesse de frissonner alors qu'il fait toujours froid, c'est un signe tragique : URGENCE (Pompier/SAMU)."
    ]
  },
  {
    name: "rabies",
    nameFr: "Morsure d'animal / Risque Rabat",
    icon: "🐕",
    color: "#b91c1c",
    keywords: ["mordu chien", "morsure", "animal sauvage", "chauve-souris", "saigne morsure", "rage"],
    advice: [
      "Lavez abondamment la plaie à l'eau et au savon (très important pour tuer le virus de la rage si présent) pendant 15 minutes.",
      "Désinfectez avec un antiseptique local.",
      "Allez aux urgences ou chez le médecin le jour même pour vérifier votre statut tétanos et évaluer le risque rabique (rage) ou le besoin d'antibiotiques."
    ]
  },
  {
    name: "food_poisoning",
    nameFr: "Intoxication Alimentaire",
    icon: "🍔",
    color: "#65a30d",
    keywords: ["restaurant", "manger périmé", "vomissement repas", "diarrhée repas collectif", "intoxication", "saumonella"],
    advice: [
      "Les symptômes débutent généralement entre 1h et 24h après le repas fautif.",
      "Gérez l'hydratation (eau + sucre + sel ou bouillon) pour compenser pertes et vomissements.",
      "Ne prenez pas d'anti-diarrhéiques bloqueurs (l'intestin a besoin d'expulser la toxine).",
      "Consultez un médecin si présence de sang dans les selles, fièvre forte, ou intolérance totale à l'eau."
    ]
  },
  {
    name: "fibromyalgia",
    nameFr: "Fibromyalgie (Symptômes)",
    icon: "🛡️",
    color: "#f472b6",
    keywords: ["douleur partout", "fatigue chronique inexplicable", "fibromyalgie", "sommeil non réparateur douleur dos", "brouillard cerveau"],
    advice: [
      "C'est un syndrome complexe nécessitant une prise en charge multidisciplinaire.",
      "L'activité physique douce (aquagym, Pilates, marche) est le meilleur traitement de fond connu.",
      "Un suivi rhumatologique, la gestion du stress et parfois des antalgiques spécifiques ou antidépresseurs à visée antalgique peuvent aider.",
      "Consultez la longue pour poser un vrai diagnostic, c'est normal de se sentir incompris(e)."
    ]
  },
  {
    name: "sleep_apnea",
    nameFr: "Apnée du Sommeil",
    icon: "🛏️",
    color: "#0f172a",
    keywords: ["ronflement", "apnée", "fatigue réveil", "somnolence jour", "s'endormir au volant", "arrête respirer nuit"],
    advice: [
      "Consultez un pneumologue ou un centre du sommeil pour passer un bilan (polysomnographie).",
      "Ce syndrome est grave s'il n'est pas traité car il épuise le cœur et augmente le risque d'AVC.",
      "Évitez l'alcool le soir et dormez de préférence sur le côté."
    ]
  },
  {
    name: "tachycardia_panic",
    nameFr: "Tachycardie Sinusale / Crise Angoisse",
    icon: "⚡",
    color: "#818cf8",
    keywords: ["cœur bat à 100 à l'heure", "impression mourir", "étouffement poitrine", "tachycardie", "crise de panique impression cœur"],
    advice: [
      "Si c'est la première fois ou que la douleur est irradiante : levez le doute en appelant le SAMU.",
      "Si vous êtes coutumier des attaques de panique, asseyez-vous, respirez dans un sac en papier ou en joignant vos mains pour le CO2, et soufflez doucement par la bouche.",
      "La cohérence cardiaque (application mobile) peut vous aider à faire baisser le rite très vite."
    ]
  },
  {
    name: "meningitis",
    nameFr: "Méningite (Suspicion)",
    icon: "🧠",
    color: "#7f1d1d",
    keywords: ["raideur nuque", "nuque bloquée fièvre", "lumière mal aux yeux", "vomissement jet", "méningite", "tache rouge peau fièvre"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE. (Surtout si associé à des petites taches rouges sur la peau qui ne blanchissent pas sous la pression d'un verre : purpura fulminans).",
      "APPELEZ LE 15 / 112 IMMÉDIATEMENT.",
      "Placez la personne dans une lumière tamisée et asseyez-la confortablement en attendant."
    ]
  },
  {
    name: "carbon_monoxide",
    nameFr: "Intoxication au Monoxyde de Carbone",
    icon: "💨",
    color: "#475569",
    keywords: ["maux de tête famille", "vomit chauffage", "hiver chaudière", "tous malades maison", "étouffe gaz", "monoxyde", "poêle à bois mauvais"],
    advice: [
      "🔴 URGENCE VITALE. GAZ MORTEL, INODORE ET INVISIBLE.",
      "Sortez IMMÉDIATEMENT à l'air libre et faites sortir tout le monde.",
      "Aérez en grand (ouvrez les fenêtres en sortant, ne traînez pas).",
      "Ne rallumez rien et appelez les pompiers (18/112)."
    ]
  },

  // ── EXTENSION 10: MALADIES INFECTIEUSES & PARASITES TROPICALES ──
  {
    name: "malaria",
    nameFr: "Paludisme (Suspicion retour voyage)",
    icon: "🦟",
    color: "#b45309",
    keywords: ["fievre retour voyage", "frissons intenses", "sueur abondante", "afrique moustique", "palu", "malaria", "crise paludisme"],
    advice: [
      "🔴 URGENCE VITALE (tout retour de zone tropicale avec fièvre = urgence médicale).",
      "Rendez-vous immédiatement aux urgences ou consultez un médecin infectiologue.",
      "Précisez la date de retour et les pays visités. N'attendez pas."
    ]
  },
  {
    name: "dengue",
    nameFr: "Dengue / Chikungunya",
    icon: "🦟",
    color: "#dc2626",
    keywords: ["fievre moustique tigre", "douleur derriere les yeux", "courbatures intenses brise os", "dengue", "chikungunya", "voyage tropical"],
    advice: [
      "Reposez-vous et hydratez-vous abondamment.",
      "NE PRENEZ AUCUN anti-inflammatoire ni aspirine (risque mortel d'hémorragie). Prenez uniquement du paracétamol.",
      "Surveillez l'apparition de saignements (gencives, nez) ou de vomissements persistants."
    ]
  },
  {
    name: "tuberculosis",
    nameFr: "Tuberculose (Suspicion)",
    icon: "🫁",
    color: "#475569",
    keywords: ["toux depuis 1 mois", "crachat sang matin", "sueur nocturne", "perte poids inexpliquée", "tuberculose", "fatigue long terme"],
    advice: [
      "Consultez un médecin rapidement pour réaliser une radiographie pulmonaire et des analyses de crachats.",
      "Isolez-vous des autres en évitant les contacts rapprochés sans masque.",
      "Ne fumez plus et portez un masque chirurgical."
    ]
  },
  {
    name: "cholera",
    nameFr: "Choléra / Diarrhée sévère tropicale",
    icon: "💧",
    color: "#0369a1",
    keywords: ["diarrhée eau de riz", "perte plusieurs litres", "soif intense", "crampe musculaire déshydratation", "cholera", "pays en développement eau"],
    advice: [
      "🔴 URGENCE VITALE PAR DÉSHYDRATATION.",
      "Buvez des SRO (Solutions de Réhydratation Orale) EN PERMANENCE.",
      "Consultez un médecin ou rendez-vous à l'hôpital immédiatement pour être réhydraté par voie intraveineuse."
    ]
  },

  // ── EXTENSION 11: PATHOLOGIES MÉTABOLIQUES & ENDOCRINOLOGIE ──
  {
    name: "hyperthyroidism",
    nameFr: "Hyperthyroïdie / Maladie de Basedow",
    icon: "🦋",
    color: "#eab308",
    keywords: ["cœur bat vite repos", "perte de poids mangeant beaucoup", "yeux exorbités", "transpiration excessive", "thyroïde hyper"],
    advice: [
      "Consultez votre médecin ou un endocrinologue pour un dosage sanguin strict (TSH, T4L).",
      "Évitez les excitants (café, thé noir, boissons énergisantes).",
      "Reposez-vous le plus possible pour ne pas épuiser votre cœur."
    ]
  },
  {
    name: "cushing",
    nameFr: "Syndrome de Cushing",
    icon: "🐻",
    color: "#a855f7",
    keywords: ["prise de poids ventre", "visage lune", "vergetures violettes", "bosse bison cou", "cushing", "cortisol élevé"],
    advice: [
      "Si vous prenez des corticoïdes depuis longtemps, ne les arrêtez JAMAIS brutalement.",
      "S'il n'y a pas de prise médicamenteuse, consultez un endocrinologue pour évaluer votre taux de cortisol."
    ]
  },
  {
    name: "addison",
    nameFr: "Maladie d'Addison (Insuffisance surrénalienne)",
    icon: "🔋",
    color: "#713f12",
    keywords: ["fatigue inexpliquée matin", "peau bronzée sans soleil", "tension très basse", "envie sel", "addison", "évanouissement effort"],
    advice: [
      "Consultez rapidement un endocrinologue.",
      "Si vous êtes déjà suivi et que vous vomissez ou avez de la fièvre face à un stress, c'est une URGENCE : il faut injecter ou augmenter votre dose d'hydrocortisone."
    ]
  },

  // ── EXTENSION 12: PATHOLOGIES AUTO-IMMUNES & INFLAMMATOIRES ──
  {
    name: "lupus",
    nameFr: "Lupus Erythémateux",
    icon: "🐺",
    color: "#c026d3",
    keywords: ["plaque rouge visage papillon", "douleur articulaire multiple", "fatigue soleil", "lupus", "chute cheveux plaques"],
    advice: [
      "Protégez-vous absolument du soleil de manière intégrale (crème indice 50, manches longues).",
      "Consultez un spécialiste en médecine interne ou un rhumatologue.",
      "Pendant une poussée, reposez-vous et respectez précisément le traitement prescrit."
    ]
  },
  {
    name: "multiple_sclerosis",
    nameFr: "Sclérose en Plaques (Poussée suspecte)",
    icon: "🧠",
    color: "#3b82f6",
    keywords: ["perte vision d'un œil", "fourmillements constants", "faiblesse jambe anormale", "choc électrique nuque dos", "sép", "sclérose en plaque"],
    advice: [
      "L'apparition de signes neurologiques anormaux nécessitent une IRM très rapide.",
      "Consultez les urgences neurologiques ou votre médecin traitant si vous constatez des engourdissements ou perte de force qui perdurent plus de 24h.",
      "Évitez les bains très chauds, la chaleur peut aggraver transitoirement les signes."
    ]
  },
  {
    name: "spondylitis",
    nameFr: "Spondylarthrite Ankylosante",
    icon: "🦴",
    color: "#6b7280",
    keywords: ["douleur dos réveillant nuit", "raideur matin dos", "douleur fesse alternante", "talon douleur matin", "hla b27", "spondylarthrite"],
    advice: [
      "Un dérouillage d'au moins 30 minutes au réveil est diagnostique : consultez un rhumatologue.",
      "Le mouvement soulage la douleur, l'immobilité l'aggrave (à l'inverse d'une hernie discale classique).",
      "Pratiquez des étirements quotidiennement pour éviter l'ankylose de la colonne."
    ]
  },

  // ── EXTENSION 13: GYNÉCOLOGIE & OBSTÉTRIQUE COMPLÉMENTAIRE ──
  {
    name: "preeclampsia",
    nameFr: "Pré-éclampsie (Femme Enceinte)",
    icon: "🤰",
    color: "#b91c1c",
    keywords: ["enceinte maux de tête intenses", "enceinte mouches yeux", "bourdonnement oreilles enceinte", "oedème très rapide", "tension forte grossesse"],
    advice: [
      "🔴 URGENCE VITALE POUR LA MÈRE ET LE FOETUS.",
      "Allez directement aux urgences obstétricales ou à la maternité sans délai.",
      "Asseyez-vous ou allongez-vous au calme."
    ]
  },
  {
    name: "ectopic_pregnancy",
    nameFr: "Grossesse Extra-Utérine (GEU)",
    icon: "💔",
    color: "#9f1239",
    keywords: ["test positif douleur atroce un seul côté", "malaise perte de sang noire grossesse", "geu", "douleur epaule irradiant ovaire enceinte"],
    advice: [
      "🔴 URGENCE CHIRURGICALE VITALE. Risque d'hémorragie interne.",
      "Appelez le SAMU (15/112) immédiatement.",
      "Restez allongée."
    ]
  },
  {
    name: "mastitis",
    nameFr: "Mastite (Femme allaitante)",
    icon: "🤱",
    color: "#ec4899",
    keywords: ["sein rouge dur douloureux", "allaitante fièvre", "ganglion aisselle sein", "mastite", "engorgement infecté"],
    advice: [
      "Continuez d'allaiter du côté malade (le lait n'est pas toxique et le drainage aide).",
      "Si vous avez de la fièvre plus de 24h ou que le sein est bouillant/vermillon, consultez (antibiotiques compatibles avec l'allaitement souvent nécessaires).",
      "Massez la zone dure sous une douche chaude."
    ]
  },

  // ── EXTENSION 14: PROBLÈMES VEINEUX & ARTÉRIELS ──
  {
    name: "aneurysm",
    nameFr: "Rupture d'Anévrisme (Suspicion)",
    icon: "💥",
    color: "#b91c1c",
    keywords: ["pire mal de tête de ma vie", "coup de tonnerre tête", "maux tête foudroyant", "anévrisme", "vomissement jet soudain"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE. Neurochirurgicale immédiate.",
      "C'est souvent décrit comme une explosion dans la tête.",
      "Appelez le SAMU immédiatement (15, 112 ou 911). Ne donner ni à manger ni à boire ni médicaments."
    ]
  },
  {
    name: "pad",
    nameFr: "Artériopathie Vessie Inférieure (AOMI)",
    icon: "🦵",
    color: "#ca8a04",
    keywords: ["crampe mollet marche", "besoin arrêter marcher crampe", "jambe froide fumeur", "artérite", "bout orteil noirci"],
    advice: [
      "Signalez ce symptôme à votre médecin (surtout si vous êtes fumeur ou diabétique).",
      "Arrêtez ABSOLUMENT de fumer, c'est l'urgence thérapeutique numéro 1.",
      "Marchez le plus souvent possible jusqu'à l'apparition de la douleur (cela crée de nouvelles petites artères collatérales)."
    ]
  },
  {
    name: "raynaud",
    nameFr: "Maladie de Raynaud",
    icon: "❄️",
    color: "#0369a1",
    keywords: ["doigts blancs froid", "doigts bleus douloureux froid", "raynaud", "engelures froid", "doigt mort froid"],
    advice: [
      "Protégez vos mains et pieds du froid avant même de sortir (gants très chauds).",
      "Le stress peut aussi déclencher les crises.",
      "Si d'autres symptômes apparaissent (plaques, douleurs articulaires), parlez-en à un rhumatologue/médecin interne, cela pourrait cacher une maladie auto-immune."
    ]
  },

  // ── EXTENSION 15: PATHOLOGIES DU SANG & HÉMATOLOGIE ──
  {
    name: "leukemia",
    nameFr: "Leucémie Aiguë (Suspicion de symptômes)",
    icon: "🩸",
    color: "#7f1d1d",
    keywords: ["fatigue brutale", "bleus sans raison", "saignement gencives sans raison", "fièvre infections à répétition", "gros ganglions", "sueur nocturnes importantes"],
    advice: [
      "Consultez rapidement un médecin pour prescrire une Numération Formule Sanguine (prise de sang).",
      "C'est cette simple prise de sang permet d'écarter l'immense majorité des maladies du sang.",
      "Ne prenez pas cela à la légère s'il y a apparition massive de bleus non justifiés ou de fatigue extrême sans cause de surmenage."
    ]
  },
  {
    name: "hemophilia",
    nameFr: "Hémophilie / Trouble de coagulation",
    icon: "🩸",
    color: "#be185d",
    keywords: ["saignement arrête pas", "hémophilie", "coupure saigne beaucoup", "grosses hématomes genoux d'enfant", "coagule pas"],
    advice: [
      "Comprimez la blessure TRES FORT et EN CONTINU pendant 10 minutes (sans relâcher pour regarder).",
      "Rendez-vous aux urgences si le saignement persiste.",
      "Si la personne est déjà porteuse d'une hémophilie, injecter immédiatement le facteur coagulant (médicament spécialisé)."
    ]
  },

  // ── EXTENSION 16: CONDITIONS PÉDIATRIQUES, RARES ET COMPLÉMENTAIRES ──
  {
    name: "kawasaki",
    nameFr: "Maladie de Kawasaki (Enfant)",
    icon: "🧒",
    color: "#dc2626",
    keywords: ["enfant fievre 5 jours sans baisser", "langue fraise framboise", "levre craquelee rouge", "ganglion cou enfant", "yeux rouge sans pus enfant"],
    advice: [
      "🔴 URGENCE PÉDIATRIQUE (risque d'anévrisme coronaire pour l'enfant).",
      "Consultez les urgences pédiatriques de l'hôpital le plus proche.",
      "Précisez le nombre exact de jours de fièvre."
    ]
  },
  {
    name: "meningococcus",
    nameFr: "Infection à Méningocoque (Purpura Fulminans)",
    icon: "💥",
    color: "#7f1d1d",
    keywords: ["fievre enfant tache violette", "tache sang qui s'efface pas doigt", "purpura", "enfant tres pale amorphe", "méningocoque"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE (pronostic vital engagé en quelques heures).",
      "FAITES LE TEST DU VERRE : Appuyez un verre transparent sur les taches rouges/violacées de l'enfant. Si les taches NE DISPARAISSENT PAS sous la pression, appele le SAMU SANS RETARD (15).",
      "Toute minute compte. Appelez le 15, précisez 'Suspicion de Purpura Fulminans'."
    ]
  },
  {
    name: "appendicitis_ped",
    nameFr: "Appendicite (Pédiatrie)",
    icon: "👦",
    color: "#ca8a04",
    keywords: ["enfant marche courbé", "enfant refuse de manger ventre", "douleur soudaine fosse droite enfant", "fievre modérée nausée"],
    advice: [
      "Une douleur abdominale chez l'enfant associée à une difficulté à marcher droit ou à se redresser est une urgence diagnostique.",
      "Ne lui donnez à ni manger ni à boire, direction les urgences pédo-chirurgicales."
    ]
  },
  {
    name: "parkinson",
    nameFr: "Maladie de Parkinson",
    icon: "🧠",
    color: "#1e293b",
    keywords: ["tremblement repos", "tremblement main", "raideur visage masque", "marche à petits pas", "parkinson", "perte odorat âgés"],
    advice: [
      "Un tremblement qui TIENT AU REPOS (et pas pendant l'action) doit faire évoquer un Parkinson.",
      "Consultez un neurologue faire le point, des traitements médicamenteux (lévodopa) très efficaces existent pour atténuer les symptômes."
    ]
  },
  {
    name: "alzheimer",
    nameFr: "Maladie d'Alzheimer (Suspicion Démence)",
    icon: "🧩",
    color: "#6b7280",
    keywords: ["perte mémoire récente", "oublie chemin maison", "ne reconnait plus objet", "alzheimer", "démence sénile", "agressivité inexpliquée âgé"],
    advice: [
      "Accompagnez doucement la personne sans la contredire frontalement.",
      "Consultez un gériatre ou une clinique de la mémoire pour un diagnostic.",
      "Contactez des associations pour soutenir les aidants (famille), car c'est une épreuve lourde au quotidien."
    ]
  },
  {
    name: "endometriosis",
    nameFr: "Endométriose / Adénomyose",
    icon: "🩸",
    color: "#db2777",
    keywords: ["douleur règles insurmontable", "douleur accouplement fond ventre", "douleur caca pendant regles", "endométriose", "adénomyose"],
    advice: [
      "Des règles qui empêchent d'aller travailler ou à l'école NE SONT PAS NORMALES.",
      "Prenez rdv avec un(e) médecin spécialisé(e) en endométriose (IRM pelvienne spécifique nécessaire).",
      "Une pilule prise en continu peut arrêter artificiellement les règles et calmer l'inflammation."
    ]
  },
  {
    name: "scurvy",
    nameFr: "Scorbut / Carence sévère Tit C",
    icon: "🍋",
    color: "#fb923c",
    keywords: ["dents qui se déchaussent", "gencives saignent beaucoup", "cheveux en tire-bouchon", "pas fruits ou legumes depuis longtemps", "carence extreme"],
    advice: [
      "Consommez très rapidement des aliments riches en vitamine C (Kiwi, agrumes, poivrons rouges crus).",
      "Prenez une supplémentation si le médecin le confirme.",
      "Aujourd'hui, cela se voit par des régimes carencés très sévères."
    ]
  },
  {
    name: "tetanus",
    nameFr: "Tétanos",
    icon: "🔩",
    color: "#475569",
    keywords: ["mâchoire serrée contractée", "bloqué dos spasme", "coupure rouillé", "pas vacciné tétanos raideur", "tétanos"],
    advice: [
      "🔴 URGENCE VITALE et neurologique.",
      "Appelez le SAMU.",
      "Lavez toujours très à fond avec du savon une plaie, même banale (une simple griffure de rose suffit si vous n'êtes pas à jour du vaccin)."
    ]
  },
  {
    name: "glaucoma_chronic",
    nameFr: "Glaucome Chronique (Angle Ouvert)",
    icon: "👁️",
    color: "#64748b",
    keywords: ["perd vision côté", "vision se rétrécit", "vue tubulaire", "glaucome antécédent famille", "myopie forte oeil pression"],
    advice: [
      "Cette maladie est indolore (le 'voleur silencieux de la vue').",
      "Si vous avez un parent atteint, il faut absolument faire contrôler votre tension oculaire par l'ophtalmologue tous les ans après 40 ans.",
      "Si le rétrécissement du champ visuel est commencé, le traitement sous forme de gouttes l'empêchera d'empirer mais ne réparera pas les dégâts."
    ]
  },
  {
    name: "dehydration",
    nameFr: "Déshydratation Sévère",
    icon: "💧",
    color: "#2563eb",
    keywords: ["peau reste pliée", "pli cutané", "urine très sombre marron", "bouche complétement sèche langue sable", "yeux très creusés", "personne âgée très soif confus"],
    advice: [
      "Donnez à boire très régulièrement, particulièrement chez un sénior ou un nourrisson.",
      "Si la personne est confuse, agitée, n'urine plus du tout depuis 12h, ou somnole trop : allez aux URGENCES (perfusion d'hydratation).",
      "L'hydratation passe aussi par les fruits pleins d'eau (pastèque, melon)."
    ]
  },

  // ── EXTENSION 17: ORL & OPHTALMOLOGIE ADDITIONNELLE ──
  {
    name: "strep_throat",
    nameFr: "Angine Streptococcique",
    icon: "🦠",
    color: "#dc2626",
    keywords: ["mal gorge foudroyant", "déglutition impossible", "fièvre forte gorge", "amygdales rouges blanches", "points blancs gorge", "ganglions cou douloureux"],
    advice: [
      "Consultez un médecin pour faire un Test Rapide d'Orientation Diagnostique (TROD).",
      "Si le test est positif, des antibiotiques sont indispensables pour éviter des complications cardiaques ou articulaires (RAA).",
      "Prenez du paracétamol et mangez des aliments froids (glaces, yaourts) pour apaiser la douleur."
    ]
  },
  {
    name: "laryngitis",
    nameFr: "Laryngite / Extinction de Voix",
    icon: "🗣️",
    color: "#8b5cf6",
    keywords: ["voix perdue", "extinction de voix", "voix rauque", "toux aboyante", "toux de phoque", "cordes vocales", "aphone"],
    advice: [
      "Mettez vos cordes vocales au REPOS STRICT (ne chuchotez même pas, cela force encore plus).",
      "Buvez des tisanes tièdes avec du miel.",
      "Si un bébé ou un enfant fait un bruit de phoque en toussant et peine à respirer : URGENCES (Laryngite sous-glottique)."
    ]
  },
  {
    name: "allergic_rhinitis",
    nameFr: "Rhinite Allergique / Rhume des Foins",
    icon: "🤧",
    color: "#22c55e",
    keywords: ["éternuements salves", "nez coule clair", "yeux grattent pleurent", "pollen rhume", "allergie printemps", "chatouille palais gorge"],
    advice: [
      "Lavez-vous le nez au sérum physiologique ou spray d'eau de mer plusieurs fois par jour.",
      "Demandez un antihistaminique à votre pharmacien.",
      "En période de pollens, aérez votre logement tôt le matin et rincez-vous les cheveux avant de dormir."
    ]
  },
  {
    name: "nasal_polyps",
    nameFr: "Polypose Nasale",
    icon: "👃",
    color: "#64748b",
    keywords: ["nez bouché en permanence", "perte totale odorat depuis longtemps", "perte gout depuis un moment", "polypes", "voix nasonnée"],
    advice: [
      "Consultez un ORL pour un examen approfondi des fosses nasales.",
      "Cette perte d'odorat permanente (hors COVID) est très typique.",
      "Un traitement par corticoïdes en spray nasal est souvent prescrit."
    ]
  },
  {
    name: "sudden_deafness",
    nameFr: "Surdité Brusque",
    icon: "🧏",
    color: "#ef4444",
    keywords: ["oreille bouchée d'un coup", "entends plus rien d'un côté", "surdité soudaine", "perte audition brutale matin", "acouphène brutal perte audition"],
    advice: [
      "🔴 URGENCE ORL. Consultez un ORL ou les urgences sous 24h.",
      "Ne minimisez pas une perte totale d'audition d'une oreille apparue en quelques heures/minutes.",
      "Un traitement par corticoïdes doit être démarré extrêmement vite pour avoir une chance de récupération."
    ]
  },
  {
    name: "allergic_conjunctivitis",
    nameFr: "Conjonctivite Allergique",
    icon: "👁️",
    color: "#ec4899",
    keywords: ["deux yeux rouges qui grattent", "yeux gonflés allergie", "larmes claires yeux", "sable dans les yeux printemps"],
    advice: [
      "Ne frottez surtout pas vos yeux (cela libère de l'histamine et empire l'allergie).",
      "Lavez vos yeux avec de petites dosettes de sérum physiologique froid (conservées au frigo).",
      "Utilisez un collyre anti-allergique (disponible en pharmacie)."
    ]
  },
  {
    name: "keratitis",
    nameFr: "Kératite (Ulcère Cornée)",
    icon: "👁️",
    color: "#dc2626",
    keywords: ["douleur oeil lentille de contact", "sensibilité lumière oeil rouge", "lumière fait mal à l'oeil rouge", "lentille oubliée oeil", "ulcère oeil"],
    advice: [
      "🔴 URGENCE OPHTALMOLOGIQUE.",
      "Retirez VOS LENTILLES DE CONTACT immédiatement et jetez-les.",
      "Allez aux urgences ophtalmo le jour même. Une infection sous lentille peut percer l'oeil en 24h."
    ]
  },
  {
    name: "cataract",
    nameFr: "Cataracte",
    icon: "🌫️",
    color: "#94a3b8",
    keywords: ["vue baisse comme brouillard", "ébloui phares voiture nuit", "vision double un oeil", "voile blanc oeil âgé", "cataracte"],
    advice: [
      "Prenez rendez-vous avec votre ophtalmologue pour un fond d'oeil régulier.",
      "La baisse de vue est lente, progressive et non douloureuse.",
      "La seule solution curative est chirurgicale, c'est une intervention très bénigne et courante aujourd'hui."
    ]
  },
  {
    name: "amd",
    nameFr: "DMLA (Dégénérescence Maculaire)",
    icon: "🎯",
    color: "#3f6212",
    keywords: ["tache noire centre vision", "lignes droites sont déformées", "ondulation lignes vision", "reconnaît plus les visages vision", "dmla"],
    advice: [
      "🔴 URGENCE RELATIVE. Toute déformation brutale des lignes droites nécessite un fond d'oeil sous 24-48h.",
      "Observez le carrelage de votre salle de bain : si les lignes vous paraissent gondolées d'un seul oeil, consultez très vite.",
      "Il existe des injections intra-oculaires pour bloquer l'évolution."
    ]
  },

  // ── EXTENSION 18: GASTRO-ENTÉROLOGIE ADDITIONNELLE ──
  {
    name: "hiatal_hernia",
    nameFr: "Hernie Hiatale",
    icon: "🔥",
    color: "#fb923c",
    keywords: ["remontée acide couché", "reflux penché", "brulure oesophage nuit", "hernie estomac", "renvoi acide amer bouche"],
    advice: [
      "Surélevez la tête de votre lit de quelques centimètres (cale sous les pieds du lit).",
      "Évitez de vous coucher dans les 3 heures suivant un repas.",
      "Évitez les portions trop copieuses, le café, la menthe, le chocolat et l'alcool en soirée."
    ]
  },
  {
    name: "nash",
    nameFr: "Stéatose Hépatique (Maladie du Foie Gras / NASH)",
    icon: "🦆",
    color: "#eab308",
    keywords: ["foie gras", "nash", "prise sang foie élevée", "transaminases hautes sans alcool", "ventre gonflé obésité foie", "stéatose"],
    advice: [
      "Cette maladie du 'foie gras non alcoolique' est réversible au stade précoce.",
      "La perte de poids (même 5 à 10%) est le traitement de référence le plus efficace.",
      "Supprimez totalement les sirops, sodas, et produits industriels ultra-transformés (excès de sucre qui se transforme en graisse dans le foie)."
    ]
  },
  {
    name: "diverticulitis",
    nameFr: "Diverticulite",
    icon: "💥",
    color: "#b91c1c",
    keywords: ["douleur fosse iliaque gauche", "douleur bas ventre gauche", "fievre douleur ventre gauche", "sigmoïdite", "diverticulite", "poche intestin infecté"],
    advice: [
      "Une douleur en bas à gauche du ventre avec de la fièvre est souvent une infection des diverticules.",
      "Consultez rapidement un médecin ou allez aux urgences (un scanner et des antibiotiques sont nécessaires).",
      "Mettez votre intestin au repos (bouillons clairs) en attendant l'avis médical."
    ]
  },
  {
    name: "cirrhosis",
    nameFr: "Cirrhose (Décompensation)",
    icon: "🍷",
    color: "#854d0e",
    keywords: ["ventre rempli d'eau", "ascite", "jaunisse alcool", "vomit du sang foie", "cirrhose", "confusion alcoolo-dépendant"],
    advice: [
      "🔴 URGENCE. Si vous vomissez du sang ou si l'abdomen gonfle très rapidement, allez aux urgences (risque vital de rupture de varice)",
      "Arrêt absolu et définitif de TOUTE boisson alcoolisée.",
      "Régime strictement sans sel pour limiter le gonflement de l'abdomen (ascite)."
    ]
  },
  {
    name: "colorectal_cancer",
    nameFr: "Suspicion Cancer Colorectal (Signes)",
    icon: "🎗️",
    color: "#1e293b",
    keywords: ["sang mélangé aux selles", "selles très fines crayon", "alternance diarrhée constipation soudaine 50 ans", "perte de poids ventre", "anémie sang selles"],
    advice: [
      "N'ignorez jamais la présence persistante de sang rouge sombre dans vos selles.",
      "Un changement inexpliqué de vos habitudes intestinales (diarrhée puis constipation) apparu récemment nécessite un avis médical.",
      "Prenez rdv avec un gastro-entérologue pour faire une coloscopie. Dépisté tôt, ce cancer se guérit très bien."
    ]
  },
  {
    name: "hepatitis_a",
    nameFr: "Hépatite A",
    icon: "🌊",
    color: "#ca8a04",
    keywords: ["jaunisse retour de voyage", "fruits de mer hépatite", "urines coca", "fatigue intense après restaurant", "hépatite eau sale"],
    advice: [
      "C'est une infection virale du foie transmise par l'eau ou l'alimentation contaminée.",
      "Reposez-vous, l'évolution est quasi toujours résolutive spontanément en quelques semaines.",
      "Lavez-vous les mains très soigneusement après être allé aux toilettes pour ne pas contaminer vos proches."
    ]
  },
  {
    name: "hepatitis_bc",
    nameFr: "Hépatite B ou C (Transmission sanguine/sexuelle)",
    icon: "💉",
    color: "#713f12",
    keywords: ["jaunisse toxicomane", "hépatite post relation", "piqûre accidentelle aiguille", "transfusé avant 1990", "hépatite c", "hépatite b"],
    advice: [
      "Faites une prise de sang avec sérologie si vous avez eu un comportement à risque (rapport non protégé, piercing/tatouage douteux, drogue).",
      "Surtout : il existe aujourd'hui des traitements qui GUÉRISSENT l'Hépatite C à 100%. Consultez un infectiologue ou hépato-gastroentérologue."
    ]
  },
  {
    name: "tapeworm",
    nameFr: "Ténia (Ver Solitaire)",
    icon: "🐛",
    color: "#84cc16",
    keywords: ["anneaux blancs selles", "ver dans les selles", "maigrit mangeant très faim", "ténia", "viande boeuf crue ver", "nouille fesse"],
    advice: [
      "Pas de panique, c'est désagréable mais bénin.",
      "Allez simplement consulter un médecin qui vous prescrira un vermifuge (ex: Praziquantel).",
      "Évitez la consommation de porc et de bœuf mal cuits ou crus à l'avenir."
    ]
  },
  {
    name: "pinworms",
    nameFr: "Oxyurose (Petits vers)",
    icon: "🪱",
    color: "#a3e635",
    keywords: ["gratte anus soir", "gratte anus enfant", "petits vers blancs fins", "oxyures", "enfant se gratte fesse nuit"],
    advice: [
      "Achetez un vermifuge en vente libre en pharmacie (ex: Fluvermal) et traitez TOUTE LA FAMILLE le même jour.",
      "Refaites une prise de médicaments 15 jours plus tard pour tuer les œufs éclos entre temps.",
      "Lavez les draps, doudous et sous-vêtements à 60°C et coupez les ongles des enfants ras."
    ]
  },
  {
    name: "gerd_infant",
    nameFr: "RGO du Nourrisson (Reflux)",
    icon: "🍼",
    color: "#3b82f6",
    keywords: ["bébé vomit lait", "bébé pleure biberon", "bébé se cambre", "bébé renvoie rot", "reflux interne nourrisson", "rgo bebe"],
    advice: [
      "Essayez d'épaissir le lait (laits AR vendus en pharmacie).",
      "Maintenez votre bébé à la verticale environ 20-30 minutes après le repas.",
      "S'il pleure beaucoup, refuse de manger ou s'il perd du poids, consultez le pédiatre pour un éventuel traitement (IPP)."
    ]
  },

  // ── EXTENSION 19: INFECTIOLOGIE & PARASITOLOGIE ADDITIONNELLE ──
  {
    name: "mononucleosis",
    nameFr: "Mononucléose Infectieuse (Maladie du Baiser)",
    icon: "💋",
    color: "#c026d3",
    keywords: ["fatigue extreme adolescent", "angine qui passe pas ado", "gros ganglions partout", "grosse rate", "mononucléose", "baiser maladie", "sueur ado"],
    advice: [
      "La fatigue peut durer de très nombreuses semaines, c'est normal (virus EBV).",
      "Arrêt strict des sports de contact pendant 1 à 2 mois (risque mortel de rupture de la rate qui est gonflée).",
      "Ne prenez pas d'amoxicilline (cela provoquerait une éruption cutanée sévère). L'infection est virale."
    ]
  },
  {
    name: "toxoplasmosis",
    nameFr: "Toxoplasmose (Enceinte)",
    icon: "🐱",
    color: "#f43f5e",
    keywords: ["enceinte toxo", "chat enceinte litiere", "tache rouge toxoplasmose enceinte", "viande saignante grossesse toxo"],
    advice: [
      "Risque principal pour le foetus chez la femme enceinte non immunisée.",
      "Ne changez PLUS la litière du chat.",
      "Cuisez très à coeur toutes vos viandes et lavez abondamment les légumes poussant en terre."
    ]
  },
  {
    name: "cmv",
    nameFr: "Cytomégalovirus (CMV)",
    icon: "👶",
    color: "#ec4899",
    keywords: ["enceinte crèche cmv", "fatigue fievre femme enceinte bebe", "cmv grossesse", "virus enfant crèche"],
    advice: [
      "Précautions pour les femmes enceintes : ne goûtez JAMAIS les repas/biberons de vos premiers enfants avec la même cuillère.",
      "Ne finissez pas non plus leurs repas et lavez de suite leurs effets.",
      "Il n'y a pas de vaccin, la prévention hygiénique est l'unique bouclier pendant la grossesse."
    ]
  },
  {
    name: "yellow_fever",
    nameFr: "Fièvre Jaune",
    icon: "🟡",
    color: "#eab308",
    keywords: ["fievre jaunisse voyage", "vaccin afrique obligatoire", "vomit noir", "fievre jaune afrique"],
    advice: [
      "🔴 URGENCE VITALE et infectieuse grave liée aux pays tropicaux.",
      "Allez aux urgences en précisant immédiatement votre dernière destination de voyage."
    ]
  },
  {
    name: "typhoid",
    nameFr: "Fièvre Typhoïde",
    icon: "💩",
    color: "#4ade80",
    keywords: ["fievre qui monte descend voyage", "tache rose ventre", "diarrhée puante pays chaud", "typhoïde", "eau contaminée voyage", "tuphos"],
    advice: [
      "Si vous avez une fièvre prolongée accompagnée de troubles digestifs après un voyage au retour en zone tropicale, consultez un infectiologue.",
      "Hygiène vitale : lavez-vous les mains. Ne buvez jamais l'eau du robinet dans ces régions."
    ]
  },
  {
    name: "brucellosis",
    nameFr: "Brucellose (Fièvre de Malte)",
    icon: "🧀",
    color: "#fcd34d",
    keywords: ["fievre nocturne fromage", "lait cru fievre", "sueur malodorante fromage vache", "brucellose", "berger fievre"],
    advice: [
      "Souvent déclenché après ingestion de fromage au lait cru de ferme locale non pasteurisé dans certaines régions.",
      "La fièvre est très caractéristique car souvent accompagnée de sueurs très importantes. Consultez pour une antibiothérapie ciblée."
    ]
  },
  {
    name: "leptospirosis",
    nameFr: "Leptospirose",
    icon: "🐀",
    color: "#14b8a6",
    keywords: ["fievre après baignade rivière", "rat urine fievre", "ictere baignade", "pompier canal fievre", "leptospirose", "yeux très rouges sans pus fievre"],
    advice: [
      "🔴 ALERTE : une fièvre quelques jours après une baignade en eau douce, kayak, ou blessure liée à des rongeurs est une leptospirose jusqu'à preuve du contraire.",
      "Allez aux urgences (cette bactérie peut détruire les reins et le foie sans antibiotiques)."
    ]
  },
  {
    name: "cat_scratch_disease",
    nameFr: "Maladie des Griffes du Chat",
    icon: "🐈",
    color: "#9ca3af",
    keywords: ["griffure chat ganglion", "gros ganglion aisselle après griffe", "chaton maladie", "bartonella", "pustule griffe chat"],
    advice: [
      "Bénin chez les gens en bonne santé, mais peut causer l'apparition d'un très gros ganglion douloureux plusieurs semaines après la griffure.",
      "Si le ganglion persiste, un médecin peut prescrire un antibiotique."
    ]
  },
  {
    name: "lice",
    nameFr: "Pédiculose (Poux)",
    icon: "🦟",
    color: "#78716c",
    keywords: ["gratte tête enfant", "lentes", "poux école", "démangeaison cuir chevelu derriere oreille"],
    advice: [
      "Utilisez des lotions anti-poux à base de Diméticone (qui étouffent mécaniquement le poux). Les shampoings insecticides anciens sont toxiques et repoussent désormais les poux.",
      "Appliquez avec soin raie par raie et passez rigoureusement le peigne fin métallique.",
      "Lavez draps, serviettes, cols de veste, et bonnets de l'enfant touché."
    ]
  },
  {
    name: "bedbugs",
    nameFr: "Punaises de Lit (Morsures)",
    icon: "🛏️",
    color: "#b91c1c",
    keywords: ["boutons rouges alignés", "gratte matin lit", "taches noires draps sang", "hotel punaises lit", "piqué draps boutons en ligne"],
    advice: [
      "Les boutons en 'constellation' ou alignés 3 par 3 chez quelqu'un qui se réveille piqué incriminent fortement la punaise de lit.",
      "Laver à 60 toutes les affaires, placer ce qui n'est pas lavable au congélateur 72h.",
      "Faites impérativement appel à un intervenant professionnel qualifié pour régler définitivement l'infestation du matelas et des plinthes."
    ]
  },
  {
    name: "zika",
    nameFr: "Zika",
    icon: "🦟",
    color: "#818cf8",
    keywords: ["bouton apres piqure voyage", "conjonctivite sans pus fievre moustique", "zika bresil afrique", "femme enceinte moustique microcephalie"],
    advice: [
      "Bénin pour les adultes (syndrome pseudo-grippal), mais TRES DANGEREUX pour le foetus d'une femme enceinte (risque de microcéphalie / crâne petit).",
      "Évitez les zones d'épidémie si vous êtes (ou projetez d'être très vite) enceinte."
    ]
  },
  {
    name: "tapeworm_echinococcus",
    nameFr: "Échinococcose (Ver du renard/chien)",
    icon: "🦊",
    color: "#fbbf24",
    keywords: ["renard chassé fievre", "baie foret cueillies chien", "kyste foie échino", "renard fraise des bois"],
    advice: [
      "Transmise en mangeant des baies sauvages au ras du sol souillées par des déjections de renard ou chien.",
      "Ne cueillez et ne mangez JAMAIS de fruits et baies proches du sol crues dans les forêts."
    ]
  },

  // ── EXTENSION 20: DERMATOLOGIE ADDITIONNELLE ──
  {
    name: "impetigo",
    nameFr: "Impétigo",
    icon: "👦",
    color: "#f59e0b",
    keywords: ["croute miel enfant", "croûte jaune visage enfant", "boutons pourris bouche nez enfant", "bulles pus peau infectée", "impétigo"],
    advice: [
      "C'est une infection bactérienne très contagieuse chez les enfants.",
      "Consultez un médecin qui prescrira une pommade antibiotique, ou un antibiotique oral.",
      "Empêchez l'enfant de se gratter (sinon cela se propage partout sur son corps), et de levez l'enfant."
    ]
  },
  {
    name: "molluscum",
    nameFr: "Molluscum Contagiosum",
    icon: "🧴",
    color: "#fbcfe8",
    keywords: ["petites perles peau enfant", "boutons nombril translucide", "molluscum piscine enfant", "creux bouton peau blanche"],
    advice: [
      "Virus (poxvirus) attrapé couramment à la piscine par les jeunes enfants.",
      "Totalement bénin, cela finit par disparaître tout seul (entre plusieurs mois à 1 an ou 2).",
      "Si cela démange beaucoup ou gène l'enfant, un dermatologue peut les cureter ou appliquer des produits locaux."
    ]
  },
  {
    name: "vitiligo",
    nameFr: "Vitiligo",
    icon: "🦓",
    color: "#e2e8f0",
    keywords: ["taches blanches peau", "perd couleur peau contour yeux main", "vitiligo", "Michael Jackson maladie peau", "dépigmentation"],
    advice: [
      "Maladie où la peau perd sa mélanine (ses pigments), s'exprimant souvent par poussées (stress notamment).",
      "Protégez absolument ces zones du soleil, puisqu'elles n'ont plus la capacité naturelle de bronzer ou se protéger.",
      "Il existe des traitements de photothérapie (UVB) chez certains dermatologues pour limiter ou parfois repigmenter certaines zones."
    ]
  },
  {
    name: "alopecia_areata",
    nameFr: "Pelade (Alopécie Areata)",
    icon: "💇",
    color: "#64748b",
    keywords: ["trou cheveux rond pièce", "chute cheveux trou", "barbe tache sans poil glabre", "pelade", "trou dans la barbe brutal"],
    advice: [
      "C'est une chute de cheveux/poils localisée d'origine auto-immune.",
      "Ce n'est pas grave et dans de nombreux cas cela repousse tout seul en quelques mois.",
      "Consultez un dermatologue pour d'éventuels traitements locaux par cortisone pour stimuler la repousse."
    ]
  },
  {
    name: "pityriasis_versicolor",
    nameFr: "Pityriasis Versicolor (Champignon du soleil)",
    icon: "🐆",
    color: "#d97706",
    keywords: ["taches blanches bronzage", "dépigmentation dos torse l'été", "champignon soleil", "taches ocre peau été", "pityriasis"],
    advice: [
      "Ce sont des champignons qui bloquent le bronzage, créant l'aspect de 'taches blanches'.",
      "Il faut consulter pour obtenir un gel corporel antifongique (style Ketoderm) qu'on fait mousser sur tout le corps comme un gel douche.",
      "Ça ne part jamais tout seul si on ne traite pas la levure originelle."
    ]
  },
  {
    name: "erysipelas",
    nameFr: "Érysipèle (Dermohypodermite)",
    icon: "🦵",
    color: "#dc2626",
    keywords: ["grosse jambe rouge feu", "jambe bouillante douloureuse fievre", "rougeur énorme mollet gonflé brillante", "érysipèle"],
    advice: [
      "🔴 URGENCE BACTÉRIENNE. C'est une infection grave de la peau par un Streptocoque.",
      "Les antibiotiques oraux (type Amoxicilline) sont urgents face à un mollet rouge luisant et cuisant, souvent avec 39° de fièvre.",
      "Consultez sans faute un médecin le jour même."
    ]
  },
  {
    name: "boil",
    nameFr: "Furoncle / Abcès",
    icon: "🌋",
    color: "#991b1b",
    keywords: ["gros bouton horrible rouge", "boule pus chaude aisselle aine", "furoncle", "clou peau", "abcès monstrueux"],
    advice: [
      "C'est un staphylocoque qui a infecté un poil. NE LE PERCEZ JAMAIS VOUS-MÊME au risque d'une terrible dissémination.",
      "Appliquez des compresses d'eau chaude propre, lavez au savon antibactérien (Cyteal ou Hibiscrub).",
      "Si c'est très douloureux / rouge étendu (ou au visage!), consultez pour que le médecin l'incise."
    ]
  },
  {
    name: "hidradenitis",
    nameFr: "Hidradénite Suppurée (Maladie de Verneuil)",
    icon: "🧫",
    color: "#b91c1c",
    keywords: ["abcès répétition aisselle", "boules douloureuses purulentes pli de laine fesse", "verneuil maladie", "fistule aine abcès", "hidrosadénite"],
    advice: [
      "Arrêtez ABSOLUMENT le tabac, c'est le principal déclencheur majeur reconnu de cette inflammation chronique.",
      "Ne portez pas de vêtements trop serrées, évitez l'épilation agressive qui irrite les follicules.",
      "Consultez un dermatologue spécialisé, un traitement de fond est nécessaire."
    ]
  },
  {
    name: "ingrown_toenail",
    nameFr: "Ongle Incarné",
    icon: "🦶",
    color: "#ef4444",
    keywords: ["ongle gros orteil rouge pus", "ongle rentre dans chair pied douleur", "orteil panari ongle", "ongle incarné infection"],
    advice: [
      "Baignez votre pied dans de l'eau tiède avec de la Bétadine scrub ou du Dakin, 10 minutes chaque jour.",
      "Coupez vos ongles DROITS (ne courbez pas sur les côtés!).",
      "Filez chez le pédicure-podologue très rapidement. S'il y a trop d'infection (bourgeon), une chirurgie rapide de l'ongle peut s'imposer."
    ]
  },
  {
    name: "warts",
    nameFr: "Verrues Vulgaires / Plantaires",
    icon: "👣",
    color: "#a8a29e",
    keywords: ["corne sous le pied noire douleur", "excroissance doigt rugueuse", "verrue pied piscine", "papilloma", "poireau peau"],
    advice: [
      "Couvrez avec du vernis incolore ou du sparadrap pour ne pas la disséminer et l'étouffer.",
      "Prenez rdv avec un dermatologue pour un traitement cryogénique (azote liquide) si les produits de l'apothicairerie (acide salicylique) échouent."
    ]
  },

  // ── EXTENSION 21: RHUMATOLOGIE & ORTHOPÉDIE ADDITIONNELLE ──
  {
    name: "osteoporosis",
    nameFr: "Ostéoporose (Fracture spontanée)",
    icon: "🦴",
    color: "#f87171",
    keywords: ["os cassé tout seul", "fracture poignet chute simple", "tassement vertébral", "perte de taille os", "ostéoporose femme ménopausée"],
    advice: [
      "Si vous vous êtes fracturé un os suite à une chute de votre propre hauteur (sans élan), il faut faire une ostéodensitométrie.",
      "L'apport en calcium naturel (produits laitiers, certaines eaux minérales) combiné à la Vitamine D est essentiel.",
      "La marche active stimule la formation de l'os."
    ]
  },
  {
    name: "carpal_tunnel",
    nameFr: "Syndrome du Canal Carpien",
    icon: "✋",
    color: "#a78bfa",
    keywords: ["fourmis la nuit main", "engourdissement trois doigts", "lache les objets main", "douleur poignet remonte bras nuit", "canal carpien"],
    advice: [
      "Achetez une attelle de poignet rigide en pharmacie et portez-la TOUTES LES NUITS pendant un mois.",
      "Consultez un rhumatologue ou neurologue pour un électromyogramme (EMG).",
      "Évitez les mouvements répétitifs de torsion au travail."
    ]
  },
  {
    name: "dupuytren",
    nameFr: "Maladie de Dupuytren",
    icon: "🖖",
    color: "#b45309",
    keywords: ["doigt bloqué plié vers paume", "corde dure paume main", "nodosité creux de la main", "dupuytren", "annulaire courbé"],
    advice: [
      "Il s'agit d'un épaississement de la membrane dans la paume de la main (aponévrose).",
      "Ne forcez pas pour essayer de remettre le doigt droit, cela ne sert à rien.",
      "Consultez un chirurgien de la main lorsque vous n'arrivez plus à poser votre main à plat sur la table."
    ]
  },
  {
    name: "bursitis",
    nameFr: "Bursite / Hygroma",
    icon: "💪",
    color: "#f43f5e",
    keywords: ["grosse boule molle genou", "coude gonflé balle de tennis", "rougeur gonflement coude point d'appui", "bursite", "hygroma"],
    advice: [
      "Si la boule est rouge, brûlante et accompagnée de fièvre : URGENCE, c'est grave (bursite infectieuse).",
      "S'il n'y a pas de fièvre, c'est mécanique. Cessez de vous appuyer sur ce coude/genou.",
      "Mettez de la glace pour faire dégonfler et protégez l'articulation."
    ]
  },
  {
    name: "paget_disease",
    nameFr: "Maladie osseuse de Paget",
    icon: "💀",
    color: "#475569",
    keywords: ["os du crane s'épaissit", "chapeau trop petit", "douleur osseuse tibias arc", "os chaud au toucher", "paget maladie osseuse"],
    advice: [
      "C'est un remodelage osseux anormal très rapide.",
      "Si vous avez des douleurs osseuses sourdes et permanentes, un bilan sanguin (Phosphatases alcalines) et radiographique est utile.",
      "Il y a des traitements efficaces appelés bisphosphonates."
    ]
  },

  // ── EXTENSION 22: CARDIOLOGIE & VASCULAIRE ADDITIONNELLE ──
  {
    name: "pericarditis",
    nameFr: "Péricardite",
    icon: "🫀",
    color: "#991b1b",
    keywords: ["douleur coeur calmée assis penché avant", "douleur augmentant respire fort coeur", "fievre douleur poitrine", "péricardite inflammation enveloppe coeur"],
    advice: [
      "Toute douleur dans la poitrine doit vous faire passer par les URGENCES sans conduire vous-même.",
      "C'est une inflammation de l'enveloppe du cœur, très souvent d'origine virale bénigne et réagissant très bien à l'aspirine.",
      "Un ECG est indispensable."
    ]
  },
  {
    name: "aortic_dissection",
    nameFr: "Dissection Aortique",
    icon: "💥",
    color: "#7f1d1d",
    keywords: ["douleur déchirure dos", "douleur atroce transfixiante descend vers le bas", "hypertendu claque dans le dos poignard", "anévrisme déchirure aorte"],
    advice: [
      "🔴 URGENCE ABSOLUE, PRONOSTIC VITAL IMMÉDIAT.",
      "Douleur ressentie comme une déchirure violente, souvent entre les omoplates migrant vers le bas du dos.",
      "APPELEZ LE 15. Ne bougez plus."
    ]
  },
  {
    name: "endocarditis",
    nameFr: "Endocardite Infectieuse",
    icon: "🦠",
    color: "#c2410c",
    keywords: ["fièvre prolongée sans cause frissons", "souffle au coeur nouveau", "taches rouges ongles pulpe doigt", "infection valve coeur dent", "endocardite"],
    advice: [
      "Si vous avez de la fièvre qui ne passe pas, surtout si vous avez une valve cardiaque artificielle ou avez eu des soins dentaires récents : CONSULTEZ VITE.",
      "C'est une grave infection des valves cardiaques.",
      "Bilan sanguin (Hémocultures) impératif."
    ]
  },
  {
    name: "varicose_veins",
    nameFr: "Varices Sévères / Insuffisance Veineuse",
    icon: "🦵",
    color: "#2563eb",
    keywords: ["veines bleues gonflées mollet", "jambes lourdes fin journée", "cordon dur varice douloureuse", "phlébite superficielle varice"],
    advice: [
      "Si un cordon de veine devient subitement DUR, ROUGE et TRES DOULOUREUX : c'est une para-phlébite, consultez un médecin pour valider le traitement.",
      "Surélevez les pieds de votre lit pendant la nuit.",
      "Portez impérativement des bas de contention de classe 2 tous les jours dès le matin."
    ]
  },
  {
    name: "orthostatic_hypotension",
    nameFr: "Hypotension Orthostatique",
    icon: "📉",
    color: "#64748b",
    keywords: ["voile noir yeux se lève brillant", "tournis en se levant trop vite chair", "pression artérielle chute debout", "malaise vagal le matin étourdissement"],
    advice: [
      "Passez toujours par une position assise de 2 minutes sur le bord du lit avant de vous lever.",
      "Pensez à bien vous hydrater dès le réveil (avec un grand verre d'eau).",
      "Si vous prenez des médicaments pour l'hypertension, parlez à votre médecin pour peut-être ajuster la dose si elle est trop forte."
    ]
  },

  // ── EXTENSION 23: PNEUMOLOGIE ADDITIONNELLE ──
  {
    name: "copd",
    nameFr: "BPCO (Bronchite Chronique)",
    icon: "🚬",
    color: "#6b7280",
    keywords: ["fumeur tousse tous les matins", "crachat matin vieux fumeur", "essoufflement au moindre effort tabac", "bpco poumon emphysème"],
    advice: [
      "Cette maladie due au tabac obstrue les bronches progressivement.",
      "La seule solution (vitale) pour freiner l'évolution est l'arrêt IMMÉDIAT ET TOTAL DU TABAC.",
      "Consultez un pneumologue pour souffler dans une machine (EFR) et obtenir des inhalateurs pour dilater vos bronches."
    ]
  },
  {
    name: "cystic_fibrosis",
    nameFr: "Mucoviscidose",
    icon: "🫁",
    color: "#a8a29e",
    keywords: ["enfant toux très grasse diarrhée toujours", "sueur salée bébé", "infections poumons répétition enfance mucoviscidose", "pancréas poumons mucus épais"],
    advice: [
      "Généralement diagnostiquée à la naissance de nos jours.",
      "Suivi hyper-spécialisé en CRCM indispensable.",
      "Respectez de manière draconienne les séances quotidiennes de kinésithérapie respiratoire."
    ]
  },
  {
    name: "pneumothorax",
    nameFr: "Pneumothorax",
    icon: "🎈",
    color: "#0ea5e9",
    keywords: ["douleur en coup de poignard cou poitrine jeune homme grand", "essoufflé soudain", "air autour poumon décollé", "pneumothorax"],
    advice: [
      "🔴 URGENCE. L'air s'est échappé du poumon causant son affaissement.",
      "Spécifiquement brutal chez le jeune adulte grand et mince ou gros fumeur.",
      "Rendez-vous aux URGENCES. S'y rendre en ambulance allongée sans effort."
    ]
  },
  {
    name: "pleurisy",
    nameFr: "Pleurésie (Épanchement pleural)",
    icon: "🌊",
    color: "#3b82f6",
    keywords: ["eau dans les poumons", "douleur respire bloque inspiration", "fievre point de coté permanent", "pleurésie liquide plèvre"],
    advice: [
      "Consultez en urgence. De l'eau est présente autour du poumon, gênant l'expansion.",
      "Souvent consécutif à une complication infectieuse.",
      "Il faudra peut-être une ponction (piqure pour retirer le liquide) à l'hôpital."
    ]
  },
  {
    name: "pulmonary_fibrosis",
    nameFr: "Fibrose Pulmonaire",
    icon: "🍂",
    color: "#b45309",
    keywords: ["poumons cartonnés secs", "toux très sèche permanente mois", "ongles bombés en verre de montre", "bruit de velcro souffle fibrose"],
    advice: [
      "Consultez un pneumologue. Examen par scanner indispensable.",
      "Cette maladie rigidifie les poumons.",
      "L'arrêt du tabac et des expositions aux poussières toxiques est de la plus haute importance."
    ]
  },

  // ── EXTENSION 24: NEUROLOGIE ADDITIONNELLE ──
  {
    name: "als",
    nameFr: "SLA (Maladie de Charcot)",
    icon: "♿",
    color: "#1e293b",
    keywords: ["faiblesse main attrape plus obets", "muscles fondent atrophie", "fasciculation tressautement muscle constant sous peau", "SLA maladie amyotrophique", "charcot perd force paralysie"],
    advice: [
      "La maladie de Charcot n'affecte PAS la sensibilité, seulement la force musculaire.",
      "Toute faiblesse asymétrique progressive sans douleur justifie une IRM et un EMG en neurologie rapidement."
    ]
  },
  {
    name: "myasthenia",
    nameFr: "Myasthénie",
    icon: "👁️",
    color: "#8b5cf6",
    keywords: ["paupière tombe soir", "fatigue muscle machoire mâcher", "voit double soir myasthénie", "force disparait musculaire et revient repos"],
    advice: [
      "Symptôme typique : la fatigue musculaire S'AGGRAVE à l'effort au long de la journée et s'améliore au repos.",
      "S'il y a des difficultés à avaler ou à respirer : c'est une urgence vitale neurologique."
    ]
  },
  {
    name: "guillain_barre",
    nameFr: "Syndrome de Guillain-Barré",
    icon: "👣",
    color: "#dc2626",
    keywords: ["paralysie remonte pieds vers haut jours", "perte sensibilité fourmis commence pieds gagne genoux", "guillain barré gastro 15 jours", "faiblesse très rapide ascendante"],
    advice: [
      "🔴 URGENCE NEUROLOGIQUE ABSOLUE. Si vous sentez des faiblesses, un engourdissement remontant des pieds ou bout des mains jour après jour.",
      "Allez aux urgences d'un gros centre hospitalier (risque de paralysie complète incluant la respiration)."
    ]
  },
  {
    name: "trigeminal_neuralgia",
    nameFr: "Névralgie du Trijumeau",
    icon: "⚡",
    color: "#f59e0b",
    keywords: ["décharge électrique atroce visage", "éclair fulgurant joue machoire", "douleur suicide dent visage effleurement vent", "trijumeau névralgie"],
    advice: [
      "Douleur fulgurante insupportable provoquée par le vent, le brossage de dent ou l'effleurement de la joue.",
      "Consultez un neurologue : les antalgiques standards marchent très mal, il faut des traitements ciblés pour l'épilepsie nerveuse (Carbamazépine)."
    ]
  },
  {
    name: "bell_palsy",
    nameFr: "Paralysie Faciale (A frigore / de Bell)",
    icon: "🎭",
    color: "#38bdf8",
    keywords: ["visage tordu matin glace", "arrive plus à fermer oeil oeil ouvert", "bouche de travers boit fuit", "moitié joue paralysée coup froid", "paralysie de bell idiopathique"],
    advice: [
      "🔴 TOUTE paralysie du visage (bouche de travers) est un signe qu'IL FAUT ALLER AUX URGENCES (pour écarter un AVC).",
      "Si le médecin confirme que c'est une 'paralysie a frigore' : ce n'est pas grave (le nerf du visage a gonflé après un coup de froid/virus).",
      "Il FAUT mettre du Sérum physiologique et fermer l'oeil la nuit avec du sparadrap pour ne pas abimer la cornée."
    ]
  },
  {
    name: "restless_legs",
    nameFr: "Syndrome des Jambes Sans Repos",
    icon: "🦵",
    color: "#c026d3",
    keywords: ["impatience jambe soir couché", "besoin de bouger obliger se lever nuit marcher", "fourmis profonde jambe insupportable immobilité", "jambes sans repos", "impatiences nocturnes"],
    advice: [
      "Consultez votre médecin pour faire un bilan sanguin d'anémie : la CARENCE EN FER (ferritine basse) en est la toute première cause.",
      "Évitez la caféine après midi et réduisez l'alcool."
    ]
  },

  // ── EXTENSION 25: PSYCHIATRIE ADDITIONNELLE ──
  {
    name: "schizophrenia",
    nameFr: "Schizophrénie (Bouffée délirante)",
    icon: "🧠",
    color: "#7e22ce",
    keywords: ["entendre des voix personne hallucination", "impression complot parano télé m'envoie message message caché", "schizophrénie entendre télépathie", "persécution flic délire aigu"],
    advice: [
      "Il y a nécessité de faire une évaluation psychiatrique aux urgences si les hallucinations auditives poussent à faire des choses dangereuses pour soi ou autrui.",
      "N'agressez pas la personne dans ses croyances. Composez le 15 si la situation dégénère ou s'il y a un danger."
    ]
  },
  {
    name: "ocd",
    nameFr: "TOC (Trouble Obsessionnel Compulsif)",
    icon: "🔄",
    color: "#d97706",
    keywords: ["vérifie 20 fois porte fermée lavage de main obsédé peur germes", "oblige faire rituel sinon peur mort", "TOC pensée intrusive envahissante", "obsession compulsion"],
    advice: [
      "Vous avez conscience que c'est irrationnel mais vous n'arrivez pas à vous en empêcher. Ce n'est pas une fatalité.",
      "Prenez rdv pour une Thérapie Comportementale et Cognitive (TCC) avec un psychologue (le premier vrai traitement) couplée à un avis psychiatrique."
    ]
  },
  {
    name: "ptsd",
    nameFr: "Stress Post-Traumatique (TSPT)",
    icon: "💥",
    color: "#0f172a",
    keywords: ["revit traumatisme boucle cauchemar terreur agression sang", "sursaute au moindre bruit depuis accident flash back peur foule", "état stress post traumatique tspt emdr"],
    advice: [
      "Le cerveau revit la scène constamment sans réussir à en sortir.",
      "Les thérapies de retraitement cognitif (comme l'EMDR) donnent des résultats phénoménaux pour débloquer ces traumatismes.",
      "Renseignez-vous auprès d'un thérapeute certifié EMDR Europe."
    ]
  },
  {
    name: "adhd",
    nameFr: "TDAH (Hyperactivité)",
    icon: "⚡",
    color: "#fb923c",
    keywords: ["impossible concentrer adulte oubli tout fini jamais", "arrive pas rester assis réunion besoin bouger jambe hyperactivité", "tdah déficit attention trouble enfant adulte"],
    advice: [
      "Très sous-diagnostiqué chez l'adulte (surtout chez la femme). Si l'impact sur le travail/votre couple est énorme, consultez.",
      "Diagnostic nécessitant un spécialiste (Neuro-psychiatre, TDAH expert).",
      "Il existe des médications ultra-spécifiques et des stratégies comportementales puissantes."
    ]
  },

  // ── EXTENSION 26: UROLOGIE, NEPHROLOGIE & GYNECOLOGIE ADDITIONNELLE ──
  {
    name: "renal_failure_acute",
    nameFr: "Insuffisance Rénale Aiguë (Anurie)",
    icon: "🛑",
    color: "#1e1b4b",
    keywords: ["plus d'urine depuis 24h", "rien dans la vessie uriner impossible toxique medicament reins", "oligurie anurie", "insuffisance rénale bloque intoxication"],
    advice: [
      "🔴 URGENCE VITALE et TOXIQUE ABSOLUE. Si vous ne faîtes PLUS DU TOUT pipi (moins de l'équivalent d'un petit verre d'eau en 24h).",
      "Appelez le SAMU.",
      "Arrêtez TOUT médicament à part ceux que les secours vont vous dire de prendre."
    ]
  },
  {
    name: "testicular_torsion",
    nameFr: "Torsion Testiculaire",
    icon: "🍒",
    color: "#b91c1c",
    keywords: ["douleur testicule brutale ado foudroyante horreur", "testicule remonté dur augmenté volume jeune", "crise testicule torsion bourse nausée d'un seul coté"],
    advice: [
      "🔴 URGENCE VITALE DU TESTICULE. Vous avez MOINS de 6 HEURES avant que le testicule ne se nécrose (mort du testicule par asphyxie).",
      "Foncez aux urgences chirurgicales la plus proche sans hésiter.",
      "TOUTE douleur forte d'apparition brutale chez un homme jeune à cette zone est une torsion jusqu'à preuve du contraire."
    ]
  },
  {
    name: "prostate_cancer",
    nameFr: "Cancer de la Prostate (Signe indirect)",
    icon: "🎗️",
    color: "#475569",
    keywords: ["sang dans le sperme", "sang dans urine homme sans fievre vieux", "cancer prostate psa fort dos mal d'un coup fracture", "uriner bloqué total monsieur agé nuit cancer"],
    advice: [
      "Consultez un urologue assez vite, notamment s'il y a des douleurs osseuses nouvelles (dos, bassin) car c'est un point classique de métastases de ce cancer.",
      "Un toucher rectal et dosage du PSA permettront d'orienter le diagnostic de l'adénome ou du cancer."
    ]
  },
  {
    name: "ovarian_cyst_rupture",
    nameFr: "Rupture de Kyste Ovarien",
    icon: "💥",
    color: "#be185d",
    keywords: ["couteau abdos trompe ovaire explosion douleur atroce", "poignard ovaire femme malaise perte connaissance ventre fond", "kyste rompu peritoine ascite", "saignement vaginal tres mal soudain a un coté"],
    advice: [
      "🔴 URGENCE CHIRURGICALE & GYNECOLOGIQUE. Risque d'hémorragie interne grave et d'évanouissement. Rendez-vous aux urgences ou appele le 15 sans tarder.",
      "Difficile à distinguer d'une GEU ou d'une appendicite, mais la démarche d'urgence est LA MÊME."
    ]
  },

  // ── EXTENSION 27: PÉDIATRIE & NÉONATOLOGIE ADDITIONNELLE ──
  {
    name: "baby_bottle_tooth_decay",
    nameFr: "Syndrome du Biberon (Caries Précoces)",
    icon: "🍼",
    color: "#a16207",
    keywords: ["dents noires bébé", "carie laits enfant", "biberon sucré nuit dent", "dent pourrie enfant 2 ans"],
    advice: [
      "Le sucre contenu dans le biberon du soir ou de nuit détruit les dents de lait à grande vitesse.",
      "Ne donnez JAMAIS de jus de fruit ou de lait sucré pour endormir un bébé.",
      "Consultez un pédodontiste pour soigner ces dents de lait indispensables à la pousse des définitives."
    ]
  },
  {
    name: "infant_colic",
    nameFr: "Coliques du Nourrisson",
    icon: "👶",
    color: "#ef4444",
    keywords: ["bébé hurle soir", "bébé se tortille gaz", "bébé pleurniche ventre dur", "colique bébé", "pleurs inconsolables nourrisson"],
    advice: [
      "Totalement bénin mais très éprouvant pour les parents. Lié à l'immaturité du système digestif (jusqu'à 3-4 mois).",
      "Massez doucement le ventre dans le sens des aiguilles d'une montre.",
      "Portez votre bébé en écharpe ou faites du 'peau à peau' pour le soulager."
    ]
  },
  {
    name: "diaper_rash",
    nameFr: "Érythème Fessier Sévère",
    icon: "🍑",
    color: "#f87171",
    keywords: ["fesses rouges sang bébé", "couche brule fesse à vif", "érythème irrité couche peau cloques", "fesse bébé sang"],
    advice: [
      "Laissez les fesses de bébé à l'air libre le plus possible.",
      "Changements de couche très fréquents et nettoyage à l'eau simple + liniment.",
      "Si la peau est à vif ou suinte (possible surinfection par champignon), un médecin doit prescrire une pommade antifongique."
    ]
  },
  {
    name: "spina_bifida",
    nameFr: "Spina Bifida (Signes)",
    icon: "🚼",
    color: "#6b7280",
    keywords: ["touffe de poils bas du dos bebe", "fossette grosse bas du dos", "anomalie osseuse dos naissance", "jambe paralysée naissance bassin"],
    advice: [
      "Détecté le plus souvent in utero par échographie. Sinon, vu à la naissance.",
      "Un suivi dans un centre de référence (neuropédiatrie) est absolu pour gérer le retentissement moteur et urinaire."
    ]
  },
  {
    name: "psychomotor_delay",
    nameFr: "Retard Psychomoteur (Dépistage)",
    icon: "🧸",
    color: "#6366f1",
    keywords: ["bébé tient pas sa tête tard", "marche pas à 18 mois", "parle pas 2 ans", "bébé regarde pas dans les yeux", "enfant réagit pas son prénom"],
    advice: [
      "Tout doute sur le développement de votre enfant (moteur, communication, regard) nécessite une consultation rapide chez le pédiatre.",
      "Ne laissons pas 'le temps faire les choses', plus la prise en charge est précoce (orthophonie, psychomotricité), meilleurs sont les résultats."
    ]
  },

  // ── EXTENSION 28: GÉRIATRIE & GRAND ÂGE ──
  {
    name: "bedsore",
    nameFr: "Escarre",
    icon: "👴",
    color: "#b91c1c",
    keywords: ["trou noir fesse talon", "plaie profonde sacrum couché longtemps", "escarre agé immobile", "peau nécrosée talon lit"],
    advice: [
      "C'est dû à une pression continue privant la peau de sang. URGENCE NURSING.",
      "Changez la position de la personne alitée de force toutes les 3 heures.",
      "Lavez, séchez, mettez des matelas à air spécialisés. Une escarre non soignée peut se creuser jusqu'à l'os et tuer par septicémie."
    ]
  },
  {
    name: "malnutrition_elderly",
    nameFr: "Dénutrition (Personne Âgée)",
    icon: "🥣",
    color: "#d97706",
    keywords: ["mamie maigrit beaucoup frigo vide", "mange comme oiseau", "personne âgée perd du poids flottille habits", "dénutrition", "peau sur les os"],
    advice: [
      "La dénutrition fait fondre le muscle, causant chutes et perte d'autonomie accélérée.",
      "Enrichissez les petits repas : ajoutez du gruyère râpé, de la crème fraîche ou du beurre partout.",
      "Demandez au médecin des Compléments Nutritionnels Oraux (CNO) riches en protéines."
    ]
  },
  {
    name: "sarcopenia",
    nameFr: "Sarcopénie (Fonte musculaire)",
    icon: "💪",
    color: "#9ca3af",
    keywords: ["n'arrive plus se lever fauteuil cuisse molle", "muscle a fondu vieillard fauteuil", "sarcopénie marche difficile", "plus de force jambes 80 ans"],
    advice: [
      "Pertes de fibres musculaires avec l'âge (souvent couplé à la dénutrition).",
      "Faire marcher le sénior TOUS LES JOURS au moins 15-20 min est l'unique vrai traitement."
    ]
  },
  {
    name: "failure_to_thrive",
    nameFr: "Syndrome de Glissement",
    icon: "📉",
    color: "#1e293b",
    keywords: ["papie se laisse mourir couché mur", "refuse de tout manger boire tourne le dos", "syndrome de glissement ehpad abandon", "veut mourir ne bouge plus post traumatisme"],
    advice: [
      "C'est un véritable 'suicide inconscient' physique chez la personne âgée après un choc psychique ou opératoire.",
      "C'est une URGENCE GÉRIATRIQUE. Une hospitalisation ou traitement antidépresseur intense, couplé avec une forte affection et hydratation, est vitale."
    ]
  },
  {
    name: "repeated_falls",
    nameFr: "Chutes à Répétition",
    icon: "⚠️",
    color: "#fbbf24",
    keywords: ["tombe souvent maison", "tapis pied pris dedans age", "chute plusieurs fois par mois déambulateur", "déséquilibre permanent"],
    advice: [
      "Toute chute chez le sénior DOIT être signalée à son médecin.",
      "Adaptez l'environnement (éliminez les tapis, installez de bonnes lumières la nuit, barres de maintien Toilettes/Douche).",
      "Vérifiez que les lunettes sont à jour et faire un bilan ORL pour l'équilibre."
    ]
  },

  // ── EXTENSION 29: DENTAIRE & STOMATOLOGIE ADDITIONNELLE ──
  {
    name: "gingivitis",
    nameFr: "Gingivite",
    icon: "🦷",
    color: "#dc2626",
    keywords: ["gencives saignent toujours brossage", "gencives gonflées brillantes", "mal aux gencives", "gingivite tartre"],
    advice: [
      "Inflammation due à l'accumulation de plaque dentaire / tartre.",
      "Brossez-vous les dents 2 fois par jour, MINIMUM 2 minutes avec une brosse SOUPLE et utilisez du fil dentaire/brossettes le soir.",
      "Le saignement passera en 1 à 2 semaines si vous maintenez une hygiène stricte."
    ]
  },
  {
    name: "periodontitis",
    nameFr: "Parodontite",
    icon: "⚠️",
    color: "#7f1d1d",
    keywords: ["dents bougent machoire", "racine dent apparente dechaussement longue dent", "haleine épouvantable puanteur gencive os", "parodontite"],
    advice: [
      "Si vos gencives se rétractent (les dents paraissent plus longues) et commencent à bouger : c'est l'os qui est attaqué.",
      "Il est urgent de consulter un dentiste / parodontologue pour un surfaçage radiculaire (nettoyage en profondeur).",
      "Risque majeur de perdre TOUTES ses dents si non traité."
    ]
  },
  {
    name: "severe_aphthous",
    nameFr: "Aphtose Sévère",
    icon: "👅",
    color: "#f43f5e",
    keywords: ["bouche remplie de trous blancs douleurs", "aphtes partout manger impossible macher horreur", "trous langue lèvre brulure intense aphtes"],
    advice: [
      "Quelques aphtes sont souvent dus au stress ou certains aliments (noix, gruyère).",
      "Mais une aphtose *géante* ou *répétée continuellement* doit faire rechercher une carence en vitamines, fer, ou maladie inflammatoire (Behçet).",
      "Utilisez des bains de bouche sans alcool antalgiques le temps que ça passe."
    ]
  },
  {
    name: "oral_candidiasis",
    nameFr: "Candidose Buccale (Muguet de l'adulte)",
    icon: "🤍",
    color: "#fafafa",
    keywords: ["langue très blanche plâtre grattable", "enduit blanc épais lèvre et palais", "champignon bouche antibio", "candidose langue", "muguet adulte"],
    advice: [
      "Très fréquent après la prise d'antibiotiques forts ou si vous êtes asthmatique et prenez des sprays à la cortisone sans vous rincer la bouche.",
      "Un médecin vous prescrira un sirop ou gel antifongique (style Fungizone ou Daktarin)."
    ]
  },
  {
    name: "tmj_disorder",
    nameFr: "SADAM (Trouble Articulation Mâchoire)",
    icon: "💀",
    color: "#a78bfa",
    keywords: ["mâchoire claque baille", "mâchoire craque bruit sable douleur oreille devant", "n'arrive plus à ouvrir la bouche grand bloqué", "SADAM machoire", "bruxisme douleur joue"],
    advice: [
      "C'est un dérèglement de l'articulation de la mâchoire (Souvent lié au fait de serrer/grincer des dents la nuit = bruxisme).",
      "Consultez un dentiste ou un spécialiste occlusodontiste pour faire fabriquer une 'gouttière de désocclusion' à porter la nuit."
    ]
  },

  // ── EXTENSION 30: VOYAGE & INFECTIOLOGIE TROPICALE 2 ──
  {
    name: "sleeping_sickness",
    nameFr: "Maladie du Sommeil (Trypanosomiase)",
    icon: "🪰",
    color: "#854d0e",
    keywords: ["fievre mouche tsétsé dort tout le temps asie afrique", "voyage afrique somnolence coma fievre", "maladie du sommeil trypanosomiase"],
    advice: [
      "Transmise par la piqûre de la mouche tsé-tsé (Grosse mouche) en Afrique.",
      "Ce symptôme de grosse fatigue d'apparition lente nécessite de l'évoquer dans un service d'infectiologie si l'on revient de zone d'endémie."
    ]
  },
  {
    name: "leishmaniasis",
    nameFr: "Leishmaniose (Cutanée / Viscérale)",
    icon: "🦟",
    color: "#b45309",
    keywords: ["gros ulcère cratère peau qui guérit jamais retour voyage", "bouton de l'orient phlébotome", "chien piqué croute truffe viscères fievre afrique", "leishmaniose"],
    advice: [
      "Transmis par le Phlébotome (petit moustique des dunes de sables dans divers pays mais aussi Sud de l'Europe).",
      "Un ulcère ('cratère' sur la peau) indolore qui dure des mois au retour de voyage doit faire l'objet d'un prélèvement dermatologique."
    ]
  },
  {
    name: "chagas_disease",
    nameFr: "Maladie de Chagas",
    icon: "🪲",
    color: "#6b7280",
    keywords: ["fievre amazonie oeil hyper gonflé piqûre punaise reduve", "maladie coeur chagas voyage sud amérique", "punaise embrassante oeil gros fievre"],
    advice: [
      "Infection liée aux punaises 'réduves' d'Amérique du Sud/Centrale. Leurs déjections rentrent dans l'organisme quand on se gratte.",
      "Si votre oeil (un seul) devient très gonflé après une piqûre en Amérique du Sud, c'est le 'signe de Romaña'.",
      "Nécessite des antiparasitaires."
    ]
  },
  {
    name: "schistosomiasis",
    nameFr: "Bilharziose",
    icon: "🐌",
    color: "#0284c7",
    keywords: ["sang urine baignade afrique lac", "fievre grattage ventre nage douce afrique", "escargot eau douce bilharziose urticaire", "hématurie retour lac"],
    advice: [
      "S'attrape lorsque l'on se baigne dans de l'eau DOCUE (lacs, marigots) en Afrique, par des larves minuscules perçant la peau.",
      "Il ne faut JAMAIS se baigner en dehors des piscines chlorées ou l'océan dans les zones à risques.",
      "Du sang dans les urines post-voyage = recherche de bilharziose."
    ]
  },
  {
    name: "cholera",
    nameFr: "Choléra",
    icon: "🚽",
    color: "#0f766e",
    keywords: ["diarrhée eau de riz litres afrique", "diarrhée monstrueuse déshydratation", "épidémie voyage eau sale mourir soif", "choléra fèces litres"],
    advice: [
      "🔴 URGENCE ABSOLUE. La survie repose sur la réparation de l'énorme perte de liquides (les gens meurent secs en 24h).",
      "Buvez des sels de réhydratation de l'OMS immédiatement tout en rejoignant un centre médical."
    ]
  },

  // ── EXTENSION 31: NEUROLOGIE SPECIFIQUE 2 ──
  {
    name: "encephalitis",
    nameFr: "Encéphalite",
    icon: "🧠",
    color: "#7e22ce",
    keywords: ["cerveau infecté délire fievre confusion", "convulsions fievre perte conscience virus", "encéphalite herpès sommeil profond fievre"],
    advice: [
      "🔴 URGENCE VITALE (souvent virale, ex: Herpès). L'infection touche le cerveau lui-même (pas seulement l'enveloppe comme la méningite).",
      "Toute fièvre associée à de la confusion forte (« n'est plus du tout lui-même », dit des choses sans sens) ou des convulsions = SAMU 15."
    ]
  },
  {
    name: "hydrocephalus",
    nameFr: "Hydrocéphalie",
    icon: "👤",
    color: "#3b82f6",
    keywords: ["grosse tete bébé liquide", "troubles marche pipi lit demence etrange vieux", "liquide cerveau pression maux tete matin vomit", "hydrocéphalie valve"],
    advice: [
      "Chez le bébé, surveiller la taille du périmètre crânien (s'il augmente d'un coup, consulter en pédiatrie urgence).",
      "Chez l'adute âgé : Des oublis + incontinence urinaire récente + marche avec des petits pas 'magnétiques' => Pensez à l'hydrocéphalie à pression normale (guérissable chirurgicalement)."
    ]
  },
  {
    name: "arachnoiditis",
    nameFr: "Arachnoïdite",
    icon: "🕸️",
    color: "#a8a29e",
    keywords: ["douleur atroce permanente bas du dos après peridurale lombaire", "jambes brulent feu dechet moelle epiniere arachno", "kyste arachnoïdite moelle douleur dos assise brulante"],
    advice: [
      "Souvent suite à un traumatisme rachidien ou geste invasif (ponction lombaire).",
      "Les nerfs baignent dans du tissu cicatriciel qui les comprime et crée des douleurs brûlantes extrêmes.",
      "Nécessite une prise en charge en Centre Anti-Douleur très spécialisée."
    ]
  },
  {
    name: "huntington",
    nameFr: "Chorée de Huntington",
    icon: "🧬",
    color: "#4f46e5",
    keywords: ["mouvement anormaux danse corps incontrolable genetique age 40", "chorée danse maladie genetique perte cognitif ataxie", "huntington demence mouvement writhing familial parent"],
    advice: [
      "Maladie génétique, familiale incontournable si le parent de premier degré l'avait (+ de 50%).",
      "Les mouvements involontaires débutent souvent vers la trentaine/quarantaine.",
      "Des consultations en neurogénétique prédictive existent pour se faire tester en amont."
    ]
  },
  {
    name: "narcolepsy",
    nameFr: "Narcolepsie - Cataplexie",
    icon: "😴",
    color: "#3b82f6",
    keywords: ["dort brutalement crise tombe faim rire", "s'effondre perd force quand rigole emotion", "cataplexie tombe rire pleur narcolepsie s'endort partout", "sommeil profond irresistible journee flash"],
    advice: [
      "Attaques de sommeil foudroyantes impossibles à réprimer en pleine journée.",
      "La caractéristique majeure est que la perte de force ('cataplexie') arrive souvent lors d'une forte émotion (un fou rire ou peur).",
      "Orientation vers un centre des troubles du sommeil indispensable."
    ]
  },

  // ── EXTENSION 32: ONCOLOGIE & CANCÉROLOGIE (Signes d'appel) ──
  {
    name: "breast_cancer_sign",
    nameFr: "Cancer du Sein (Signe d'appel)",
    icon: "🎀",
    color: "#ec4899",
    keywords: ["boule dans le sein dure sans douleur", "mamelon qui rentre peau d'orange", "écoulement sang mamelon sein", "nodule sein aisselle", "cancer du sein boule"],
    advice: [
      "Toute boule dure, indolore, ou rétraction du mamelon nécessite une consultation en gynécologie ou chez votre médecin traitant.",
      "Une mammographie et une échographie mammaire vous seront prescrites.",
      "Ne paniquez pas, la majorité des boules sont de simples kystes bénins, mais il faut vérifier."
    ]
  },
  {
    name: "colorectal_cancer_sign",
    nameFr: "Cancer Colorectal (Signe d'appel)",
    icon: "🎗️",
    color: "#8b5cf6",
    keywords: ["sang dans les selles noir", "alternance diarrhée constipation soudaine", "anémie inexpliquée fatigue", "glaires sang fèces cancer colon", "faux besoins aller aux toilettes pour rien"],
    advice: [
      "La présence de sang (même rouge) ou des selles très noires comme du goudron justifie une consultation.",
      "Si vous avez plus de 50 ans ou des antécédents familiaux, une coloscopie est l'examen de référence à programmer.",
      "Participez au dépistage national tous les 2 ans."
    ]
  },
  {
    name: "lung_cancer_sign",
    nameFr: "Cancer du Poumon (Signe d'appel)",
    icon: "🫁",
    color: "#64748b",
    keywords: ["tousse du sang fumeur", "toux qui ne passe pas des mois", "voix cassée rauque depuis longtemps fumeur", "crachat sang hemoptysie", "douleur epaule bras fumeur pancoast"],
    advice: [
      "Cracher du sang (hémoptysie) ou avoir une toux qui change ou s'aggrave quand on est fumeur est une ALERTE MASCULINE ou FÉMININE MAJEURE.",
      "Consultez rapidement un médecin pour passer un scanner thoracique.",
      "Arrêter de fumer est la première urgence absolue."
    ]
  },
  {
    name: "pancreatic_cancer_sign",
    nameFr: "Cancer du Pancréas (Signe d'appel)",
    icon: "🎗️",
    color: "#f59e0b",
    keywords: ["jaunisse sans douleur soudaine", "amaigrissement massif tres rapide ventre", "douleur ceinture dos qui reveille fin de nuit", "cancer pancreas ictère prurit"],
    advice: [
      "Si votre peau et vos yeux deviennent jaunes (ictère) sans aucune douleur, et que vos urines sont foncées, consultez aux urgences ou votre médecin le jour même.",
      "Une perte de poids massive et inexpliquée nécessite un scanner abdominal rapide."
    ]
  },
  {
    name: "brain_tumor_sign",
    nameFr: "Tumeur Cérébrale (Signe d'appel)",
    icon: "🧠",
    color: "#334155",
    keywords: ["maux de tete matin vomissement en jet", "crise d'epilepsie adulte soudaine", "changement de personnalite frontal", "double vision perte vue d'un coup tete", "faiblesse un coté qui s'aggrave tumeur"],
    advice: [
      "Des maux de tête qui apparaissent principalement le matin et vous font vomir soudainement justifient une IRM cérébrale.",
      "Une crise d'épilepsie qui survient pour la première fois à l'âge adulte est une urgence neurologique."
    ]
  },

  // ── EXTENSION 33: HÉMATOLOGIE & MALADIES DU SANG ──
  {
    name: "leukemia",
    nameFr: "Leucémie Aiguë",
    icon: "🩸",
    color: "#dc2626",
    keywords: ["bleus partout sans choc", "saigne des gencives nez sans arret", "fievre qui ne baisse pas globules blancs", "leucemie epuisement taches rouges peau blafard", "paleur extreme soudaine"],
    advice: [
      "L'apparition spontanée de dizaines d'hématomes (bleus), de petits points rouges (pétéchies) sous la peau et d'une fatigue extrême est une URGENCE ABSOLUE.",
      "Faites une prise de sang (NFS) dans la journée via les Urgences ou votre médecin."
    ]
  },
  {
    name: "lymphoma",
    nameFr: "Lymphome (Hodgkin / Non-Hodgkin)",
    icon: "🫁",
    color: "#7c3aed",
    keywords: ["gros ganglion cou aisselle qui grossit sans douleur", "sueurs nocturnes trempe les draps", "perte de poids ganglion", "demangeaisons tout le corps prurit lymphome", "grosse boule cou pas mal"],
    advice: [
      "Un gros ganglion indolore (dans le cou, aisselle, aine) qui dure plus de 3 semaines, accompagné de sueurs nocturnes abondantes, nécessite une biopsie.",
      "Consultez votre médecin pour une échographie ganglionnaire et une prise de sang."
    ]
  },
  {
    name: "sickle_cell",
    nameFr: "Drépanocytose (Crise Vaso-Occlusive)",
    icon: "🧬",
    color: "#991b1b",
    keywords: ["douleur os atroce africain fievre", "crise douleur articulaire noir", "drépanocytose globule rouge faucille", "douleur bras jambe insupportable anemie"],
    advice: [
      "Si vous êtes drépanocytaire connu et en crise douloureuse ne cédant pas au traitement habituel (paracétamol/tramadol), allez aux URGENCES.",
      "Hydratez-vous massivement.",
      "C'est une obstruction des vaisseaux sanguins par les globules rouges déformés."
    ]
  },
  {
    name: "hemophilia",
    nameFr: "Hémophilie / Maladie de Willebrand",
    icon: "💉",
    color: "#b91c1c",
    keywords: ["saigne trop longtemps coupure", "hemorragie dentiste arrete pas", "genou rempli de sang hemarthrose", "trouble coagulation hemophilie"],
    advice: [
      "Un saignement qui ne s'arrête pas au bout de 20 min de compression stricte nécessite des soins médicaux urgents.",
      "Si vos genoux enflent et se remplissent de sang (hémarthrose), un suivi en centre de traitement de l'hémophilie est vital."
    ]
  },
  {
    name: "deep_vein_thrombosis",
    nameFr: "Thrombose Veineuse Profonde (Phlébite profonde)",
    icon: "🦵",
    color: "#1d4ed8",
    keywords: ["mollet dur douloureux chaud rouge", "jambe gonfle d'un coup douleur sourde", "phlébite avion", "thrombose cuisse bloquée"],
    advice: [
      "🔴 URGENCE ÉCHO-DOPPLER. C'est un caillot dans la veine de la jambe.",
      "Si le caillot remonte au cœur, cela donne l'embolie pulmonaire (mortelle).",
      "Rendez-vous aux urgences ou appelez le 15. Surtout, NE MASSEZ PAS LE MOLLET pour ne pas détacher le caillot."
    ]
  },

  // ── EXTENSION 34: ENDOCRINOLOGIE AVANCÉE ──
  {
    name: "acromegaly",
    nameFr: "Acromégalie",
    icon: "🖐️",
    color: "#475569",
    keywords: ["mains grossissent bague trop petite", "pieds pointure augmente adulte", "machoire s'elargit visage change", "grosse voix acromégalie hormone croissance"],
    advice: [
      "Excès d'hormone de croissance chez l'adulte (souvent d'origine hypophysaire).",
      "Consultez un endocrinologue. Ce changement très lent morphologique est caractéristique.",
      "Un dosage de l'IGF-1 et une IRM de l'hypophyse seront effectués."
    ]
  },
  {
    name: "hyperparathyroidism",
    nameFr: "Hyperparathyroïdie",
    icon: "🦴",
    color: "#ca8a04",
    keywords: ["calcium trop haut sang", "calculs renaux a repetition", "fatigue osseuse parathyroide", "décalcification os urines"],
    advice: [
      "Vos glandes parathyroïdes sécrètent trop d'hormones, ce qui vide vos os de leur calcium.",
      "C'est la cause numéro 1 d'un calcium sanguin chroniquement trop élevé.",
      "Consultez un endocrinologue, une petite chirurgie peut s'imposer."
    ]
  },
  {
    name: "polycystic_ovary_syndrome",
    nameFr: "SOPK (Ovaires Polykystiques)",
    icon: "♀️",
    color: "#db2777",
    keywords: ["poils menton ventre femme hirsutisme", "regles tres irregulieres absentes", "acné femme adulte prise de poids", "sopk kyste ovaire"],
    advice: [
      "Syndrome très fréquent causant une anovulation et une hyperandrogénie (excès de testostérone).",
      "Prenez rendez-vous avec un(e) gynécologue ou endocrinologue.",
      "Une perte de poids même minime et des traitements hormonaux aident énormément."
    ]
  },
  {
    name: "diabetes_insipidus",
    nameFr: "Diabète Insipide",
    icon: "💧",
    color: "#0ea5e9",
    keywords: ["boit 10 litres d'eau par jour", "soif inextinguible pipi transparent litres", "diabete insipide hypophyse rein"],
    advice: [
      "Ce n'est PAS un problème de sucre, mais un défaut d'une hormone (ADH) qui empêche les reins de retenir l'eau.",
      "Consultez un médecin rapidement car le risque de déshydratation est mortel si vous cessez de boire ou vous endormez.",
      "Un traitement par desmopressine arrête le symptôme magiquement."
    ]
  },
  {
    name: "pheochromocytoma",
    nameFr: "Phéochromocytome",
    icon: "⚡",
    color: "#b91c1c",
    keywords: ["pression arterielle 20 paleur sueur", "crises hypertensives d'un coup", "palpitation sueurs maux de tete 3 trucs", "pheochromocytome surrenale adrenaline"],
    advice: [
      "Tumeur très rare de la glande surrénale créant des décharges massives d'adrénaline.",
      "La triade classique est : Maux de tête + Sueurs profuses + Palpitations intenses accompagnées d'hypertension sévère.",
      "Consultez un endocrinologue en urgence relative."
    ]
  },

  // ── EXTENSION 35: GASTRO-ENTÉROLOGIE AVANCÉE ──
  {
    name: "celiac_disease",
    nameFr: "Maladie Cœliaque (Intolérance au gluten)",
    icon: "🌾",
    color: "#d97706",
    keywords: ["maux ventre pain", "ballonnement diarrhée gluten blé", "fatigue cœliaque malabsorption anticorps", "intestin grêle gluten atrophie villositaire"],
    advice: [
      "Ce n'est pas une simple sensibilité mais une vraie maladie auto-immune d'origine génétique.",
      "Il FAUT continuer à manger du gluten jusqu'à la prise de sang (Anticorps anti-transglutaminase) pour que le test marche.",
      "Le seul traitement est l'éviction stricte du gluten A VIE."
    ]
  },
  {
    name: "liver_cirrhosis",
    nameFr: "Cirrhose Hépatique (Décompensée)",
    icon: "🍷",
    color: "#b45309",
    keywords: ["gros ventre eau ascite", "vomit du sang oesophage alcool", "jaune peau cirrhose foie dur", "confusion foie encephalopathie"],
    advice: [
      "🔴 URGENCE VITALE si vous vomissez du sang (rupture de varices de l'oesophage) ou si confusion (encéphalopathie hépatique). APPELEZ LE 15.",
      "Le foie est cicatriciel et dur (souvent dû à l'alcool ou à un virus).",
      "L'arrêt absolu de toute goutte d'alcool est l'unique survie possible sans greffe."
    ]
  },
  {
    name: "bowel_obstruction",
    nameFr: "Occlusion Intestinale",
    icon: "🛑",
    color: "#7f1d1d",
    keywords: ["vomit matiere fecale", "plus de gaz plus de selles", "ventre gonflé dur douleur atroce vagues", "occlusion intestin barriere"],
    advice: [
      "🔴 URGENCE CHIRURGICALE. L'intestin est bloqué.",
      "Si vous n'émettez PLUS AUCUN GAZ (pet) ni selles depuis 24h et que le ventre ballonne affreusement avec vomissements.",
      "Foncez aux URGENCES. Surtout pas de laxatif de la pharmacie, cela pourrait faire exploser l'intestin."
    ]
  },
  {
    name: "diverticulitis",
    nameFr: "Sigmoïdite (Diverticulite)",
    icon: "🔥",
    color: "#dc2626",
    keywords: ["douleur comme appendicite mais à gauche", "fievre mal au ventre en bas a gauche", "sigmoidite diverticule infecté colon"],
    advice: [
      "C'est une infection de petites poches (diverticules) sur le colon, souvent en bas à GAUCHE.",
      "Souvent appelée 'l'appendicite à gauche'.",
      "Consultez en urgence (risque de péritonite). On vous prescrira scanner et antibiotiques, voire chirurgie."
    ]
  },
  {
    name: "achalasia",
    nameFr: "Achalasie de l'œsophage",
    icon: "🚱",
    color: "#6b7280",
    keywords: ["aliments coincent avaler impossible", "remonte la nourriture oesophage", "aval l'eau ca bloque spasme oesophage", "pense a un cancer mais trouve rien achalasie"],
    advice: [
      "C'est un trouble rare où le muscle en bas de l'œsophage ne se relâche pas pour laisser passer la nourriture.",
      "Consultez un gastro-entérologue pour une manométrie œsophagienne.",
      "Mangez de petites portions liquides en attendant."
    ]
  },

  // ── EXTENSION 36: OPHTALMOLOGIE AVANCÉE ──
  {
    name: "macular_degeneration",
    nameFr: "DMLA (Dégénérescence Maculaire)",
    icon: "👁️",
    color: "#a8a29e",
    keywords: ["tache noire au milieu vision vieux", "lignes droites deformees gondolees age", "voit plus au centre DMLA", "macula oeil tache"],
    advice: [
      "Maladie de la rétine liée à l'âge.",
      "Si les lignes de carrelage au sol vous paraissent subitement VAGUÉES ou TORDUES, consultez VITE un ophtalmologiste.",
      "Il existe des piqures dans l'oeil très efficaces pour la forme 'humide'."
    ]
  },
  {
    name: "cataract",
    nameFr: "Cataracte",
    icon: "🌫️",
    color: "#d1d5db",
    keywords: ["vue trouble brouillard age", "ébloui par les phares la nuit oeil", "cristallin opaque blanc cataracte", "voile blanc devant les yeux progressif"],
    advice: [
      "Le cristallin (la lentille de l'œil) s'opacifie avec le temps.",
      "Prenez rdv chez l'ophtalmo pour prévoir une opération chirurgicale (une des plus sûres et pratiquées au monde) pour remplacer le cristallin."
    ]
  },
  {
    name: "optic_neuritis",
    nameFr: "Névrite Optique (Signe SEP)",
    icon: "⚡",
    color: "#8b5cf6",
    keywords: ["perte vue d'un oeil d'un coup douleur oeil qui bouge", "sclerose plaque oeil voile noir couleur change", "nevrite optique douleur globe"],
    advice: [
      "🔴 Poussée oculaire : la perte soudaine de la vue à un oeil AVEC une douleur à l'arrière de l'œil lors de ses mouvements.",
      "Consultez les Urgences Ophtalmologiques IMMÉDIATEMENT.",
      "Peut être un premier signe de Sclérose en Plaques."
    ]
  },
  {
    name: "uveitis",
    nameFr: "Uvéite",
    icon: "🔴",
    color: "#dc2626",
    keywords: ["oeil très rouge douloureux soleil ebloui", "pupille irreguliere oeil mal tete", "uveite inflammation oeil auto immune"],
    advice: [
      "Inflammation sévère à l'intérieur de l'œil. L'œil est ROUGE FIXE et la lumière fait très mal (photophobie).",
      "Urgence ophtalmologique (risque de séquelles sur la vue).",
      "Parfois liée à une maladie rhumatologique (Spondylarthrite)."
    ]
  },
  {
    name: "corneal_ulcer",
    nameFr: "Ulcère de la Cornée / Abcès sous lentille",
    icon: "👁️",
    color: "#ea580c",
    keywords: ["dormi avec lentille oeil rouge horrible douleur", "point blanc sur l'oeil", "ulcere cornee lentille de contact infection"],
    advice: [
      "🔴 URGENCE EXTRÊME : Si vous portez des lentilles et avez l'œil rouge/très douloureux.",
      "Retirez la lentille TOUT DE SUITE et allez aux URGENCES OPHTALMOLOGIQUES (pas aux urgences générales si possible).",
      "Il faut des gouttes antibiotiques fortifiées pour sauver l'œil."
    ]
  },

  // ── EXTENSION 37: ORL AVANCÉ ──
  {
    name: "menieres_disease",
    nameFr: "Maladie de Ménière",
    icon: "🌀",
    color: "#14b8a6",
    keywords: ["crise vertige tourne bruit oreille oreille bouchée", "bourdonnement vertige vomi accouphene triade meniere", "oreille pleine eau impression vertige positionnel fort"],
    advice: [
      "Crises intenses associant 3 signes : vertige rotatoire + bourdonnements d'oreille (acouphène) + baisse d'audition d'un côté.",
      "Allongez-vous dans le noir absolu lors de la crise sans bouger.",
      "Consultez un ORL pour un traitement de fond."
    ]
  },
  {
    name: "epiglottitis",
    nameFr: "Épiglottite",
    icon: "🔥",
    color: "#991b1b",
    keywords: ["enfant n'arrive plus a avaler bave etouffe fievre", "voix etouffée veut rester assis penché avant epiglottite", "respire tres mal gorge bloquee enfant"],
    advice: [
      "🔴 URGENCE VITALE (souvent chez l'enfant non vacciné contre l'Haemophilus).",
      "L'enfant a une forte fièvre, BAVE car il ne peut plus avaler, et veut rester assis penché en avant.",
      "NE L'ALLONGEZ JAMAIS, APPELEZ LE 15. Ne regardez pas au fond de sa gorge."
    ]
  },
  {
    name: "vocal_cord_nodules",
    nameFr: "Nodules des cordes vocales",
    icon: "🗣️",
    color: "#f59e0b",
    keywords: ["voix cassée permanente chanteur", "raucité voix force nodule polype prof", "arrive plus a chanter voix fatiguee laryngite chronique"],
    advice: [
      "Souvent lié au surmenage vocal (professeurs, chanteurs).",
      "Le repos vocal absolu pendant quelques jours est indispensable.",
      "Consultez un ORL puis un orthophoniste."
    ]
  },
  {
    name: "cholesteatoma",
    nameFr: "Cholestéatome",
    icon: "👂",
    color: "#a8a29e",
    keywords: ["coule pus oreille odeur ignoble puant", "otite qui coule toujours mal entend trou tympan", "cholesteatome oreille destruction os"],
    advice: [
      "Un écoulement d'oreille à l'odeur très nauséabonde (fétide) de longue date.",
      "C'est une 'peau poussant au mauvais endroit' qui détruit les osselets de l'oreille.",
      "Consultez un chirurgien ORL. C'est dangereux à long terme."
    ]
  },
  {
    name: "anosmia",
    nameFr: "Anosmie (Perte d'odorat persistante)",
    icon: "👃",
    color: "#9ca3af",
    keywords: ["sens plus rien nez odeur gout parti covid polypes", "gout et odeur perdus nez bouché", "anosmie polipose nasale"],
    advice: [
      "Prendre RDV avec l'ORL pour voir s'il y a des polypes dans le nez qui bloquent le nerf olfactif.",
      "Rééduquez votre nez en sentant 4 huiles essentielles (citron, eucalyptus, rose, clou de girofle) matin et soir aveuglément."
    ]
  },

  // ── EXTENSION 38: MALADIES AUTO-IMMUNES RARES (Rhumatologie & Médecine Interne) ──
  {
    name: "scleroderma",
    nameFr: "Sclérodermie Systémique",
    icon: "🖖",
    color: "#475569",
    keywords: ["peau dure visage bras", "doigts blancs froids bleu raynaud", "bouche petite levres dures sclerodermie", "nez pointu maladie peau durcit"],
    advice: [
      "Maladie où le collagène s'accumule et durcit la peau et les organes.",
      "Consultez un médecin interniste.",
      "Protégez-vous absolument du froid (gants) pour vos doigts."
    ]
  },
  {
    name: "sjogren_syndrome",
    nameFr: "Syndrome de Gougerot-Sjögren",
    icon: "🌵",
    color: "#eab308",
    keywords: ["yeux tres secs bouche seche salive", "besoin eau pour manger sans arret", "syndrome sec yeux sables sjogren", "plus de larmes auto immuno"],
    advice: [
      "Maladie auto-immune qui attaque les glandes salivaires et lacrymales.",
      "L'utilisation intensive de substituts lacrymaux (larmes artificielles) et de gels salivaires est requise.",
      "Prenez RDV en médecine interne ou rhumatologie."
    ]
  },
  {
    name: "polymyalgia_rheumatica",
    nameFr: "Horton / Pseudo-Polyarthrite Rhizomélique (PPR)",
    icon: "👴",
    color: "#be123c",
    keywords: ["douleur epaule hanche vieux matin raide bras lever", "mal a macher douleur machoire tempe", "Horton vaisseau enflammé aveugle", "raideur epaule vieux corticoides magique"],
    advice: [
      "🔴 URGENCE si vous avez mal aux TEMPES, que vous voyez double/flou ou avez mal en mâchant.",
      "C'est la Maladie de Horton : risque d'aveuglement irréversible dans les jours qui suivent sans forte dose de Cortisone.",
      "Faites une prise de sang en urgence absolue (CRP explosée)."
    ]
  },
  {
    name: "sarcoidosis",
    nameFr: "Sarcoïdose",
    icon: "🔴",
    color: "#8b5cf6",
    keywords: ["boules rouges tibias douloureux erytheme noueux", "toux poumon ganglions radio", "sarcoidose fatigue oeil poumon", "yeux rouges poumon toux"],
    advice: [
      "Maladie inflammatoire de cause inconnue (granulomes) touchant surtout les poumons, la peau, et les ganglions.",
      "Typique : boules rouges et douloureuses sous la peau des tibias (Érythème noueux).",
      "Consultez un pneumologue ou médecine interne."
    ]
  },
  {
    name: "wegeners_granulomatosis",
    nameFr: "Maladie de Wegener (Granulomatose avec polyangéite)",
    icon: "👃",
    color: "#b91c1c",
    keywords: ["saigne du nez bcp sinusite croute sang nez poumon rein", "wegener vascularite", "nez pétéchies fievre poumon sang"],
    advice: [
      "Une 'sinusite' avec beaucoup de croûtes dans le nez et des saignements qui résiste à tout, associée parfois à du sang dans les urines.",
      "C'est une vascularite très grave. Consultation médicale spécialisée URGENTE."
    ]
  },

  // ── EXTENSION 39: PÉDIATRIE RARE & GÉNÉTIQUE ──
  {
    name: "cystic_fibrosis_ped",
    nameFr: "Mucoviscidose (Signes pédiatriques)",
    icon: "👶",
    color: "#64748b",
    keywords: ["bebe sueur tres salee peau salé", "toux degeu bebe depuis naissance", "selles tres grasses bizarres enfant", "mucoviscidose retard de croissance"],
    advice: [
      "Souvent dépistée à la naissance. Si votre enfant a une sueur qui a 'le goût du sel' et tousse gras perpétuellement.",
      "Consultez un pédiatre pour un test de la sueur.",
      "Un suivi en CRCM (Centre de Ressources ou de Compétences de la Mucoviscidose) est essentiel."
    ]
  },
  {
    name: "phenylketonuria",
    nameFr: "Phénylcétonurie",
    icon: "🧬",
    color: "#9ca3af",
    keywords: ["retard mental bebe urine odeur souris", "phenilcetonurie pcu depot cerveau", "test de guthrie bebe anomalie nourriture"],
    advice: [
      "Dépistée au 3e jour de vie (Test de Guthrie).",
      "Il s'agit d'une incapacité à dégrader la phénylalanine (présente dans les protéines).",
      "Un régime alimentaire EXTRÊMEMENT STRICT sans protéines permet un développement intellectuel 100% normal."
    ]
  },
  {
    name: "turner_syndrome",
    nameFr: "Syndrome de Turner",
    icon: "👧",
    color: "#d8b4fe",
    keywords: ["petite fille tres petite cou large", "pas de puberte ado fille ovaires", "syndrome turner x0 genetique", "cou palmé taille tres petite"],
    advice: [
      "Touche uniquement les filles (manque un chromosome X).",
      "Provoque une petite taille et une absence de puberté spontanée.",
      "Consultez un endocrinologue pédiatrique pour un traitement par hormone de croissance et oestrogènes."
    ]
  },
  {
    name: "klinefelter_syndrome",
    nameFr: "Syndrome de Klinefelter",
    icon: "👦",
    color: "#93c5fd",
    keywords: ["garcon grand longs bras petit testicules", "puberte retardee garcon gynecomastie", "klinefelter xxy homme sterile"],
    advice: [
      "Touche uniquement les garçons (Chromosome X supplémentaire : XXY).",
      "Entraîne une grande taille, de très petits testicules et une infertilité à l'âge adulte.",
      "Un traitement par testostérone à la puberté est souvent nécessaire."
    ]
  },
  {
    name: "autism_spectrum",
    nameFr: "Troubles du Spectre Autistique (TSA)",
    icon: "🧩",
    color: "#3b82f6",
    keywords: ["bebe ne regarde pas dans les yeux", "enfant aligne les jouets pas de mot 2 ans", "ne repond pas a son prenom sourd bebe", "autisme asperger crise bruit", "balancement bebe mains flap flap"],
    advice: [
      "Si un bébé de 18 mois ne pointe pas du doigt, ne répond pas à son prénom ou évite le regard, c'est une ALERTE.",
      "Consultez un pédopsychiatre, neuropédiatre ou un CRA (Centre Ressources Autisme) pour un bilan.",
      "La prise en charge précoce (orthophonie, psychomotricité) est déterminante."
    ]
  },

  // ── EXTENSION 40: GYNÉCOLOGIE & OBSTÉTRIQUE (Pathologies Mammaires & Grossesse) ──
  {
    name: "fibroadenoma",
    nameFr: "Adénofibrome du Sein",
    icon: "🎀",
    color: "#fbcfe8",
    keywords: ["petite boule qui roule sous doigt sein jeune", "bille dans le sein bouge", "fibroadenome jeune fille"],
    advice: [
      "Très fréquent chez les femmes jeunes (20-30 ans). Tumeur bénigne ('boule' dure, lisse et très mobile sous le doigt sans douleur).",
      "Une échographie mammaire permet de confirmer et de rassurer.",
      "Il n'y a pas de risque de transformation en cancer."
    ]
  },
  {
    name: "mastitis",
    nameFr: "Mastite (Infection du Sein)",
    icon: "🤱",
    color: "#ef4444",
    keywords: ["sein rouge chaud douloureux allaitement", "fievre mal au sein donne le lait", "mastite engorgement sein frissons boule"],
    advice: [
      "Fréquent lors de l'allaitement. Le sein est dur, rouge, chaud, et vous avez de la fièvre (comme une grippe).",
      "IL FAUT CONTINUER à faire téter le bébé (ou tirer le lait) pour vider le sein, même si ça fait mal.",
      "Si la fièvre dure > 24h, consultez pour avoir des antibiotiques compatibles avec l'allaitement."
    ]
  },
  {
    name: "preeclampsia",
    nameFr: "Pré-éclampsie (Signes Urgents)",
    icon: "🤰",
    color: "#b91c1c",
    keywords: ["enceinte mouche devant les yeux tension", "grossesse gonfle visage doigt maux de tete", "barre estomac enceinte tension", "preeclampsie eclampsie toxemie"],
    advice: [
      "🔴 URGENCE OBSTÉTRICALE ABSOLUE de la fin de grossesse.",
      "Symptômes : Tension élevée + Mouches volantes dans les yeux (phosphènes) + Bourdonnements d'oreille + Douleur 'en barre' à l'estomac.",
      "Foncez aux URGENCES MATERNITÉ. Risque mortel pour la mère et le bébé."
    ]
  },
  {
    name: "gestational_diabetes",
    nameFr: "Diabète Gestationnel",
    icon: "🍬",
    color: "#f59e0b",
    keywords: ["sucre enceinte test o sullivan", "bebe trop gros echographie diabete grossesse", "diabete femme enceinte test degueulasse"],
    advice: [
      "Diabète apparaissant pendant la grossesse et disparaissant après l'accouchement.",
      "Nécessite de contrôler sa glycémie avec un appareil plusieurs fois par jour au bout du doigt.",
      "Sans contrôle (régime voire insuline), le bébé risque de devenir très gros (macrosomie) rendant l'accouchement difficile."
    ]
  },
  {
    name: "hyperemesis_gravidarum",
    nameFr: "Hyperémèse Gravidique",
    icon: "🤢",
    color: "#a3e635",
    keywords: ["enceinte vomit 20 fois par jour eau", "garde rien dans le ventre grossesse", "hyperemese gravidique deshydrate perte 5 kg enceinte"],
    advice: [
      "Ce ne sont pas des simples nausées matinales, mais des vomissements INTRAITABLES qui font perdre plus de 5% de son poids initial.",
      "Consultez les Urgences maternité: vous risquez une déshydratation sévère et des carences (Vitamine B1).",
      "Des perfusions sont souvent nécessaires à l'hôpital."
    ]
  },

  // ── EXTENSION 41: URO-NÉPHROLOGIE AVANCÉE ──
  {
    name: "nephrotic_syndrome",
    nameFr: "Syndrome Néphrotique",
    icon: "💧",
    color: "#60a5fa",
    keywords: ["urine hyper mousseuse", "gonfle de partout oedeme paupiere matin urines mousse", "syndrome nephrotique proteines urines", "rein fuit proteine eau"],
    advice: [
      "Le rein fuit massivement les protéines dans les urines (qui deviennent très mousseuses).",
      "L'eau fuit aussi dans les tissus, causant des œdèmes majeurs (visage très gonflé le matin).",
      "Consultez un néphrologue rapidement."
    ]
  },
  {
    name: "polycystic_kidney",
    nameFr: "Polykystose Rénale (PKD)",
    icon: "🍇",
    color: "#8b5cf6",
    keywords: ["reins pleins de kystes genetique famille", "gros reins douleur sang urines kyste", "polykystose familiale pkd insuffisance renale"],
    advice: [
      "Maladie génétique très courante (héréditaire 50% de risque si parent atteint).",
      "Les reins se remplissent de kystes avec le temps et grossement considérablement.",
      "Nécessite un suivi strict de la tension artérielle par un néphrologue."
    ]
  },
  {
    name: "bladder_cancer_sign",
    nameFr: "Cancer de la Vessie (Signe d'appel)",
    icon: "🩸",
    color: "#dc2626",
    keywords: ["pipi rouge sang sans douleur fumeur", "urine rosée indolore homme", "cancer vessie hematurie sans infection", "caillot sang pipi"],
    advice: [
      "Toute présence de SANG VISIBLE DANS LES URINES (Hématurie), surtout SANS DOULEUR et si vous êtes FUMEUR, est une ALERTE ROUGE.",
      "Même si cela n'arrive qu'une fois et disparaît, le cancer de la vessie doit être éliminé par une fibroscopie.",
      "Consultez un urologue immédiatement."
    ]
  },
  {
    name: "varicocele",
    nameFr: "Varicocèle",
    icon: "🍇",
    color: "#3b82f6",
    keywords: ["grosse veine testicule gauche pesanteur", "paquet ver de terre bourse", "varicocele testicule chaud infertilite", "testicule gauche pend lourd veines"],
    advice: [
      "Varice des veines spermatiques, se trouvant dans 90% des cas sur le testicule GAUCHE.",
      "Donne une sensation de pesanteur testicule et ressemble au toucher à un 'sac de vers'.",
      "Bien que bénin, cela peut réchauffer le testicule et causer une infertilité. Consultez un urologue si douleur ou désir d'enfant."
    ]
  },
  {
    name: "hydrocele",
    nameFr: "Hydrocèle",
    icon: "💧",
    color: "#2563eb",
    keywords: ["testicule enorme plein d'eau lumiere passe", "bourse tres grosse sans mal", "hydrocèle scrotale eau bebe"],
    advice: [
      "Accumulation de liquide indolore autour du testicule, faisant énormément grossir la bourse.",
      "Bénin. Chez le bébé, cela disparaît souvent seul en 1 an.",
      "Chez l'adulte, si c'est très gênant, un urologue peut vider le liquide par une petite chirurgie."
    ]
  },

  // ── EXTENSION 42: CARDIOLOGIE STRUCTURELLE & VASCULAIRE ──
  {
    name: "aortic_stenosis",
    nameFr: "Rétrécissement Aortique",
    icon: "🫀",
    color: "#991b1b",
    keywords: ["tombe dans les pommes effort vieux souffle", "essoufflé effort douleur poitrine syncobe vieux", "valve aortique calcifiee serré cardiologue", "rac vieux valve"],
    advice: [
      "Maladie de la vieillesse : la valve de sortie du cœur s'encrasse de calcaire et a du mal à s'ouvrir.",
      "La triade dangereuse : Souffle court + Douleur poitrine à l'effort + Pâleur/Malaise ('syncope') à l'effort.",
      "Alerte chirurgicale ou TAVI (changement de valve par cathéter). URGENCE si malaise."
    ]
  },
  {
    name: "mitral_prolapse",
    nameFr: "Prolapsus de la Valve Mitrale",
    icon: "💓",
    color: "#ec4899",
    keywords: ["palpitations coeur tape vite valve femme jeune", "clic souffle coeur prolapsus mitral angoisse", "fuite mitrale baret"],
    advice: [
      "Très fréquent, surtout chez les jeunes femmes minces. La valve 'mitrale' bombe un peu vers l'arrière.",
      "Donne des petites palpitations qui font peur, un essoufflement atypique et des angoisses.",
      "Généralement 100% bénin. Il faut juste une échographie tous les 3-5 ans pour vérifier l'absence d'aggravation."
    ]
  },
  {
    name: "abdominal_aortic_aneurysm",
    nameFr: "Anévrisme de l'Aorte Abdominale (AAA)",
    icon: "🎈",
    color: "#b91c1c",
    keywords: ["ventre bat comme un coeur boule", "fumeur vieux mal dos brutal ventre bat", "anevrisme aorte aaaa rupture urgence"],
    advice: [
      "Dilatation dangereuse de l'artère aorte dans le ventre, souvent chez l'homme fumeur âgé.",
      "Si vous sentez une masse 'battre au rythme de votre pouls' dans votre ventre.",
      "S'il y a une douleur DANS LE DOS BRUTALE associée à cette masse => 🔴 URGENCE CHIRURGICALE VITALE ABSOLUE (risque d'éclatement)."
    ]
  },
  {
    name: "raynaud_syndrome",
    nameFr: "Maladie / Syndrome de Raynaud",
    icon: "❄️",
    color: "#e2e8f0",
    keywords: ["doigts tout blanc froid mort violet", "mains gelees douloureuses couleurs changent froid", "raynaud hiver blanc bleu rouge"],
    advice: [
      "La circulation du sang se bloque dans les doigts avec le froid ou le stress. Les doigts deviennent blancs (morts), puis bleus, puis rouges très douloureux.",
      "Dans 90% des cas, c'est la 'maladie de Raynaud' classique, bénigne.",
      "Pour 10% des cas (surtout s'il y a des petites plaies/ulcères), c'est lié à une maladie auto-immune à chercher."
    ]
  },
  {
    name: "claudication_arteritis",
    nameFr: "Artériopathie des Membres Inférieurs (AOMI)",
    icon: "🦵",
    color: "#be123c",
    keywords: ["crampe mollet marche 100 metres arreter", "douleur mollet fumeur marche vitrine arterite", "aomi claudication intermittente bouché"],
    advice: [
      "Artérite: Les artères des jambes sont bouchées, souvent par le tabac ou le cholestérol.",
      "Vous devez vous arrêter net tous les 100 ou 200 mètres car le mollet fait atrocement mal ('maladie des vitrines').",
      "Arrêt IMPEERATIF du tabac. Consultez pour un Doppler. Risque de gangrène au stade évolué."
    ]
  },

  // ── EXTENSION 43: NEUROLOGIE PÉRIPHÉRIQUE ET CRÂNIENNE ──
  {
    name: "facial_palsy",
    nameFr: "Paralysie Faciale (A Frigore ou AVC)",
    icon: "🎭",
    color: "#6b7280",
    keywords: ["moitié visage paralysé asymétrique", "paupière ferme plus bouche de travers", "paralysie de bell frigore froid avc visage asymetrique"],
    advice: [
      "🔴 URGENCE NEUROLOGIQUE. Si une moitié de votre visage se paralyse (bouche de travers).",
      "Allez aux URGENCES. S'il s'agit d'un AVC, vous pouvez froncer le front. S'il s'agit d'une paralysie 'a frigore' (virale bénigne - Paralysie de Bell), c'est TOUTE LA MOITIÉ du visage qui est figée et l'œil ne se ferme plus.",
      "Laissez les médecins faire le diagnostic et fermez l'œil avec du scotch médical pour ne pas perdre votre cornée pendant la nuit."
    ]
  },
  {
    name: "sciatica",
    nameFr: "Sciatique",
    icon: "⚡",
    color: "#f97316",
    keywords: ["décharge électrique dos jambe fesse", "mal du bas du dos pied derriere", "nerf coincé lumbago irradiant", "sciatique sciatique discale hernie"],
    advice: [
      "Douleur fulgurante partant de la fesse et descendant sur la jambe (parfois jusqu'au bout du pied). Liée souvent à une hernie discale.",
      "Reposez-vous MAIS maintenez une activité légère (marcher doucement aéré, ne restez pas cloué au lit).",
      "🔴 URGENCE (Syndrome de la queue de cheval) : Si vous perdez l'urine dans votre culotte ou si votre jambe est engourdie/inutilisable (paralysée)."
    ]
  },
  {
    name: "cruralgia",
    nameFr: "Cruralgie",
    icon: "🔥",
    color: "#ea580c",
    keywords: ["decharge devant la cuisse genou mal dos", "cruralgie pire que sciatique brulure cuisse", "nerf inguinal crural douleur atroce psoas"],
    advice: [
      "Sœur de la sciatique, mais le nerf touché (le Femoral/Crural) passe sur le DEVANT de la cuisse.",
      "Est souvent décrite comme 'beaucoup plus douloureuse' et insupportable la nuit.",
      "Consultez pour des AINS et potentiellement une infiltration."
    ]
  },
  {
    name: "trigeminal_neuralgia",
    nameFr: "Névralgie du Trijumeau",
    icon: "⚡",
    color: "#b91c1c",
    keywords: ["coup de poignard visage rasage brosser dent", "decharge electrique machoire horrible", "tic douloureux douleur visage fulgurante", "nevralgie nerf 5 visage"],
    advice: [
      "Considérée comme l'une des pires douleurs connues en médecine.",
      "Décharges électriques atroces déclenchées par un simple effleurement du visage, parler ou mâcher.",
      "Consultez un neurologue. Les antalgiques classiques ne marchent pas il faut des anti-épileptiques spécifiques (Carbamazépine)."
    ]
  },
  {
    name: "restless_leg_syndrome",
    nameFr: "Syndrome des Jambes Sans Repos (Willis-Ekbom)",
    icon: "🦵",
    color: "#3b82f6",
    keywords: ["fourmis jambes nuit lit envie bouger marche", "jambes pietinent agitees soir repos", "impatience pied jambes sans repos fer anemie"],
    advice: [
      "Sensation de chatouillement / agacement insoutenable dans les jambes au lit, vous obligeant à vous lever et marcher.",
      "Très souvent lié à un manque de Fer même si vous n'êtes pas anémié.",
      "Faites une prise de sang (Ferritine). Demandez à votre médecin, des traitements spécifiques existent."
    ]
  },

  // ── EXTENSION 44: RHUMATOLOGIE & MALADIES DE L'OS ──
  {
    name: "ankylosing_spondylitis",
    nameFr: "Spondylarthrite Ankylosante",
    icon: "🦴",
    color: "#1d4ed8",
    keywords: ["mal au dos reveille 4h du matin jeune", "fesse droite gauche alternance bassin mal", "spondylarthrite hla b27 dos raide matin", "derouille dos bougeant heure matin"],
    advice: [
      "Douleur inflammatoire du bas du dos typique au repos: la douleur RÉVEILLE LE MATIN vers 4h et IL FAUT PLUS D'UNE HEURE pour 'se dérouiller' la journée.",
      "C'est souvent héréditaire (Gène HLA-B27).",
      "Consultez un rhumatologue. Les nouveaux traitements (biothérapies) ont révolutionné cette maladie jadis terrible."
    ]
  },
  {
    name: "gout",
    nameFr: "Crise de Goutte",
    icon: "🥩",
    color: "#dc2626",
    keywords: ["gros orteil rouge enorme feu fievre hyper douloureux", "crise de goutte acide urique pied", "viande rhum alcool mal pied gonflement", "drap effleurer pied fait mal orteil"],
    advice: [
      "Le gros orteil du pied gonfle d'un coup en une nuit, devient violet/rouge, et le simple poids du drap dessus est INTOLÉRABLE.",
      "Cristaux d'acide urique accumulés (souvent lié à génétique, hydratation, viandes rouges/alcool).",
      "La Colchicine ou les Anti-inflammatoires pris TÔT font des miracles en 24h."
    ]
  },
  {
    name: "osteoarthritis",
    nameFr: "Arthrose (Maladie Dégénérative Articulaire)",
    icon: "👴",
    color: "#78716c",
    keywords: ["genou craque usé mal quand marche monte escalier", "arthrose cartilage usure hanche doigt boules", "mal mecanique repos soulage age"],
    advice: [
      "Une douleur 'mécanique': fait mal QUAND ON BOUGE ou marche, puis SE CALME AU REPOS.",
      "Le cartilage est usé. Maintenir un sport TRES DOUX (vélo, vélo piscine, natation) est paradoxalement le meilleur remède pour ne pas rouiller complétement.",
      "Perte de poids cruciale si hanche/genou touché."
    ]
  },
  {
    name: "fibromyalgia",
    nameFr: "Fibromyalgie",
    icon: "🧬",
    color: "#8b5cf6",
    keywords: ["mal partout epuisé douleurs muscles sans arriere examens normaux", "douleur au toucher epaules nuques dos tout le corps fatigue inexpliquée", "fibromyalgie depression fibrobrouillard brouillard mental"],
    advice: [
      "Douleur diffuses dans tous les muscles sans inflammation visible sur les examens.",
      "Souvent associé à un sommeil non réparateur (on se réveille épuisé) et un brouillard mental.",
      "Centre anti-douleur, réadaptation douce à l'effort et gestion de l'humeur sont la meilleure approche."
    ]
  },
  {
    name: "osteoporosis",
    nameFr: "Ostéoporose",
    icon: "🦴",
    color: "#cbd5e1",
    keywords: ["femme menopause os casse facile tassement vertebre", "osteoporose perte taille grand mere dos voute", "casse poignet petite chute os poreux calcium vitamined"],
    advice: [
      "Les os perdent leur densité et deviennent poreux comme de la pierre ponce (souvent chez la femme ménopausée).",
      "La maladie est 100% silencieuse jusqu'au drame : fracture du col du fémur ou du poignet sur une mini chute, ou tassement affreux du dos.",
      "Ostéodensitométrie obligatoire. Vitamine D, Calcium + traitements forts de votre médecin pour empêcher les fractures."
    ]
  },

  // ── EXTENSION 45: PATHOLOGIES DIVERSES ET COMPORTEMENTALES (Psychiatrie) ──
  {
    name: "schizophrenia",
    nameFr: "Schizophrénie (Épisode psychotique)",
    icon: "🎭",
    color: "#6b7280",
    keywords: ["entend des voix dans sa tete delirant persécution adulte jeune ado", "gros retrait social hygiene bizarre complot hallucinations", "schizophrenie psychose se sent suivi voix parlent mal"],
    advice: [
      "Trouble qui débute souvent entre 15 et 25 ans. Un jeune adulte qui se coupe violemment du monde, arrête de se laver et dont le discours devient illogique (avec parfois des hallucinations/voix inaudibles pour les autres).",
      "Il ne faut pas juger, mais contacter en URGENCE un psychiatre ou les CMP (Centres Médico-Psychologiques).",
      "Plus la prise en charge médicale (neuroleptiques) est rapide, meilleur est le pronostic cérébral."
    ]
  },
  {
    name: "bipolar_manic",
    nameFr: "Trouble Bipolaire (Phase Maniaque)",
    icon: "🎢",
    color: "#ef4444",
    keywords: ["depense tout son argent d'un coup dort 2h pete le feu parle trop vite", "folie des grandeurs exalté megalo idee genie bipolaire", "episode maniaque sans dormir excitabilité hypersexualité d'un coup"],
    advice: [
      "La dépression bipolaire possède une phase inversée (la MANIE) tout aussi destructrice : la personne ne dort plus, parle sans arrêt, a une énergie infinie, des projets fous et fait des dépenses délirantes.",
      "🔴 URGENCE PSYCHIATRIQUE : Le risque d'épuisement, de ruine financière ou d'actes dangereux est majeur.",
      "Il faut hospitaliser (en HDT si nécessaire) et donner un régulateur d'humeur."
    ]
  },
  {
    name: "ocd",
    nameFr: "TOC (Trouble Obsessionnel Compulsif)",
    icon: "🔄",
    color: "#6b7280",
    keywords: ["lave les mains 50 fois verifie la porte 10 fois toc rituel", "obsessions salete rituel cerveau echecs", "peur microbes symetrie pensées intrusives"],
    advice: [
      "Le cerveau génère une peur (obsession) que la personne tente d'annuler par une action absurde répétée (compulsion, comme vérifier la porte 10 fois).",
      "La personne sait que c'est absurde mais l'angoisse est INFERNALE si elle ne le fait pas.",
      "Les TCC (Thérapies Cognitivo-Comportementales) sont la solution royale, associées parfois à des aides médicamenteuses."
    ]
  },
  {
    name: "ptsd",
    nameFr: "ESPT (État de Stress Post-Traumatique)",
    icon: "💥",
    color: "#3f6212",
    keywords: ["revit l'accident nuit cauchemar flash retour au traumatisme agression", "hypervigilant ptsd evite lieux accident violant trauma", "sursaut pour un rien syndrome post traumatique choc"],
    advice: [
      "Suite à un événement où votre vie (ou intégrité) a été menacée, votre cerveau 'bloque' le souvenir qui tourne en boucle sous forme de flashs et cauchemars atroces.",
      "L'EMDR (désensibilisation par mouvement oculaire) est le traitement de référence mondialement reconnu pour traiter cela.",
      "Consultez un thérapeute spécialisé."
    ]
  },
  {
    name: "anorexia_nervosa",
    nameFr: "Anorexie Mentale",
    icon: "🪞",
    color: "#38bdf8",
    keywords: ["jeune fille perd 10 kilos se trouve très grosse alors que maigre peur grossir", "fait sport a outrance cache repas dysmorphie", "anorexie amenorrhee poils refus total de manger"],
    advice: [
      "Maladie psychiatrique extrêmement sévère, et non un simple 'caprice'.",
      "Peur panique de prendre 1 gramme + perception altérée du corps (le miroir luit ment).",
      "🔴 URGENCE VITALE (risque cardiaque majeur vu la perte de poids et de potassium). Consultez en pédopsychiatrie le plus vite possible sans rudes affrontements à table."
    ]
  },

  // ── EXTENSION 46: URGENCES TRAUMATOLOGIQUES & ORTHOPÉDIE ──
  {
    name: "femoral_neck_fracture",
    nameFr: "Fracture du Col du Fémur",
    icon: "🦴",
    color: "#b91c1c",
    keywords: ["vieux tombe n'arrive plus a se lever hanche", "chute personne agee pied tourne en dehors raccourci", "col du femur cassé", "douleur aine apres chute age"],
    advice: [
      "🔴 URGENCE TRAUMATOLOGIQUE typique de la personne âgée (ostéoporose).",
      "Si après une chute, la jambe est raccourcie et le pied tourné vers l'extérieur : ne bougez plus la personne.",
      "Appelez le 15. Une opération rapide est vitale pour éviter les complications d'alitement."
    ]
  },
  {
    name: "achilles_tendon_rupture",
    nameFr: "Rupture du Tendon d'Achille",
    icon: "🦿",
    color: "#f59e0b",
    keywords: ["bruit de claquement cheville tennis", "coup de fouet mollet dechirure", "peut plus se mettre sur pointe des pieds", "rupture achille sport"],
    advice: [
      "Sensation de 'coup de poignard' ou de 'claquement' derrière la cheville souvent lors d'une impulsion sportive (tennis, squash).",
      "Il y a un creux palpable au-dessus du talon, impossible de se mettre sur la pointe des pieds.",
      "Allez aux urgences traumatologiques (botte en résine ou chirurgie rapide requise)."
    ]
  },
  {
    name: "shoulder_dislocation",
    nameFr: "Luxation de l'Épaule",
    icon: "🦾",
    color: "#1d4ed8",
    keywords: ["epaule deboitee bras tombant douleur", "chute epaule sortie de son trou", "luxation epaule bras coincé vide sous acromion"],
    advice: [
      "🔴 URGENCE. L'os du bras est sorti de son articulation. L'épaule a un aspect 'en épaulette' avec un vide en dessous.",
      "Ne tirez JAMAIS sur le bras vous-même (risque de déchirer des nerfs ou vaisseaux).",
      "Rendez-vous aux urgences, l'épaule doit être remise en place sous antidouleur."
    ]
  },
  {
    name: "compartment_syndrome",
    nameFr: "Syndrome des Loges",
    icon: "🦵",
    color: "#991b1b",
    keywords: ["platre trop serre jambe tres dure douleur atroce", "mollet de bois gonflé impossible a toucher", "syndrome des loges ischemie muscle", "douleur platre fourmis froid"],
    advice: [
      "🔴 URGENCE CHIRURGICALE ABSOLUE. Souvent après une fracture ou sous un plâtre.",
      "Le muscle gonfle dans sa gaine, bloquant le sang. Le mollet devient DURE COMME DU BOIS, la douleur est intolérable aux antidouleurs classiques.",
      "Si vous avez un plâtre : retournez immédiatement aux urgences pour le fendre avant la nécrose du muscle (amputation)."
    ]
  },
  {
    name: "cauda_equina_syndrome",
    nameFr: "Syndrome de la Queue de Cheval",
    icon: "🐎",
    color: "#7f1d1d",
    keywords: ["perte urines sciatique sent plus fesses", "anesthesie en selle mal au dos paralysie", "queue de cheval hernie bloque pipi", "fuite urinaire incontinence soudaine dos"],
    advice: [
      "🔴 URGENCE NEURO-CHIRURGICALE EXTRÊME. Une hernie discale géante écrase les nerfs du bassin.",
      "Symptômes : Sciatique des DEUX côtés + perte de sensation quand on s'essuie aux toilettes (anesthésie en selle) + fuites urinaires involontaires.",
      "Appelez le 15 IMMÉDIATEMENT. Vous avez 6 à 12h pour être opéré avant de devenir incontinent à vie."
    ]
  },

  // ── EXTENSION 47: MALADIES INFECTIEUSES ÉMERGENTES & ZOONOSES ──
  {
    name: "dengue_fever",
    nameFr: "Dengue (Grippe Tropicale)",
    icon: "🦟",
    color: "#dc2626",
    keywords: ["fievre casse os voyage moustique antilles", "douleur derriere les yeux fievre eruption", "dengue tropical saignement", "moustique tigre asie caraibes"],
    advice: [
      "Fièvre très brutale au retour des tropiques ou DOM-TOM avec douleurs atroces dans tous les os et derrière les yeux.",
      "🔴 AUCUN ASPIRINE NI IBUPROFÈNE (risque mortel d'hémorragie). Seulement du paracétamol.",
      "Consultez un médecin avec une prise de sang rapide (plaquettes)."
    ]
  },
  {
    name: "lyme_disease",
    nameFr: "Maladie de Lyme (Stade Primaire)",
    icon: "🕷️",
    color: "#ef4444",
    keywords: ["tache rouge qui s'agrandit piqure tique", "erytheme migrant cible lyme s'etend ronde", "mordu par une tique cercle rouge", "foret lyme tache"],
    advice: [
      "Si vous avez été piqué par une tique et qu'une tache rouge apparaît et s'agrandit lentement (en forme de cible) après quelques jours.",
      "C'est l'Érythème Migrant, signe certain de la Maladie de Lyme.",
      "Allez chez le médecin pour avoir 14 jours d'antibiotiques (Amoxicilline ou Doxycycline). Ne laissez pas traîner."
    ]
  },
  {
    name: "leptospirosis",
    nameFr: "Leptospirose",
    icon: "🐀",
    color: "#f59e0b",
    keywords: ["fievre baignade riviere rat jaune", "leptospirose egoutier eau saumatre", "douleur muscle jaune fievre rat urine"],
    advice: [
      "Maladie bactérienne transmise par l'urine de rat (baignade en eau douce, kayak, égoûtiers).",
      "Fièvre élevée, douleurs musculaires extrêmes et les yeux qui deviennent parfois jaunes (ictère).",
      "Urgence médicale (risque d'atteinte du foie et des reins)."
    ]
  },
  {
    name: "rabies_suspicion",
    nameFr: "Rage (Suspicion sur Morsure)",
    icon: "🐕",
    color: "#991b1b",
    keywords: ["mordu par chien errant voyage asie afrique", "morsure singe asie chauve souris", "rage hydrophobie mordu animal bave"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE. La rage est 100% mortelle si elle se déclare.",
      "Si vous avez été mordu par un chien errant, un singe ou une chauve-souris (surtout hors Europe),",
      "Lavez la plaie pendant 15 min à l'eau et au savon, et foncez le JOUR MÊME à un Centre Antirabique pour le vaccin et sérum."
    ]
  },
  {
    name: "monkeypox",
    nameFr: "Mpox (Variole du Singe)",
    icon: "🦍",
    color: "#8b5cf6",
    keywords: ["gros boutons purulents cloques fievre", "mpox monkeypox variole pustules fievre", "bouton organes genitaux douloureux fievre visage", "ganglions enormes boutons variole"],
    advice: [
      "Fièvre, gros ganglions douloureux, puis apparition de pustules très douloureuses (souvent sur le visage, les mains ou la zone génitale).",
      "Isolez-vous strictement.",
      "Contactez votre médecin ou le 15, on vous orientera vers un centre spécialisé pour test PCR."
    ]
  },

  // ── EXTENSION 48: OPHTALMOLOGIE RÉTINIENNE & NERF OPTIQUE ──
  {
    name: "retinal_detachment",
    nameFr: "Décollement de Rétine",
    icon: "👁️",
    color: "#1d4ed8",
    keywords: ["rideau noir tombe sur oeil eclair myope", "flash lumineux eclair noirceur oeil", "vu mouches puis rideau sombre ampute vision", "decollement retine myope fort"],
    advice: [
      "🔴 URGENCE OPHTALMOLOGIQUE EXTRÊME.",
      "Si vous voyez des flashs lumineux (éclairs), une pluie de taches noires, puis une ombre sombre ('un rideau') qui ampute votre champ de vision.",
      "Foncez aux urgences ophtals. Vous avez 24 à 48h pour être opéré au laser et sauver l'œil."
    ]
  },
  {
    name: "glaucoma_acute",
    nameFr: "Glaucome Aigu (Crise)",
    icon: "🔴",
    color: "#b91c1c",
    keywords: ["oeil dur comme bille tention douleur tete vomit", "pupille dilatée oeil rouge ultra mal vision trouble", "crise glaucome aigu halo halo lumineux"],
    advice: [
      "🔴 URGENCE ABSOLUE. L'œil devient DURE comme une bille de bois, horriblement douloureux, la vision baisse et donne des nausées.",
      "C'est une montée fulgurante de la tension dans l'œil.",
      "Allez aux urgences ophtalmologiques immédiatement. Le nerf optique peut mourir en quelques heures."
    ]
  },
  {
    name: "amaurosis_fugax",
    nameFr: "Amaurose Fugace (AIT oculaire)",
    icon: "🕶️",
    color: "#6b7280",
    keywords: ["perte vision oeil quelques minutes puis revient", "voile noir oeil 5 minutes parti", "amaurose fugace avc oeil"],
    advice: [
      "🔴 ALERTE AVC TRÈS PROCHE.",
      "Si votre œil devient aveugle (voile noir descendant) pendant 2 à 10 minutes puis redevient normal : c'est un mini-caillot (AIT).",
      "L'AVC cérébral définitif est imminent (souvent dans les 48h). Foncez aux URGENCES Générales ou appelez le 15."
    ]
  },
  {
    name: "stye_chalazion",
    nameFr: "Orgelet / Chalazion",
    icon: "👀",
    color: "#f59e0b",
    keywords: ["boule rouge paupiere cil fait mal", "bouton blanc bord paupiere", "chalazion orgelet kyste oeil", "paupiere gonflée boule dure"],
    advice: [
      "Petite infection d'un follicule de cil (Orgelet) ou kyste d'une glande (Chalazion). C'est très bénin.",
      "Appliquez des compresses d'eau très chaudes 15 minutes 4 fois par jour pour faire fondre la boule.",
      "Ne percez jamais vous-même. Un ophtalmo ou pharmacien peut donner une pommade simple."
    ]
  },
  {
    name: "diabetic_retinopathy",
    nameFr: "Rétinopathie Diabétique",
    icon: "🩸",
    color: "#dc2626",
    keywords: ["diabetique vue baisse voile sang oeil", "tache sang vision degenere sucre", "retinopathie diabete laser"],
    advice: [
      "Complication du diabète mal équilibré : les vaisseaux de l'œil saignent.",
      "Toute baisse de vue chez un diabétique impose un fond d'œil URGENT.",
      "Une séance de laser peut stopper l'évolution de la maladie."
    ]
  },

  // ── EXTENSION 49: DERMATOLOGIE INFECTIEUSE & INFLAMMATOIRE STRICTE ──
  {
    name: "cellulitis_erysipelas",
    nameFr: "Érysipèle (Dermo-hypodermite)",
    icon: "🦵",
    color: "#dc2626",
    keywords: ["jambe tres rouge chaude etendue fievre", "erysipele bactérie jambe limite nette fritte", "plaque rouge jambe qui monte fievre 40"],
    advice: [
      "Infection bactérienne de la peau très impressionnante. Souvent sur une jambe: devient rouge vif, chaude, gonflée avec grosse fièvre (>39°C).",
      "Consultez les Urgences ou votre médecin dans la journée.",
      "Traitement par antibiotiques (Pénicilline) absolu pour éviter une septicémie."
    ]
  },
  {
    name: "hidradenitis_suppurativa",
    nameFr: "Maladie de Verneuil (Hidradénite)",
    icon: "🌋",
    color: "#7c3aed",
    keywords: ["boules dures aisselles aine pus", "abces a repetition plis verneuil", "hidradenite suppurative fesses aisselles kyste", "grosse boule sous bras mal pustule"],
    advice: [
      "Apparition répétée de kystes très douloureux et d'abcès sous les aisselles, l'aine ou le pli fessier.",
      "Ce n'est pas un défaut d'hygiène, c'est une inflammation chronique handicapante.",
      "Consultez un dermatologue spécialisé pour calmer les poussées (antibiotiques locaux/oraux, chirurgie)."
    ]
  },
  {
    name: "pityriasis_versicolor",
    nameFr: "Pityriasis Versicolor (Champignon Peau)",
    icon: "🐆",
    color: "#d97706",
    keywords: ["taches blanches brunes dos torse decolore apres soleil", "champignon peau leopard plage", "pityriasis gratter pellicule petite tache dos"],
    advice: [
      "Infection très bénigne par un champignon (Malassezia). Donne des taches qui ne bronzent pas au soleil sur le dos/torse (Peau de léopard).",
      "Consultez un médecin ou demandez en pharmacie un gel douche antifongique (Kétoconazole).",
      "Le traitement est très facile mais la pigmentation mettra des mois à revenir uniforme."
    ]
  },
  {
    name: "impetigo",
    nameFr: "Impétigo",
    icon: "👶",
    color: "#f59e0b",
    keywords: ["croute miel nez bouche enfant", "boutons jaunatres contagieux creche", "impetigo croute mielleuse staphylocoque"],
    advice: [
      "Très contagieux chez l'enfant. Forme de petites croûtes jaunâtres ('couleur miel') souvent autour de la bouche et du nez.",
      "Garder l'enfant à la maison (éviction scolaire locale).",
      "Consultez pour avoir une pommade antibiotique ou un sirop. Lavage de main très fréquent obligatoire."
    ]
  },
  {
    name: "alopecia_areata",
    nameFr: "Pelade (Alopécie circonscrite)",
    icon: "💇",
    color: "#475569",
    keywords: ["trou dans les cheveux rond lisse", "perte cheveux plaque d'un coup stress ronde", "pelade cuir chevelu vide", "plus de poil barbe rond"],
    advice: [
      "Perte de cheveux (ou poils/barbes) en forme de plaque tout à fait ronde et lisse, sans aucune cicatrice ni rougeur.",
      "Origine auto-immune, souvent déclenchée par un immense stress.",
      "Consultez un dermato. Ça repousse très souvent spontanément ou avec des lotions aux corticoïdes."
    ]
  },

  // ── EXTENSION 50: ORL DE L'ENFANT & PÉDIATRIE SPÉCIFIQUE ──
  {
    name: "otitis_media",
    nameFr: "Otite Moyenne Aiguë",
    icon: "👂",
    color: "#ea580c",
    keywords: ["enfant pleure touche oreille fievre rhume", "mal a l'oreille nuit bebe", "otite tympan rouge douleur oreille reveil", "pus sort oreille otite percee"],
    advice: [
      "Grosse douleur d'oreille souvent après un rhume chez l'enfant. L'enfant se réveille en hurlant.",
      "Donnez du Doliprane. Surélevez sa tête.",
      "Consultez le pédiatre/généraliste dans la journée. Les gouttes dans les oreilles sont souvent INUTILES, il faut des antibios oraux si tympan purulent."
    ]
  },
  {
    name: "croup_laryngitis",
    nameFr: "Laryngite striduleuse (Faux Croup)",
    icon: "🐶",
    color: "#3b82f6",
    keywords: ["enfant tousse aboie chien nuit", "voix cassée bébé nuit respiration bruit", "croup laryngite stridor siffle gorge"],
    advice: [
      "L'enfant se réveille la nuit avec une toux rauque qui ressemble à un Aboiement de chien ou de phoque.",
      "C'est viral et bénin 90% du temps. Amenez l'enfant devant une fenêtre ouverte ou la porte du congélateur ouvert (le FROID dégonfle les cordes vocales).",
      "Si ça siffle en permanence même au repos (stridor continu) => Urgences."
    ]
  },
  {
    name: "hand_foot_mouth",
    nameFr: "Syndrome Pied-Main-Bouche",
    icon: "🖐️",
    color: "#ec4899",
    keywords: ["boutons plantes pieds paumes main bouche bebe", "aphtes fievre crèche pied main bouche", "mal gorge boutons extremites"],
    advice: [
      "Maladie virale classique de la crèche. Petites cloques rouges sur la plante des pieds, dans les mains et aphtes dans la bouche.",
      "Très bénin. Il n'y a rien à faire à part donner du paracétamol contre la fièvre.",
      "Donnez à l'enfant des aliments froids/tièdes (yaourt/compote) car les aphtes brûlent."
    ]
  },
  {
    name: "roseola",
    nameFr: "Roséole",
    icon: "🌸",
    color: "#fbcfe8",
    keywords: ["fievre 40 pendant 3 jours puis boutons bebe", "fievre 3 jours tombe et plaque rouge bebe", "roseole exantheme subit"],
    advice: [
      "Le grand classique du bébé < 2 ans: Une fièvre à 39-40°C très bien supportée pendant 3 jours SANS AUTRE SYMPTOME.",
      "Puis d'un coup, la fièvre tombe à 37°C et des petits boutons rosés apparaissent sur le torse le lendemain.",
      "100% bénin. Paracétamol si inconfort, et c'est fini."
    ]
  },
  {
    name: "intussusception",
    nameFr: "Invagination Intestinale Aiguë",
    icon: "🌀",
    color: "#dc2626",
    keywords: ["bebe hurle par deflagration plie jambe pale vomi", "palesur extreme cris crise ventre bebe sang selle framboise", "invagination boudin intestin bebe replie"],
    advice: [
      "🔴 URGENCE VITALE PÉDIATRIQUE (6 mois - 2 ans). L'intestin se télescope (s'avale lui-même).",
      "Le bébé hurle soudainement, devient extrêmement PÂLE, plie les jambes, puis se calme, puis la crise recommence 15 min après.",
      "S'il vomit un peu de sang ou selles 'gelées de groseille': FONCEZ aux Urgences ou appelez le 15, un lavement écho-guidé le sauvera."
    ]
  },

  // ── EXTENSION 51: HÉPATOLOGIE & MALADIES DU FOIE RARES ──
  {
    name: "hemochromatosis",
    nameFr: "Hémochromatose",
    icon: "🧲",
    color: "#8b5cf6",
    keywords: ["fer hyper elevé prise de sang", "peau bronzée grise fatigue douleur doigt", "hemochromatose genetique foie detruit fer", "poignee main fait mal fer"],
    advice: [
      "Maladie génétique fréquente chez les caucasiens (Celtes/Bretons). L'intestin absorbe TOUT le fer, qui va s'accumuler et détruire le foie et le pancréas.",
      "Signes : fatigue énorme + douleurs bizarres quand on serre la main (index/majeur).",
      "Le traitement est simple et sauve la vie : des saignées sanguines régulières."
    ]
  },
  {
    name: "autoimmune_hepatitis",
    nameFr: "Hépatite Auto-immune",
    icon: "🫀",
    color: "#db2777",
    keywords: ["asat alat haute femme jeune igg fatigue", "hepatite sans virus anti lkm auto immune", "jaune fatigue foie auto immune"],
    advice: [
      "Le système immunitaire (souvent d'une jeune femme) se met à attaquer et détruire le foie.",
      "Les bilans hépatiques s'envolent sans cause infectieuse ni alcool.",
      "Consultez un hépatologue, les corticoïdes et immuno-suppresseurs marchent très bien."
    ]
  },
  {
    name: "gallstone_colic",
    nameFr: "Colique Hépatique (Calculs biliaires)",
    icon: "🪨",
    color: "#eab308",
    keywords: ["douleur atroce sous cote droite irradie dos epaule", "mal a respirer douleur droite apres repas gras", "calcul VB vesicule bloque colique", "vomi mal droite respiration bloque"],
    advice: [
      "Une 'pierre' (calcul) s'est bloquée à la sortie de la vésicule biliaire.",
      "La douleur est fulgurante sous la poitrine à DROITE, coupe la respiration et irradie dans l'épaule droite/dos.",
      "Consultez aux Urgences si ça ne passe pas en 4h ou s'il y a de la fièvre/jaunisse associés (Cholécystite ou Angiocholite)."
    ]
  },
  {
    name: "wilson_disease",
    nameFr: "Maladie de Wilson",
    icon: "🥉",
    color: "#d97706",
    keywords: ["cuivre elevé foie cerveau oeil ado", "anneau kayser fleischer tremblement jeune foie", "maladie wilson cuivre foie"],
    advice: [
      "Maladie génétique rare touchant l'enfant ou l'adulte jeune : accumulation toxique de Cuivre dans le corps.",
      "Il détruit le foie et donne des tremblements psychiatriques inexpliqués chez l'ado.",
      "Urgence thérapeutique : diagnostic en centre de référence maladie rare."
    ]
  },
  {
    name: "primary_biliary_cholangitis",
    nameFr: "Cholangite Biliaire Primitive (CBP)",
    icon: "🌵",
    color: "#ca8a04",
    keywords: ["gratte de partout sans bouton demangeaison foie femme", "fatigue intense prurit cbp phosphatase alcaline", "anticorps anti mitochondrie foie"],
    advice: [
      "Maladie du foie (femme > 40 ans). Les petits canaux biliaires s'obstruent lentement.",
      "Symptôme n°1 : La personne se GRATTE férocement tout le corps ('prurit') et est épuisée, sans aucun bouton apparent.",
      "Une prise de sang hépatique (Phosphatases alcalines) est capitale. Consultez un hépatologue."
    ]
  },

  // ── EXTENSION 52: CANCÉROLOGIE (Suite) & TUMEURS RARES ──
  {
    name: "multiple_myeloma",
    nameFr: "Myélome Multiple (Maladie de Kahler)",
    icon: "🦴",
    color: "#b91c1c",
    keywords: ["douleur os dos trous radio crâne fatigue anémie rein", "myelome kahler plasmocytes pic monoclonal", "vieux dos cassé rein fatigué sang plasmocyte"],
    advice: [
      "Cancer de la moelle osseuse. Il 'grignote' les os en faisant des trous, ce qui donne des douleurs atroces au dos chez le sujet âgé >60ans.",
      "En plus des douleurs osseuses, on découvre une anémie et souvent une insuffisance rénale (les urines moussent fort).",
      "Une électrophorèse des protéines du sang fera le diagnostic. Orientation hémato-onco."
    ]
  },
  {
    name: "thyroid_cancer",
    nameFr: "Cancer de la Thyroïde",
    icon: "🦋",
    color: "#6b7280",
    keywords: ["boule gorge dure pomme adan deplace", "nodule thyroide grossit voix change d'un coup", "cancer thyroide curage goitre froid"],
    advice: [
      "Souvent trouvé devant une grosseur ('nodule') dure à la base du cou, qui bouge quand on avale.",
      "L'immense majorité des nodules sont bénins, mais s'ils grossissent vite, sont dures au toucher ou modifient la voix, il faut une échographie suivie parfois d'une ponction (aiguille fine).",
      "Le pronostic est un des meilleurs tous cancers confondus."
    ]
  },
  {
    name: "carcinoid_syndrome",
    nameFr: "Syndrome Carcinoïde",
    icon: "🍅",
    color: "#ef4444",
    keywords: ["bouffee de chaleur visage flash rouge diarhée asthme tumeur", "tumeur neuroendocrine carcinoide fluhing coeur intestin"],
    advice: [
      "L'une des manifestations des Tumeurs Neuro-endocrines (TNE), souvent situées dans l'intestin.",
      "Il provoque des rougeurs extrêmes du visage et du cou soudaines ('flush' de 5 min) accompagnées parfois de bouffées de chaleur, des palpitations intenses et surtout d'une diarrhée aqueuse incontrôlable.",
      "Consultez en oncologie/endocrinologie pour marqueurs spécifiques (5-HIAA dans les urines)."
    ]
  },
  {
    name: "melanoma",
    nameFr: "Mélanome (Cancer de la Peau)",
    icon: "🕳️",
    color: "#1f2937",
    keywords: ["grain beaute change couleur noir asymetrique", "tache soleil noir grossit saigne abcd", "melanome cancer peau bizarre"],
    advice: [
      "Le cancer de la peau le plus redoutable. Utilisez la règle ABCDE.",
      "Si un grain de beauté est A-symétrique, a des B-ords irréguliers, plusieurs C-ouleurs, un D-iamètre > 6mm ou qu'il É-volue rapidement :",
      "CONSULTATION DERMATO URGENTE pour l'enlever au bistouri. Pris tôt à 1mm de profondeur, le taux de guérison est proche de 100%."
    ]
  },
  {
    name: "testicular_cancer",
    nameFr: "Cancer du Testicule",
    icon: "🥚",
    color: "#2563eb",
    keywords: ["boule dure testicule jeune homme indolore", "masse testicule lourd pas mal", "cancer testicule homme"],
    advice: [
      "Cancer typique du jeune homme (15 - 35 ans). Toujours autopalper au moins une fois par mois.",
      "Toute découverte d'une masse/boule DURE 'comme un caillou', complètement indolore et collée A L'INTÉRIEUR du testicule est UNE URGENCE.",
      "Échographie en 24h. Le pronostic est là encore exceptionnel (95% de guérison) même à des stades avancés avec la chimiothérapie actuelle."
    ]
  },

  // ── EXTENSION 53: PATHOLOGIES DENTAIRES & ODONTOLOGIE SÉVÈRE ──
  {
    name: "dental_abscess",
    nameFr: "Abcès Dentaire",
    icon: "🦷",
    color: "#f59e0b",
    keywords: ["joue gonflée dent fievre pus", "dent fait affreusement mal boule gencive", "abces dentaire rage dent chaud"],
    advice: [
      "Infection bactérienne profonde sous la dent. La joue gonfle, c'est très douloureux (battant) et peut donner de la fièvre.",
      "Consultez un dentiste en URGENCE (ou SOS Médecin le soir).",
      "Il faut des antibiotiques et un drainage pour éviter que l'infection n'aille au cerveau ou au cœur."
    ]
  },
  {
    name: "tmj_disorder",
    nameFr: "Trouble de l'Articulation Temporo-Mandibulaire (SADAM)",
    icon: "💀",
    color: "#a8a29e",
    keywords: ["machoire craque bloque bruxisme", "mal devant l'oreille macher", "sadam menisque machoire bloquee acouphene"],
    advice: [
      "Souvent lié au fait de grincer des dents la nuit (Bruxisme) à cause du stress.",
      "Symptômes : douleur musculaire au visage le matin, craquement devant l'oreille en ouvrant la bouche.",
      "Consultez votre dentiste pour la fabrication d'une gouttière nocturne de relaxation."
    ]
  },
  {
    name: "periodontitis_advanced",
    nameFr: "Parodontite Avancée",
    icon: "🩸",
    color: "#991b1b",
    keywords: ["dents bougent dechaussement sang gencive", "gencive retractee noir sang crachat brosage", "parodontite perte dent", "haleine atroce sang permanent"],
    advice: [
      "L'os qui tient les dents fond à cause du tartre et des bactéries sous-gingivales.",
      "Vos dents se déchaussent et bougent. La perte des dents est imminente sans soins.",
      "Un surfaçage radiculaire (nettoyage profond sous anesthésie) chez le Parodontologue est indispensable."
    ]
  },
  {
    name: "dry_socket",
    nameFr: "Alvéolite Dentaire (Suite extraction)",
    icon: "🕳️",
    color: "#ea580c",
    keywords: ["mal de chien apres arrachage dent sagesse", "douleur extraction trou vide blanc puant", "alveolite anesthesiant passe plus"],
    advice: [
      "Complication classique apparue 3-4 jours après qu'on vous ait arraché une dent (souvent de sagesse).",
      "Le caillot de sang qui protégeait l'os est parti. L'os est à vif. La douleur irradie dans l'oreille et résiste aux antidouleurs habituels.",
      "Retournez chez le dentiste : il doit nettoyer et mettre un pansement alvéolaire imbibé d'eugénol (clou de girofle) miracle en 5 min."
    ]
  },
  {
    name: "noma",
    nameFr: "Noma (Maladie Tropicale Carentielle)",
    icon: "💀",
    color: "#7f1d1d",
    keywords: ["infection detruit visage bouche enfant afrique", "pourriture joue noma fievre malnutrition", "ulcère necrose bouche effrayant"],
    advice: [
      "Maladie terrible touchant principalement les enfants malnutris en Afrique (Mais peut arriver lors d'une extrême pauvreté/immunodéficience sévère).",
      "Les bactéries de la bouche (normalement banales) détruisent le visage de l'intérieur en quelques jours.",
      "🔴 URGENCE VITALE (Antibiotiques massifs et re-nutrition)."
    ]
  },

  // ── EXTENSION 54: CARDIOLOGIE RYTHMIQUE & ÉLECTROPHYSIOLOGIE ──
  {
    name: "atrial_fibrillation",
    nameFr: "Fibrillation Atriale (FA)",
    icon: "⚡",
    color: "#dc2626",
    keywords: ["coeur bat n'importe comment irregulier anarchique", "palpitation tres bizarre sans rythme", "fa fibrillation auriculaire age", "pouls saute tout le temps"],
    advice: [
      "Le cœur bat de manière totalement anarchique, irrégulière et souvent trop rapide.",
      "C'est la cause N°1 d'AVC chez la personne âgée car cela forme des caillots dans le cœur.",
      "Un électrocardiogramme (ECG) très rapide est obligatoire, et il faudra prendre des anticoagulants à vie la plupart du temps."
    ]
  },
  {
    name: "bradycardia_block",
    nameFr: "Bloc Auriculo-Ventriculaire (BAV complet)",
    icon: "🐢",
    color: "#6b7280",
    keywords: ["pouls tres lent 30 tombe par terre", "coeur s'arrete 3 secondes malaise", "bav bradycardie block electrique syncope"],
    advice: [
      "🔴 URGENCE RYTHMOLOGIQUE. Le 'câble électrique' entre le haut et le bas du cœur est coupé.",
      "Le cœur bat extrêmement lentement (30 battements/minute) et vous tombez dans les pommes (syncope).",
      "Appelez le 15. Vous avez sûrement besoin d'un pacemaker (pile cardiaque) en urgence."
    ]
  },
  {
    name: "brugada_syndrome",
    nameFr: "Syndrome de Brugada",
    icon: "🧬",
    color: "#7c3aed",
    keywords: ["mort subite jeune nuit asie fievre", "genetique ecg bizarre brugada tachycardie", "pere mort jeune coeur defaut electrique"],
    advice: [
      "Maladie électrique héréditaire du cœur. Le cœur de structure normale peut s'arrêter (fibrillation ventriculaire) surtout la nuit ou au moment d'une poussée de fièvre.",
      "Détecté uniquement sur un ECG spécifique.",
      "Si des membres de votre famille sont décédés brutalement jeunes et inexpliqués : exigez une consultation en Rythmologie Cardiaque."
    ]
  },
  {
    name: "tachycardia_supraventricular",
    nameFr: "Maladie de Bouveret (Tachycardie Jonctionnelle)",
    icon: "🐇",
    color: "#f43f5e",
    keywords: ["crise coeur tape a 200 debute arrete d'un coup", "tachycardie jonctionnelle bouveret jeune anxiogéne", "palpitation extreme coupure nette"],
    advice: [
      "Très fréquent chez les jeunes et les femmes : le cœur tape subitement à 180-200 bpm sans raison, et s'arrête d'un seul coup (on/off).",
      "C'est un petit 'court-circuit' bénin mais insupportable.",
      "Faire la manœuvre de Valsalva (souffler très fort bouche et nez fermés pour pousser sur le ventre) l'arrête souvent. Consultez un cardiologue (ablation possible)."
    ]
  },
  {
    name: "pericarditis",
    nameFr: "Péricardite Aiguë",
    icon: "🔥",
    color: "#ea580c",
    keywords: ["respirer fait mal a la poitrine soulagé assis penché coeur", "coeur frotte pointe pericardite", "fievre mal poitrine penche en avant ca va mieux"],
    advice: [
      "Inflammation de l'enveloppe du cœur (le Péricarde), très souvent virale et bénigne chez le jeune (quelques jours après un rhume).",
      "La douleur atroce empêche d'inspirer, mais SE CALME BEAUCOUP EN S'ASSEYANT PENCHÉ EN AVANT.",
      "Il faut consulter (Urgences/Médecin) pour confirmer à l'ECG; le médecin donnera des anti-inflammatoires puissants ou de l'Aspirine à haute dose."
    ]
  },

  // ── EXTENSION 55: PNEUMOLOGIE DE L'ADULTE (Interstitielle et vasculaire) ──
  {
    name: "pulmonary_arterial_hypertension",
    nameFr: "HTAP (Hypertension Artérielle Pulmonaire)",
    icon: "🌬️",
    color: "#6366f1",
    keywords: ["essoufflement inexpliqué levre bleue femme jeune", "htap pression poumon defaillance droite", "bleu essouffle marche 10 metres sans cœur malade"],
    advice: [
      "Maladie rare, souvent chez la femme jeune 30-50 ans. Les artères TRES PETITES des poumons se bouchent, forçant le cœur droit à s'épuiser.",
      "Essoufflement extrêmement lourd pour rien du tout. Diagnostic par cathétérisme cardiaque.",
      "Un suivi en centre spécialisé est impératif pour des traitements vasodilatateurs lourds."
    ]
  },
  {
    name: "asbestosis",
    nameFr: "Asbestose / Mésothéliome (Amiante)",
    icon: "⚒️",
    color: "#4b5563",
    keywords: ["amiante toux travailleur cancer alevole vieux", "essoufflé batiment amiante chaux", "mesotheliome plevre fibrose blanc radio"],
    advice: [
      "Les poumons deviennent durs (fibrose) à cause de milliers de fibres d'amiante respirés 20 ou 30 ans plus tôt dans le bâtiment.",
      "Reconnu comme maladie professionnelle. Essoufflement permanent et toux sèche.",
      "Consultez un pneumologue pour un scanner (TDM) et un bilan médico-légal."
    ]
  },
  {
    name: "silicosis",
    nameFr: "Silicose",
    icon: "⛏️",
    color: "#57534e",
    keywords: ["mineur charbon toux silicose poussiere", "tailleur de pierre poussiere poumon noir", "poumon dur caillou mine toux"],
    advice: [
      "Maladie pulmonaire typique des tailleurs de pierre, sableurs ou anciens mineurs de charbon.",
      "Provoque une destruction fibrotique du poumon et augmente grandement les risques d'avoir la tuberculose.",
      "Suivi pneumologique à vie."
    ]
  },
  {
    name: "sleep_apnea",
    nameFr: "Apnée du Sommeil (SAOS)",
    icon: "😴",
    color: "#0284c7",
    keywords: ["ronfle enormement s'arrete de respirer nuit etouffe", "somnolent la journee s'endort volant fatigue", "apnee du sommeil cpap gros cou"],
    advice: [
      "La gorge se bloque complètement pendant que vous dormez, vous forçant à vous réveiller en sursaut (parfois 50 fois par heure) pour respirer.",
      "Épuisement total le jour, hypertension, et risque très grave d'accident de voiture (et d'AVC).",
      "Il faut consulter un pneumologue. Perdre du poids et porter la 'machine à pression positive' (PPC) pour dormir vous changera la vie."
    ]
  },
  {
    name: "pleurisy",
    nameFr: "Pleurésie (Épanchement Pleural)",
    icon: "💧",
    color: "#3b82f6",
    keywords: ["eau dans les poumons ascite pleure", "douleur sur le coté quand je respire point coté arret asymétrique", "pleuresie epanchement plevre liquide tdm"],
    advice: [
      "Du liquide s'est accumulé entre votre poumon et vos côtes (il devrait n'y avoir que de l'air).",
      "Point de côté extrêmement aigu empêchant de respirer fort et essoufflement marqué.",
      "Nécessite une radio puis une ponction ('piquer dans le dos') pour voir d'où vient cette eau (infection, tuberculose, cancer, insuffisance cardiaque)."
    ]
  },

  // ── EXTENSION 56: MÉDECINE TROPICALE & VACCINOLOGIE ──
  {
    name: "yellow_fever",
    nameFr: "Fièvre Jaune",
    icon: "🦟",
    color: "#eab308",
    keywords: ["fievre tres jaune afrique moustique", "vomissemet noir fievre jaune", "voyage afrique sans vaccin jaune saigne"],
    advice: [
      "🔴 URGENCE VITALE et MALADIE À DÉCLARATION OBLIGATOIRE.",
      "Fièvre atroce au retour d'Afrique ou Amérique du Sud + Ictère (yeux fluos) + Saignements digestifs (vomi noir).",
      "Mortel dans de nombreux cas. Mettez le patient en isolement et APPELEZ LE 15 en Précisant le Voyage."
    ]
  },
  {
    name: "cholera",
    nameFr: "Choléra",
    icon: "🚰",
    color: "#a8a29e",
    keywords: ["diarhhee comme eau de riz bidon", "deshydratation extreme choléra eau sale pays pauvre", "litres diarrhée par jour afrique asie"],
    advice: [
      "Infection bactérienne par eau contaminée. La diarrhée est INARRÊTABLE (jusqu'à 10-15 litres par jour) et ressemble à de l'eau de cuisson de riz.",
      "C'est la déshydratation la plus foudroyante connue en médecine (mort en quelques heures chez un adulte).",
      "RÉHYDRATATION INTRAVEINEUSE MASSIVE (Urgences IMMÉDIATES)."
    ]
  },
  {
    name: "chikungunya",
    nameFr: "Chikungunya",
    icon: "🦟",
    color: "#f59e0b",
    keywords: ["fievre poignet poignard plié en deux", "chikungunya tordu de douleur articulaire antilles moustique", "douleur doigt arthrite apres afrique dom tom"],
    advice: [
      "Infection virale transmise par les moustiques ('maladie de l'homme courbé' en Swahili).",
      "Fièvre + Douleurs articulaires absolument intolérables et symétriques (poignets, chevilles) vous clouant au lit.",
      "Pas de traitement autre que paracétamol. Souvent fatiguant pendant plusieurs mois mais la guérison arrive sans séquelle."
    ]
  },
  {
    name: "tetanus",
    nameFr: "Tétanos",
    icon: "🧲",
    color: "#dc2626",
    keywords: ["machoire bloquee sourir force", "coupure rouille clou blocage muscle", "tetanos trismus vaccin rous"],
    advice: [
      "🔴 URGENCE VITALE (Si la mâchoire se bloque - 'trismus').",
      "Les toxines tétaniques d'un simple clou rouillé dans la terre bloquent tous les muscles.",
      "L'hospitalisation en réanimation est immédiate. Vérifiez votre vaccin tous les 10 à 20 ans, car il l'empêche à 100%!"
    ]
  },
  {
    name: "diphtheria",
    nameFr: "Diphtérie",
    icon: "😷",
    color: "#6b7280",
    keywords: ["fausse membrane blanche fond gorge arrache saigne etouffe", "diphtérie asie blocage larynx cou gonflé", "vaccin dpt voyage gorge etranglé blanc"],
    advice: [
      "Une membrane grise/blanche très épaisse se forme dans le fond de la gorge et ÉTOUFFE lentement le malade. Très contagieux.",
      "Elle libère une toxine qui attaque le cœur. Si vous n'êtes pas vacciné et que vous revenez de pays à risque: 🔴 URGENCE.",
      "On l'avait oublié, mais le vaccin DTC (Diphtérie) reste indispensable avant tout voyage lointain."
    ]
  },

  // ── EXTENSION 57: RHUMATOLOGIE PÉDIATRIQUE & MÉDECINE INTERNE ──
  {
    name: "kawasaki_disease",
    nameFr: "Maladie de Kawasaki",
    icon: "👶",
    color: "#ef4444",
    keywords: ["bebe fievre 5 jours yeux rouges sans pus levres fendillées langue framboise ganglions gros doidts gonflés depele", "kawasaki fievre 40 anevrisme bebe coeur", "langue framboise rouge fievre sans rhume"],
    advice: [
      "🔴 URGENCE PÉDIATRIQUE pour sauver son cœur.",
      "Si un enfant < 5 ans a de la fièvre depus >5 JOURS INEXPLIQUÉE + yeux rouges (sans pus) + langue ultra rouge à boutons (framboisée) + ganglions et mains rouges qui pèlent.",
      "Foncez aux Urgences. Il faut des Immunoglobulines intraveineuses dans les 10 jours pour éviter des anévrismes du cœur mortels."
    ]
  },
  {
    name: "juvenile_idiopathic_arthritis",
    nameFr: "Arthrite Juvénile Idiopathique (AJI)",
    icon: "👧",
    color: "#8b5cf6",
    keywords: ["bebe boite le matin articuluations chaudes genou", "arthrite enfant douleur rhumatisme bebe aji", "gonflement genou 5 ans poignet matin"],
    advice: [
      "Rhumatisme de l'enfant. Son genou, poignet ou cheville est très gonflé, très raide le matin et il boîte longuement, presque 0 douleur l'après midi.",
      "Consultez un pédiatre et rhumatologue. Les atteintes invisibles de l'œil (uvéite) sont systématiques à chercher pour sauver la vue.",
      "D'excellents traitements (Biothérapies) redonnent une vie normale."
    ]
  },
  {
    name: "igA_vasculitis",
    nameFr: "Purpura Rhumatoïde (Maladie de Schönlein-Henoch)",
    icon: "🩸",
    color: "#b91c1c",
    keywords: ["taches rouges bas des jambes bebe s'effacent pas quand on appuie mal ventre mal genou", "purpura rhumatoide enfant henoch schonlein iga", "fesse jambe violet bouton bebe fievre"],
    advice: [
      "Des petites 'taches de sang' sous la peau (Les taches ne disparaissent pas quand on appuie dessus avec un verre en plastique transparent) + douleurs atroces au ventre et genoux gonflés.",
      "Chez l'enfant 3-10 ans après un rhume. C'est une inflammation des vaisseaux.',",
      "Allez aux Urgences Pédiatriques. S'il n'y a pas d'atteinte rénale, cela guérit tout seul. Sinon de la cortisone sera requise."
    ]
  },
  {
    name: "marfan_syndrome",
    nameFr: "Syndrome de Marfan",
    icon: "🦒",
    color: "#475569",
    keywords: ["homme geant grand bras hyper souple doigts crochus araignee luxation cristallin aorte oeil arachnodactylie", "marfan genetique grand thorax creux", "anevrisme aorte grand souple marfan"],
    advice: [
      "Pathologie génétique des tissus. Les patients sont souvent très grands/minces, ont de longs doigts ('en araignée'), sont hyperlaxistes.",
      "Souvent un creux central dans le sternum. Le risque majeur est une dilatation/rupture de l'aorte abdominale/thoracique à l'âge adulte.",
      "Doit être suivi scrupuleusement tous les ans par l'échographie du cœur (Cardiologie)."
    ]
  },
  {
    name: "ehlers_danlos",
    nameFr: "Syndrome d'Ehlers-Danlos",
    icon: "🪢",
    color: "#f43f5e",
    keywords: ["peau extremement elastique etire luxation epaule hanche doigts tous les jours hematomes bleus facile", "syndrome dehlers danlos hyperlaxe douleurs partout", "genetique tissu conjonctif plie doigts en arriere"],
    advice: [
      "Le corps ne fabrique pas le collagène correctement.",
      "La peau s'étire anormalement (on tire l'avant bras de 10 cm), et TOUTES les articulations se déboitent sans effort (luxations à répétition, doigts tordus en arrière facilement) provoquant d'abominables douleurs chroniques.",
      "Maladie complexe et éprouvante, orientation vers un Centre de Référence ou Médecine Interne pour soulagement et orthèses spéciales."
    ]
  },

  // ── EXTENSION 58: TROUBLES FONCTIONNELS & GÉRIATRIE AVANCÉE ──
  {
    name: "irritable_bowel_syndrome",
    nameFr: "Syndrome de l'Intestin Irritable (Colopathie fonctionnelle)",
    icon: "🚽",
    color: "#d97706",
    keywords: ["mal de ventre ballonement diarhée constipation sans saignement examens normaux maux stress colon", "colopathie fonctionnelle sii", "maux ventre angoisse pet diarhee alternance normaux"],
    advice: [
      "Maladie dite 'fonctionnelle': Le scanner, les prises de sang et coloscopie sont 100% normaux mais la personne souffre AU QUOTIDIEN le martyre de ses intestins.",
      "Très lié à l'anxiété et l'alimentation. Pas de risque grave mais forte altération de la qualité de vie.",
      "Le régime FodMaps, la thérapie TCC et la méditation soulagent bien mieux que la myriade de médicaments anti-douleurs ou charbon."
    ]
  },
  {
    name: "chronic_fatigue_syndrome",
    nameFr: "Encéphalomyélite Myalgique (Syndrome de Fatigue Chronique)",
    icon: "🔋",
    color: "#64748b",
    keywords: ["epuisement apres un effort minime fatigue depuis des mois sans cause fievre muscle lourd sf ce pb cerveau", "syndrome fatigue chronique emc pem epuise lit", "malaise post effort malaise fatigue absolue annee"],
    advice: [
      "L'unification d'un épuisement qui ne part PAS au repos, pire après n'importe quel micro-effort musculaire ou intellectuel (syndrome de PEM : Malaise Post-Effort).",
      "La batterie est définitivement plafonnée à 10%. Pousser la personne aggrave dramatiquement la maladie.",
      "C'est une maladie biologique neurologique reconnue. Il faut la GESTION stricte de l'énergie de vie (Pacing) et pas de réadaptation brutale musculaire (sport forcé)."
    ]
  },
  {
    name: "delirium_elderly",
    nameFr: "Syndrome Confusionnel du sujet âgé (Delirium)",
    icon: "😵",
    color: "#a16207",
    keywords: ["vieux delirant depuis hier agité nuit sait plus son nom hopital", "confusion demence aigue papi mamie chute", "symptome confusionnel delirium vieux infecté", "grand paretdesorienté subitement hopital"],
    advice: [
      "🔴 URGENCE et PAS LA MALADIE D'ALZHEIMER (Contrairement à Alzheimer qui évolue sur des années, cela apparaît BRUTALEMENT DU JOUR AU LENDEMAIN).",
      "Une personne de 80 ans qui devient subitement folle, crie, tient des propos incohérents ou somnole tout le temps, a à 90% un problème 'caché':",
      "C'est presque toujours une Rétention Urinaire (envie de pisser coincée 'globe') ou un Fécalome (bouchon selles dures géantes) ou une banale infection urinaire / déshydratation la faisant délirer. AMENEZ LA AUX URGENCES. Le simple fait de vider l'urine ou caca lui redonnera sa raison !"
    ]
  },
  {
    name: "orthostatic_hypotension",
    nameFr: "Hypotension Orthostatique",
    icon: "🧲",
    color: "#cbd5e1",
    keywords: ["tete qui tourne le matin qaund je me leve vite voile noir vertige", "hypotension orthostatique etourdissement leve lit tombe vieux", "papie tombe matin", "vertige orthostatique pression sang baisse"],
    advice: [
      "Quand on se lève de son lit ou sa chaise: Le cœur n'a pas le temps de pomper et le sang déserte le cerveau, on voit des étoiles et on manque de s'évanouir quelques secondes.",
      "Prenez TOUJOURS 20 secondes assis au bord du lit avant de vous mettre debout, et 20 secondes debout avant de commencer à marcher.",
      "Hydratez vous et vérifiez que votre médecin vous a pas donné TROP de cachets contre l'hypertension ! Portez des bas de contention aide 99% du temps."
    ]
  },
  {
    name: "failure_to_thrive_elderly",
    nameFr: "Syndrome de Glissement (Dépression du grand âge)",
    icon: "🥀",
    color: "#475569",
    keywords: ["grand parent refuse de manger se laisse mourir mur triste apathique", "vieux ne mange plus ne boit plus au lit tourne dos lit fatigue absolue", "syndrome glissement suicide passif agee vieux refus soin"],
    advice: [
      "🔴 URGENCE GERIATRIQUE ET PSY CHOC! Souvent après une hospitalisation/choc.",
      "La personne âgée se tourne face au mur, met un arrêt brutal à l'alimentation et de l'hydratation '(je veux mourir'). C'est un pseudo-suicide passif.",
      "Sans Antidépresseurs très puissants + réhydratation de force + perfusions : l'issue est mortelle en 5 à 10 jours et une démotivation totale des membres. Contactez IMMÉDIATEMENT ses médecins et familles pour des stimulations massives."
    ]
  },

  // ── EXTENSION 59: PSYCHIATRIE DE L'ENFANT & DE L'ADOLESCENT ──
  {
    name: "adhd",
    nameFr: "TDAH (Trouble Déficit Attention Hyperactivité)",
    icon: "🌪️",
    color: "#f59e0b",
    keywords: ["enfant bouge tout le temps ne tiens pas en place puni école maitresse ecoute rien incapable concentration zappe tda", "oublie classeur tete l'air reveur agitation constante", "tdah amphi ritaline"],
    advice: [
      "L'enfant ou l'adulte ne le FAIT PAS EXPRÈS : c'est un déficit chronique de la dopamine dans le cortex frontal.",
      "Il n'arrive pas à filtrer et maintenir son attention sur une tache ennuyante ou reste un moteur 'hors de contrôle', impulsif.",
      "En parler au neuropédiatre ou un pédopsychiatre. Les aménagements de l'école (PAP) et les médicaments spécifiques (Méthylphénidate) transforment complétement la vie d'espoir et la réussite."
    ]
  },
  {
    name: "separation_anxiety",
    nameFr: "Anxiété de Séparation Sévère",
    icon: "😭",
    color: "#db2777",
    keywords: ["bebe pleure hurle ecole maternelle 3 ans s'accroche maman mere veut pas", "panique 4 ans vomi ecole lacher la main ascenceur phobie mere ecole peur folle", "angoisse de separation"],
    advice: [
      "L'enfant vit une TERREUR absolue (crises d'angoisses majeurs avec larmes, tremblements) d'être tué (ou que ses parents meurent) s'ils sont physiquement loin de lui/elle.",
      "Ne pas le/la rejeter 'Caprice', mais ne PAS non plus céder à l'enfermement définitif à la maison et l'évitement (ce qui renforce à 200% sa maladie).",
      "C'est l'indication la plus forte pour de la pédopsychologie brève/TCC où l'enfant apprend à surmonter les demi-heures en éloignement par jeu progressifs ludiques."
    ]
  },
  {
    name: "selective_mutism",
    nameFr: "Mutisme Sélectif",
    icon: "🤐",
    color: "#a8a29e",
    keywords: ["enfant parlent pipellette a la maison parents mais pipent AUCUN mot ecole etranger maitresse phobie parler timide", "mutisme selectif refuse parler inconnu 2 ans", "enfant qui fige parole"],
    advice: [
      "L'enfant parle ENORMERMENT MAIS EXCLUSIVEMENT à ses personnes familiers, et est rigoureusement FIGE dans un silence mortel des qu'il entre à la crèche, au primaire (voire ne veut plus tousser, plus faire pipi).",
      "C'est l'équivalent à grand trait à la timidité, ou plutôt d'un mode de 'phobie sociale majeure' des jeunes et ne DOIT jamais être réprimandée ou puni ou moqué ou forcé pour qu'il le fasse. Le temps le débloque souvent, aidez avec de l'Orthophonie spéciale TCC et Psychologues !"
    ]
  },
  {
    name: "conduct_disorder",
    nameFr: "Troubles des Conduites (TOP / TC)",
    icon: "🔥",
    color: "#dc2626",
    keywords: ["enfant ado tyrolien insulte pere mere casse meuble fuge vole ment bat animaux feu bagarre permanent trouble opposition", "top tc enfant demoniaque delinquant medecine", "trouble des conduite psychiatrie viole regles psychopatique"],
    advice: [
      "Toute violation continue (pas une simple crise ado de temps à autres): tortures répétées des chats, vols de portefeuilles, mensonges pathologiques et bagarres très graves, ou incendies et actes brutales.",
      "N'est pas lié à l'éducation ou manque de baffes, le problème est une insensibilité des zones de régulation empathique ou la dysfonction exécutive globale.",
      "Doittre pris très sérieusement et professionnellement à tous crins (pédopsy en TCC - Multi System) et éducateur spécialisés le plus TÔT POSSIBLE l'âge de l'enfant (8-14 ans)."
    ]
  },
  {
    name: "tourette_syndrome",
    nameFr: "Syndrome Gilles de la Tourette",
    icon: "🤯",
    color: "#8b5cf6",
    keywords: ["tic enfant insulte grogne renifle roule epaule secousse bras grimace vocale coprolalie tsgt", "tourette syndrome gilles tic oeil gueule vocal involontoire", "tic moteurs multiples"],
    advice: [
      "Combinaison chez l'enfant de plusieurs 'Tics moteurs' (cligne œil, torsion épaule/cou) assorti à un 'Tic vocal ou sonore' d'affilé (raclement très forts gorge ou cris étranges, et plus rarement insultes) pendant plus d'UN AN.",
      "Les tics ont un état de rémission / tempête, et les enfants peuvent les supprimer ou le masquer au prix de grandes fatigues (il exploserait ensuite en revenant dans sa chambre seul le soir !).",
      "Neurologie en Mouvements, thérapie HRT ou Aripiprazole, n'ayez jamais honte il faut expliquer l'école à la classe!"
    ]
  },

  // ── EXTENSION 60: CHIRURGIE VASCULAIRE & ANGIOLOGIE ──
  {
    name: "varicose_veins",
    nameFr: "Varices des Membres Inférieurs",
    icon: "🦵",
    color: "#60a5fa",
    keywords: ["grosse vaine zig zag bleue cheville jambe mollet vilain cordon gonfle veine lourde jambe soir", "varices phlebologue teleangiectasie etoile sang jambes lourdes veine bleu", "insufisance veineuse varicosite douleur debout pietinage"],
    advice: [
      "Les petites valves de vos veines se fatiguent et le sang fait des 'embouteillages' le soir, particulièrement si vous restez très longuement statique / debout (Coiffeuse/Vendeur) et de la chaleur.",
      "Seul ou presque, le traitement le plus important / médical fondamental reste le port des BAS/CHAUSSETTES DE CONTENTION, les jambes surélevées et douches fraiches du mois de pied au mois genou.",
      "Un écho-doppler en Angiologie verra si vous devez 'griller' (sclérose) cette veine abimée."
    ]
  },
  {
    name: "carotid_stenosis",
    nameFr: "Sténose de l'Artère Carotide (Risque AVC)",
    icon: "🫀",
    color: "#b91c1c",
    keywords: ["echo cou cou souffle carotide sténose plaque atherome cholesterol 70%", "chirurgie vasculaire carotide opérer déboucher endarteriectomy avc", "echo doppler tsa gorge bouché artère"],
    advice: [
      "Vos artères du cou qui irriguent votre propre cerveau se bouchent doucement de plaques de graisses ou calcaires (Athérome, Sucre, et surtout le TABAC, l'Hépatite de Tension Elevée et le temps).",
      "C'est asymptomatique. Si il arrive à 70% de bouché et cause de tout petit AVC invisibles on l'enlève de force :",
      "Soit votre chirurgien vous proposera une chirurgie (AIT Endartériectomie de l'incision du cou puis curage de graisses pour remettre propre la voie cerveau) en vue d'éviter un AVC mortel. Prenez vos Statines et Aspégic avec ponctualité absolue."
    ]
  },
  {
    name: "mesenteric_ischemia",
    nameFr: "Ischémie Mésentérique (Infarctus Digestif)",
    icon: "🌪️",
    color: "#7f1d1d",
    keywords: ["vieux douleurs de ventre horribles après repas peur manger amaigrissement extreme artere abdo maux de ventre ischemie angine de l'intestin infarctus de l'intestin peritonite douleur inintelligibles insupportable caillou"],
    advice: [
      "🔴 URGENCE CHIRURGICALE EXTRÊME DE RÉANIMATION (+60ans).",
      "Les vaisseaux de l'intestin sont bouchés (comme l'Infarctus du Cœur, mais dans le ventre). Le ventre (intestin) DEVIENT MORT de suffocation du manque de sang. Douleurs abdominales hors normes pour le médecin/urgences (Souvent 'Angor Digestif' préalable (crampes atroces après 15 min d'avoir mangé).",
      "URGENCES IMMÉDIATES / TDM Injecté et appel au chirurgien vasculaire 15."
    ]
  },
  {
    name: "giant_cell_arteritis_temporal",
    nameFr: "Artérite Temporale (Maladie de Horton) (Rappel URGENCE VASCULAIRE)",
    icon: "🙈",
    color: "#dc2626",
    keywords: ["artérite a cellules géantes artere tete tempes grosse corde arteritaire rouge aveugle", "voir trouble mal mâcher la viande crampes mâchoire mal a la langue douleurs crane cuir chevelu peigne vieux"],
    advice: [
      "🔴 URGENCE VITALE (Aveuglement Imminent en quelques Heures !)",
      "Vieux ou vielle (plus 65 ans); douleur EXTRÊME au cuir chevelu (le peignage fait mal), aux tempes, et la mâchoire se coince quand elle mange la viande.",
      "IL FAUT 1 MILLIGRAMME/KG de corticostéroïdes par kilo AUJOURD'HUI. Appel 15 pour Hôpital en urgence, pour la biopsie puis la Vue sera sauve !"
    ]
  },
  {
    name: "diabetic_foot_ulcer",
    nameFr: "Ulcère du Pied Diabétique (Mal perforant plantaire)",
    icon: "👣",
    color: "#b91c1c",
    keywords: ["diabetique depuis long plaie pied enorme trou pue sans mal trou diabetique infection ampute", "ulcère diabetique phalange noire osteite gangrene cheville", "perforant plantaire fievre rougeur cheville charcot osteoarthopathie podologue charcut"],
    advice: [
      "Symptôme final de la Neuropathie Diabétique + Sténose vasculaire. Vous n'avez plus de sang et PLUS DE SENSATION à vos pied! Un petit caillou de rien du tout dans vos chaussures détruit l'os au long de la semaine sans que vous ressentiez la Moindre douleur! Le trou va grandir, infecter l'os => Gangrène => Amputation fatale requise.",
      "🔴 URGENCE. Ne MARCHEZ PLUS (Botte ou décharge totale du moignon / talon de pied requise stricte). Vous devez consulter une EQUIPE SOS PIED DIABETIQUE et le Podologue urgemment : et surtout Équilibrer votre taux d'hémoglobine dans le Sang glyquée, et Inspectez vous-même aux pieds TOUS les soirs les zones devant une glace avec le plus grand recul de l'Oxygène!"
    ]
  },

  // ── EXTENSION 61: GASTRO-ENTÉROLOGIE FONCTIONNELLE & ANALE ──
  {
    name: "anal_fissure",
    nameFr: "Fissure Anale",
    icon: "🔪",
    color: "#b91c1c",
    keywords: ["douleur comme un rasoir aux toilettes sang papier constipation dechire anus", "fissure anale verre cassé sang toilette", "mal au cul fente cul sang rouge rasoir"],
    advice: [
      "Souvent déclenchée par une grosse constipation 'dure' : l'anus s'est déchiré.",
      "La douleur aux toilettes est affreuse ('lame de rasoir') et continue de brûler pendant des heures, avec quelques gouttes de sang pur sur le papier.",
      "Consultez; il faut ramollir à TOUT PRIX vos selles (Macrogol, eau Hépar, fibres) et mettre une crème cicatrisante. Guérit sans chirurgie la plupart du temps."
    ]
  },
  {
    name: "hemorrhoidal_thrombosis",
    nameFr: "Thrombose Hémorroïdaire",
    icon: "🍇",
    color: "#7f1d1d",
    keywords: ["boule dure bleue anus tres douloureuse assise hémorroide sortie caillot", "thrombose hemorroidaire saigne pas fait mal assis", "gros raisin anus ne rentre plus urgence cul"],
    advice: [
      "Une hémorroïde s'est coincée à l'extérieur avec un caillot de sang bloqué (boule dure et bleutée).",
      "La douleur est si atroce qu'on ne peut plus s'asseoir, mais ça ne saigne PAS tant qu'elle ne se perce pas.",
      "Urgences procto ou médecin pour une petite incision (anesthésie locale) qui évacue le caillot instantanément."
    ]
  },
  {
    name: "pilonidal_cyst",
    nameFr: "Kyste Pilonidal (Abcès sacro-coccygien)",
    icon: "🍑",
    color: "#ea580c",
    keywords: ["boule pus raie des fesses coule pue velu 20 ans poil incarné", "kyste pilonidal coccyx mal assise arriere pus sang chemise", "trou fesse pue sinus pilonidal"],
    advice: [
      "Des poils se sont incarnés 'à l'envers' dans le haut de la raie des fesses sous la peau.",
      "C'est devenu un immense abcès très douloureux qui finit par couler (pus puant et sanglant).",
      "Il faudra une chirurgie (souvent 'à ciel ouvert') par un proctologue classique. Une bonne hygiène (rasage au laser idéal) empêche la récidive."
    ]
  },
  {
    name: "celiac_disease",
    nameFr: "Maladie Cœliaque (Intolérance au Gluten Vraie)",
    icon: "🌾",
    color: "#8b5cf6",
    keywords: ["diarhee ble pain ventre gonflé carence fer maigre cœliaque intolerence", "gluten mal au cul ventre gaz intestin grêle detruit", "maladie cœliaque anémie aphtes fer carence"],
    advice: [
      "Le système immunitaire détruit votre propre intestin grêle à la moindre particule de Gluten (Blé, Orge, Seigle).",
      "Symptômes : Diarrhées énormes, épuisement, manque de Fer qui ne remonte jamais, et on perd du poids.",
      "Doit être prouvée par Fobroscopie+Biopsie de l'intestin ! Si positive : régime 100% stricte Sans Gluten à VIE. Ne commencez JAMAIS le régime AVANT la biopsie."
    ]
  },
  {
    name: "crohns_disease",
    nameFr: "Maladie de Crohn",
    icon: "🔥",
    color: "#dc2626",
    keywords: ["sang dans le caca diarhée 10 fois par jour fievre jeune douleur droite intestin", "maladie de crohn stenose afte trou anus fistule maigrit sang", "fistule anale fievre caca glaireux sang crohn mici"],
    advice: [
      "Maladie Inflammatoire Chronique (MICI) du tube digestif. Le système immunitaire attaque l'intestin en profondeur.",
      "Grosse diarrhée glaireuse/sanglante depuis des mois + douleur bas-droite du ventre + perte de poids, et souvent des fissures/abcès de l'anus à répétition.",
      "Consultez un gastroentérologue urgemment pour une Coloscopie : il faut des biothérapies puissantes au long cours."
    ]
  },

  // ── EXTENSION 62: NEUROLOGIE PÉRIPHÉRIQUE & MYOPATHIES ──
  {
    name: "carpal_tunnel",
    nameFr: "Syndrome du Canal Carpien",
    icon: "🖐️",
    color: "#3b82f6",
    keywords: ["fourmis bout des doigts la nuit reveil secoue la main mal poignet", "canal carpien doigt engourdit secoue 3 doigts caissiere", "plus de force dans la main pouce index majeur dorment"],
    advice: [
      "Le nerf médian est coincé dans votre poignet. Typique de la cinquantaine / travail manuel / femme enceinte.",
      "Vous êtes réveillé la nuit par d'affreuses décharges et 'fourmis' dans les 3 premiers doigts (pouce/index/majeur) et devez secouer la main.",
      "Consultez pour un EMG. Traitement : Attelle la nuit, Infiltration ou petite chirurgie très efficace."
    ]
  },
  {
    name: "als_lou_gehrig",
    nameFr: "SLA (Maladie de Charcot / Lou Gehrig)",
    icon: "🧊",
    color: "#6b7280",
    keywords: ["muscle fond perd sa force main parle mal spasme fasciculation pas de douleur", "charcot sla lou gehrig degenerecence motoneurone", "n'arrive plus a avaler marché main fond spasme sous peau"],
    advice: [
      "L'une des maladies neurologiques les plus terrifiantes (Dégénérescence des motoneurones).",
      "Les muscles s'atrophient et meurent 1 à 1 sans AUCUNE DOULEUR ni perte de la sensibilité : la main lâche des objets, bave, ou la voix bloque, et petits sursauts sous la peau ('fasciculations').",
      "Consultez en grande urgence neurologique universitaire."
    ]
  },
  {
    name: "myasthenia_gravis",
    nameFr: "Myasthénie",
    icon: "👁️",
    color: "#a8a29e",
    keywords: ["paupiere tombe le soir double vision fatigue muscle fin de journee", "myasthenie ptosis faiblaisse parler avaler", "voit double quand fatigué anticorps recpeteurs ach"],
    advice: [
      "La communication entre le nerf et le muscle est coupée par vos anticorps.",
      "Symptôme TYPIQUE : On se réveille très bien le matin, mais plus la journée avance, plus une paupière 'tombe' toute seule, ou on voit double (diplopie) par épuisement de l'œil, puis des bras.",
      "Orientation en consultation Neurologie (électromyogramme avec recherche d'épuisement)."
    ]
  },
  {
    name: "guillain_barre",
    nameFr: "Syndrome de Guillain-Barré",
    icon: "🦵",
    color: "#1d4ed8",
    keywords: ["paralysie commence par les pieds en quelques jours et monte sans reflexe", "guillain barre apres une gastro s'etouffe jambes marche plus", "polyradiculonevrite aigue paralysie flasque"],
    advice: [
      "🔴 URGENCE NEUROLOGIQUE. Souvent 1 à 3 semaines après une gastro-entérite banale (Campylobacter).",
      "Les jambes deviennent lourdes et faibles avec des 'fourmis', cela monte tous les jours aux bras puis peut bloquer la respiration en quelques jours.",
      "Il faut aller aux Hôpitaux/Urgences (15). Le blocage respiratoire est mortel, mais avec la réanimation/immunoglobulines, on s'en remet en quelques mois."
    ]
  },
  {
    name: "polyneuropathy_diabetic",
    nameFr: "Polynévrite Diabétique",
    icon: "🧦",
    color: "#d97706",
    keywords: ["sent plus ses pieds marche comme sur du coton fourmis froid chaud symetrique", "chaussette diabetique ne sent plus rien fourmillement", "neuropathie diabetique peripherique alcoolique brulure"],
    advice: [
      "Le Diabète (ou parfois d'énormes quantités d'Alcool de longue date) a 'rôti' et détruit lentement les nerfs terminaux des DEUX pieds.",
      "Symptôme : Sensation de marcher en permanence avec des chaussettes pleines de coton, plus ou moins douloureuse (brûlures électriques la nuit).",
      "Vérifiez vos taux de sucres / vitamines. C'est en général irréversible mais on peut stopper la progression. Et ATTENTION aux blessures invisibles du pied."
    ]
  },

  // ── EXTENSION 63: OBSTÉTRIQUE PATHOLOGIQUE & SUITES DE COUCHES ──
  {
    name: "preeclampsia",
    nameFr: "Pré-éclampsie",
    icon: "🤰",
    color: "#b91c1c",
    keywords: ["femme enceinte tension 16 oedeme visages mouches yeux barre estomac sang urine proteine", "preeclampsie eclampsie toxemie gravidique convulse enceinte", "bourdonnent oreilles flash enceinte"],
    advice: [
      "🔴 URGENCE VITALE OBSTÉTRICALE. (Placenta toxique).",
      "Après le 5ème mois : Grosse prise de poids (Œdème d'eau), Tension Artérielle >14/9 et Protéines dans les urines.",
      "S'il y a acouphènes, flashs ou barre de douleur extrême 'au niveau de l'estomac' : FONCEZ à la MATERNITÉ. La convulsion (Éclampsie) mortelle de la mère et du bébé est imminente !"
    ]
  },
  {
    name: "ectopic_pregnancy",
    nameFr: "Grossesse Extra-Utérine (GEU)",
    icon: "🩸",
    color: "#dc2626",
    keywords: ["test positif mere douleur poignard coté perte de sang urgence saignement malaise pale", "geu extra uterine trompe pete salpingite", "douleur bas ventre test grossesse syncopé trompe"],
    advice: [
      "🔴 URGENCE VITALE (Choc Hémorragique).",
      "Le fœtus grandit dans la petite trompe ovarienne : il va la faire EXPLOSER.",
      "Toute femme en âge d'avoir des enfants (avec test positif ou retard de règles) qui présente d'un coup une douleur 'en coup de couteau' asymétrique au ventre et se sent évanouir : URGENCE CHIRURGICALE au 15 ou direct aux urgences maternelles."
    ]
  },
  {
    name: "postpartum_hemorrhage",
    nameFr: "Hémorragie de la Délivrance (Post-Partum)",
    icon: "🚨",
    color: "#991b1b",
    keywords: ["saigne des litres juste apres accouplement chute tension atonie uterine", "hemorragie uterus mou retracte accouchement", "plus de 500ml sac apres naissance"],
    advice: [
      "La cause n°1 de mort maternelle dans le Monde : suite à l'expulsion du bébé et du placenta, l'utérus n'arrive pas à se re-contracter ('atonie').",
      "Il saigne à torrent. Traitement immédiat par massage utérin, ocytocine, ou prostaglandines, voire chirurgie aux blocs obstréticaux.",
      "(C'est une urgence gérée sur place par les gynécos si vous accouchez à l'hôpital)."
    ]
  },
  {
    name: "postpartum_depression",
    nameFr: "Dépression Post-Partum (et Psychose Puerpérale)",
    icon: "⛈️",
    color: "#475569",
    keywords: ["mere deteste son bebe triste depuis accouchement pleure envie mourir danger bebe", "psychose puerperale voix tue son bebe depression postpartum", "baby blues qui dure des mois fatigue suicide"],
    advice: [
      "Beaucoup plus grave qu'un simple 'Baby blues' de 3 jours.",
      "La mère ressent un vide absolu, a des idées de jeter son bébé, ou entend des voix (dans le cas rare de la psychose).",
      "🔴 NE LA JUGEZ JAMAIS (c'est entièrement hormonal et cérébral). Éloignez le bébé et l'emmener d'Urgence en Psychiatrie/Maternité ensemble pour des soins qui sauvent la vie."
    ]
  },
  {
    name: "mastitis_breastfeeding",
    nameFr: "Mastite et Engorgement",
    icon: "🤱",
    color: "#ea580c",
    keywords: ["sein dur rouge fievre 39 allaite mal atroce crevasse pus", "mastite engorgement lymphangite tire lait pue bebe", "inflammation sein donne lait canal bloqué"],
    advice: [
      "Pendant l'allaitement : le lait bloque un canal et le sein rouge s'infecte très fort (Fièvre à 39°C impressionnante avec courbature).",
      "IL FAUT CONTINUER D'ALLAITER ou vider au tire-lait. Mettre du chaud ou du froid aide, et parlez en à la sage femme.",
      "Si ça dure > 2 jours ou devient un abcès gonflé : le médecin donnera des antibiotiques qui restent souvent compatibles avec l'allaitement."
    ]
  },

  // ── EXTENSION 64: UROLOGIE DE L'HOMME & ANDROLOGIE MINEURE ──
  {
    name: "prostatitis",
    nameFr: "Prostatite Aiguë",
    icon: "🍆",
    color: "#b91c1c",
    keywords: ["fievre 40 prostate pisse brulure toucher rectal mal mal de ventre anus homme", "prostatite bruler uriner vieux sondage infection urinaire fievre", "prostate infectée pus pipi brulure chaude fievre 39"],
    advice: [
      "L'infection grave de la prostate : l'homme a très mal au 'périnée' (derrière les testicules), une envie constante d'uriner qui brûle avec une très forte fièvre et même des frissons intenses.",
      "🔴 URGENCE Urologique. La rétention d'urine et la septicémie sont aux portes.",
      "Consultez les Urgences, il faudra une échographie / ECBU et quasiment 3 à 4 Semaines d'antibiotiques."
    ]
  },
  {
    name: "bph_prostate",
    nameFr: "Hypertrophie Bénigne de la Prostate (HBP)",
    icon: "👴",
    color: "#6b7280",
    keywords: ["homme age lever pisser 4 fois nuit jet d'urine faible compte gouttes", "hypertrophie prostate beningue adenome force pisser adx", "vieux pisse mal bloquage residu urine nuit"],
    advice: [
      "Très classique au-dessus de 50 ans : la prostate a très doucement grossi et écrase le 'tuyau' de l'urètre.",
      "Le jet de pipi est très faible, on doit forcer, ça goutte en fin et surtout la nuit on se lève sans arrêt.",
      "Consultez votre Urologue sans panique (Ce N'EST PAS LE CANCER !). Médicaments (Alpha bloquants) ou petite opération de grattage laser possible."
    ]
  },
  {
    name: "hydrocele_varicocele",
    nameFr: "Hydrocèle / Varicocèle",
    icon: "🎈",
    color: "#3b82f6",
    keywords: ["testicule gros mou lumiere passe a travers testicule comme eponge veine pendouillle", "hydrocele eau dans testicule gros bebe", "varicocele veine spagheti chaleur fertilité"],
    advice: [
      "Hydrocèle (Poche d'Eau indolore illuminée à la lampe torche) ou Varicocèle (varices 'en sac de spaghettis' au-dessus d'un testicule).",
      "Bénin / Aucune Urgence. Souvent diagnostiqué de façon programmée. Peut parfois causer de petits problèmes de fertilité / petites lourdeurs dans la chaleur pour la varicocèle.",
      "Un Urologue verra s'il est temps d'opérer le sac avec délicatesse."
    ]
  },
  {
    name: "phimosis_paraphimosis",
    nameFr: "Phimosis / Paraphimosis",
    icon: "🌭",
    color: "#ef4444",
    keywords: ["gland coincé peau decallotée etranglement penis bleu urgent enfant", "phimosis n'arrive pas a baisser la peau douloureux erections paraphimosis coincé derriere bourrelet"],
    advice: [
      "Phimosis préau : Il n'est pas possible de 'décalotter' (abaisser la peau) et c'est très serré pour uriner et en érection (Traitement => Crème ou petite circoncision).",
      "🔴 Paraphimosis URGENCE: vous avez descendu la peau sous le gland et L'ANNEAU ÉTRANGLE LES VAISSEAUX : LE GLAND DEVIENT BLEU. Foncez aux urgences ou tirez la peau vers le haut fortement sous eau glacée ou c'est l'amputation ou la mort tissulaire dans les quelques heures."
    ]
  },
  {
    name: "peyronie_disease",
    nameFr: "Maladie de La Peyronie",
    icon: "🍌",
    color: "#8b5cf6",
    keywords: ["penis tordu au cours de sa vie plaque dure sur le zboube douleur erection angulation aigue courbure", "maladie la peyronie verge raccourci dur plaque calcifié tordue 90 degres"],
    advice: [
      "Désordre scléreux de la paroi érectile caverneuse chez l'adulte d'âge mûr.",
      "Formation d'une plaque totalement dure 'cartonnée' au-dessus de l'arbre, qui a pour conséquence immédiate de TORDRE le pénis de 40 à 90° à l'érection (et cause parfois des douleurs initialement ou entrave les rapports).",
      "Urologie pour ondes de Chocs, Xiapex ou chirurgie dans les cas graves/stabilisés."
    ]
  },

  // ── EXTENSION 65: INFECTIONS SEXUELLEMENT TRANSMISSIBLES (IST) ──
  {
    name: "chlamydia_gonorrhea",
    nameFr: "Chlamydia / Gonorrhée (Chaudepisse)",
    icon: "🔥",
    color: "#f59e0b",
    keywords: ["coule vert jaune chaudepisse brule pipi ist seringue chlamydia sterilité gonocoque blennorragie", "ecoulement pus verge ou vagin brulure", "pipi fait affreusement coule matin"],
    advice: [
      "Le matin, vous voyez une goutte ou un filet jaune/vert couler de l'urètre, brûler à la miction (chez l'homme) ou des sécrétions purulentes/douleurs ventre (chez la femme).",
      "C'est la fameuse chaudepisse ou une chlamydiose très banale.",
      "N'ayez pas honte : Allez au laboratoire/médecin pour une injection de Ceftriaxone aux Fesses (1 shot guérit à 100%) ! Portez un Préservatif et avertissez TOUS les autres partenaires !"
    ]
  },
  {
    name: "syphilis",
    nameFr: "Syphilis",
    icon: "🕳️",
    color: "#b91c1c",
    keywords: ["chancre syphilis dur pas mal gland rond rouge trou ulcere propre ist", "macaron fesses bouche cuisse trous propre sans douleur spirochete", "treponeme boutton paume main pied syphilis deux"],
    advice: [
      "IST causée par une bactérie très dure (Treponème).",
      "Signe Premier (Chancre) : Un ou plusieurs 'trous' rouges et complètement durs, souvent bien ronds sur le sexe ou les lèvres MAIS TOTALEMENT INDOLORES.",
      "Ne passe pas tout seul, ça deviendra la 'phase 2' (pleins de boutons aux paumes de mains !). Traitement très archaïque mais sûr : Une Grosse Piqure de Pénicilline (Extencilline) chez le médecin."
    ]
  },
  {
    name: "genital_herpes",
    nameFr: "Herpès Génital",
    icon: "🍇",
    color: "#db2777",
    keywords: ["bouquet de bulles bouton fievre picote saigne sex ucleres degeulasse herpetique mal ist", "herpes genital douleur atroce brulure vésicule fesse sex", "prurit bulles vagin testicule"],
    advice: [
      "Virus caché à vie (HSV-2). Forme un 'bouquet de minuscules bulles' extrêmement douloureuses sur le sexe/fesses et brûlent en urinant.",
      "C'est un Herpès, comme le bouton de fièvre de la lèvre. TRÈS CONTAGIEUX pendant la crise.",
      "Anti-viraux (Zélitrex Aciclovir) 5 jours prescrits par médecin, et stop relations ou préservatifs tant qu'il y a des lésions."
    ]
  },
  {
    name: "hpv_warts",
    nameFr: "Condylomes (Végétations Vénériennes / HPV)",
    icon: "🥦",
    color: "#65a30d",
    keywords: ["chou fleur sur le gland verrue crete de coq anus vagin hpv ist", "condylome vegetations verrues sexuelle papillomavirus choufleur papules blanches piquant"],
    advice: [
      "Provoqué par le Papillomavirus Humain (HPV).",
      "Ressemble à de minuscules verrues blanches (ou des crêtes de coq de type Chou-fleur) indolores sous le gland ou autour de l'anus/vagin.",
      "Laser, froid (cryo) ou crèmes chimiques en dermatologie/gynécologie. (Raison principale DU VACCIN HPV pour la Prévention Mondiale du Cancer col Uterus !)"
    ]
  },
  {
    name: "trichomoniasis",
    nameFr: "Trichomonase (Trichomonas)",
    icon: "🦠",
    color: "#84cc16",
    keywords: ["perte vaginale vert fluo jaune mousseuse sent tres mauvais poisson pourri parasitaire", "trichomonas gratte chatte vagin demangeaison flagyl", "pue le poisson vagin vert bulle frottis"],
    advice: [
      "L'infection à Parasite : Provoque une énorme et écœurante vaginite 'jaune-verte mousseuse' ou un 'poisson très pourri', sans parler des fortes démangeaisons.",
      "Extrêmement désagréable mais très très bénin.",
      "Médicaments (Métronidazole / Flagyl) pour le couplé obligatoire, car c'est sexuellement transmissible. Zéro alcool obligatoire pendant que vous prenez ce médicament sinon nausée mortelle (effet antabuse) !"
    ]
  },

  // ── EXTENSION 66: IMMUNO-ALLERGOLOGIE ──
  {
    name: "anaphylaxis",
    nameFr: "Choc Anaphylactique",
    icon: "🐝",
    color: "#b91c1c",
    keywords: ["piqure guepe cacahuete alergie gorge gonfle etouffe urticaire geant malaise", "choc anaphylactique tombe dans les pommes urticaire rouge", "arachide epi pen epipen adrenaline oedeme quincke urgence"],
    advice: [
      "🔴 URGENCE VITALE ABSOLUE DE RANIMATION ! L'allergie ultime.",
      "10 minutes après un médicament/fruit de mer/cacahuète ou par un venin de guêpe, vous avez des dizaines de palques ou urticaire qui s'étendent, du Poids et Étouffements sur la gorge (Quincke) et perdez connaissance par manque de tension !",
      "L'INJECTION PAR STYLO ADRENALINE (Épipen etc.) DANS LA CUISSE EST IMMÉDIATEMENT RECOMMANDÉE SANS ATTENDRE. Appelez le 15, ou foncez aux portes ! Répétez 5 à 15 minutes."
    ]
  },
  {
    name: "allergic_rhinitis",
    nameFr: "Rhinite Allergique (Rhume des Foins)",
    icon: "🤧",
    color: "#38bdf8",
    keywords: ["nez qui coule sans fievre eternue 10 fois de suite printemps yeux gratte larmoie pollen graminés", "rhume de foins eternuement transparent eau", "rhinite allergie printemps demangeaison nez"],
    advice: [
      "100% bénin. L'allergie du nez face au pollen de printemps d'arbres/graminées ou aux acariens d'hiver (le matin au réveil).",
      "Les yeux piquent (conjonctivite légère), et vous éternuez des séries de 10 fois successives 'à l'eau clair', avec zéro fièvre.",
      "Antihistaminique Oral (Cétirizine sans ordonnance) et Lavage Nasal eau salée (Sérum) pour s'en affranchir. Voir allergologue pour l'immunothérapie (Désensibilisation)."
    ]
  },
  {
    name: "hives_urticaria",
    nameFr: "Urticaire Aiguë",
    icon: "🍓",
    color: "#f43f5e",
    keywords: ["plaque rouge relief piquant ortie boule gonfle endroit a l'autre gratte a s'arracher", "urticaire plaque qui dure pas fraise stress chaleur rouge", "papules oedemateuses fuite vaisseau demangaison"],
    advice: [
      "Votre corps sort de l'histamine sous forme de plaques roses surélevées brûlantes/grattantes très fortement ('comme une feuille d'orties').",
      "Très impressionnant mais tant que la langue ou gorge respirent toujours sans gonflement, ce n'est PAS un choc anaphylactique mortel.",
      "Les plaques changent de place en moins de 24 heures (sinon ce n'est pas de l'urticaire !). Anti-histaminique d'urgence suffisant."
    ]
  },
  {
    name: "angioedema_bradykinin",
    nameFr: "Angioedème Bradykinique",
    icon: "🎈",
    color: "#8b5cf6",
    keywords: ["levre geante langue gonfle enorme enorme medocien pril perindopril iec sans plaqu gratte pas", "oedeme bradykinine iec medoc tension", "quinque hereditaire sans asme asymetrie"],
    advice: [
      "🔴 URGENCE. Pas l'histamine 'classique' de l'allergie, mais la bradykinine !! Résiste souvent aux anti-Allergène !.",
      "Liée typiquement aux traitements HyperTenseurs (les IEC comme les 'pils/pril' Ramipril etc) ou une cause Héréditaire Rares.",
      "Vous avez une déformation titanesque de lèvres et du cou / intestin sans que ça gratte du tout, aucune urticaire ni rougeur sur vous ! Aux Urgences et arrêter pour toujours le médicaments !"
    ]
  },
  {
    name: "contact_dermatitis",
    nameFr: "Eczéma de Contact",
    icon: "⌚",
    color: "#d97706",
    keywords: ["bracelet montre rouge gratte bouton nickel bouton jean ventre rouge suinture degeu", "allergie sparadrap pansement contact eczema vesicule suintant", "maquillage rouge oeil parfum bouton"],
    advice: [
      "L'allergie classique d'une substance collée pendant plusieurs heures/jours sur votre peau : Le nickel (boucle jean), Le sparadrap, Les collyres...etc.",
      "Le dessin de l'allergie trace au Crayon LA FORME EXACTE de la montre/du pansement. Les petites bulles coulent de ce liquide puant transparent.",
      "Enlevez l'agent coupable puis mettez une bonne pommade de Corticoïdes en vente libre/pharmacies 4 jours."
    ]
  },

  // ── EXTENSION 67: TOXICOLOGIE & INTOXICATIONS AIGUËS ──
  {
    name: "carbon_monoxide_poisoning",
    nameFr: "Intoxication au Monoxyde de Carbone (CO)",
    icon: "💨",
    color: "#991b1b",
    keywords: ["mal de tete famille chaudiere poele nausee vomi toupie fatigue hiver au chaud", "oxygene co monoxyde gaz invisible poele a bois maux tete", "cerveau dans coton mort 4 personne chaudiere"],
    advice: [
      "🔴 URGENCE VITALE PREMIÈRE. TOUTE la maisonnée (y compris chats et chiens) se lève cet hiver avec de fortes nausées à mourir et un gros mal de tête 'dans du coton'.",
      "Il est libéré par la mauvaise combustion/cheminée de gaz de la poil, sans ODEUR SANS COULEUR (ce n'est pas le gaz Butane qui pue !).",
      "VOUS POUVEZ PERDRE CONNAISSANCE et MOURIR tous ensemble (OXY-HEMOGLOBINE bloquée par CO). OUVREZ LES FENÊTRES MAINTENANT PUIS SORTEZ DE LA MAISON AVANT L'APPEL AU 18 / 15 ! Hôpital ou Caisson hyperbare."
    ]
  },
  {
    name: "paracetamol_overdose",
    nameFr: "Intoxication au Paracétamol",
    icon: "💊",
    color: "#b91c1c",
    keywords: ["suicide 4 boite doliprane pris trop paracetamol vomir fatigue fois", "fievre donc plein doliprane sans faire gaffe foie detruit hepatite fievre", "toxicite acetaminophene mortel au bout 2 jours"],
    advice: [
      "🔴 URGENCE EXTRÊME INSIDIEUSE (Toxicologie Hépatique).",
      "Le médicament le plus vendu monde (Tylenol/Doliprane/Dafalgan) PEUT TUER LE FOIE SANS APPEL s'il y'a consommation de plus 4 GRAMMES EN UN JOUR (Surtout avec de l'Alcool ou foie fatigué).",
      "Les Nausées ou vomir n'arrivent que 24h APRÈS : C'est TROP TARD. Il FAUT ALLER AU URGENCES Immédiatement pour vous donner l'Antidote secret (Mucomyst IV : N--Acétyle-Cystéine) en prévention !"
    ]
  },
  {
    name: "opioid_overdose",
    nameFr: "Overdose aux Opiacés",
    icon: "💉",
    color: "#dc2626",
    keywords: ["pupille petit pointe myosis respire 3 fois heroinne morphine oxycontin oxycodone malaise tramadol forte dose", "overdose arret respiratoire comateux", "ne respire plus apres cachet hero ou morph"],
    advice: [
      "🔴 URGENCE VITALE RÉANIMATION.",
      "Drogues Illégales (Héroïne/Fentanyl) ou Prescription médicales légales des USA massive (Morphine/Oxy/Tramadol).",
      "Symptôme Immanquable : La Personne dans la Stupeur, Elle NE RESPIRE PLUS DE TOUT (ou 3 fois minute), et l'enfer c'est que LES PUPILLES (yeux intérieurs) SOIENT MYOSIQUES TETE D'EIPNGLES. Le Spray NASAL Naloxone est L'ANTIDOTE MAGIQUE AUX URGENCES (15/112/911)."
    ]
  },
  {
    name: "botulism",
    nameFr: "Botulisme",
    icon: "🥫",
    color: "#ea580c",
    keywords: ["conserve gonfle confiture fait maison double voix bave avale plus paralysie pupilles", "botulisme paralyse respiration flasque charcuterie mort toxine"],
    advice: [
      "🔴 URGENCE VITALE (Maladie à Déclaration Obligatoire Mondiale).",
      "On mange des conserves en bocal abimées de type Charcuteries Artisanale (ou Miel de bébés). Toxine Neurotoxique ultra PUISSANTE DU MONDE : TOUTE LA TÊTE DESCEND",
      "La Baisse des Paupières, on avale plus, trouble voix puis Paralysie Flasque des Respirations. => Anti toxine aux Soins Intensifs 15 !"
    ]
  },
  {
    name: "mushroom_poisoning_amatoxin",
    nameFr: "Intoxication Phalloïdienne (Mortalité Champignons)",
    icon: "🍄",
    color: "#7f1d1d",
    keywords: ["mangé champignon foret amanite vomir diarhée mortelle a mort foie detruit heure", "10 h apres le repas diarhée vomi choleriforme amanite phalloide champignon orellanine", "syndrome phalloidien champignon urgence"],
    advice: [
      "🔴 URGENCE DE SOINS INTENSIFS (+ Centre Anti-Poison obligatoire !).",
      "La personne a mangé des champignons de forêt : Amanite Phalloïde (qui aiment l'été humide et l'automne).",
      "C'est la Seule toxine fongique qui DONNE un INCIDENCE 'Tardive' au VOMISSEMENT de 10 Heures / 12 heures APRÈS. Si vous vomissez ou diarrhée > 10 heures après un repas de champignons en famille = Destruction hépatique en cours absolue et greffe requise ! URGENCES / CAP !"
    ]
  },

  // ── EXTENSION 68: MÉDECINE ENVIRONNEMENTALE & THERMIQUE ──
  {
    name: "heatstroke",
    nameFr: "Coup de Chaleur (Heatstroke)",
    icon: "🥵",
    color: "#dc2626",
    keywords: ["canicules vieux temperature 41 deshydratation plus de sueur cerveau comateux sec", "coup de chaleur course enfant cour fievre seche soleil delire chaud insoluation grave"],
    advice: [
      "🔴 URGENCE VITALE DIRECTE . Ne pas confondre avec une 'insolation'.",
      "Le thermomètres de cerveaux casse par grand Canicules. La personne très âgée / coureur marathon A LE CORPS SEC (PLUS DE SUEUR !). Et une température de 41 ° C ! Délirium avec le Comateux ! N'donnez JAMAIS du Doliprane ou Aspirine car c'est inutile !",
      "Labeur Physique massif IMMÉDIAT EN DEHORS: Enveloppez le de LINGES TREMPES D'EAU GLACEE / VENTILATEUR GÉANT + APPEL AU 15. Taux de Mortalité : 30%"
    ]
  },
  {
    name: "hypothermia_severe",
    nameFr: "Hypothermie Sévère",
    icon: "🥶",
    color: "#3b82f6",
    keywords: ["froid gelé temperature 30 arret 35 tremblement plus neige noyer froid sdf noel clochard deces", "hypothermie arrete de frissonner marbrer conscience part"],
    advice: [
      "🔴 URGENCE RÉA. Personne SDF à la rue l'hiver, ou Avalanche et noyés Hiver.",
      "Le premier stade ils tremblent bcp, MAIS le STADE GRAVE il s'arrêtent de frissonner à < 32°C. Leurs nerfs plongent dans un délirium absurde (ils se déshabillent en se sentant bouillants souvent 'Pardaoxical').",
      "NE PAS MASSER SES MEMBRES !! Vous risquez d'envoyer tout le froid glacé direct au cœur (Mort Subite par fibrillation V). Entourez le de plaids Métallisés Survie vers Réanimation (Réchauffer depuis intérieur)."
    ]
  },
  {
    name: "frostbite",
    nameFr: "Gelures (Montagne / Gel Extrême)",
    icon: "⛄",
    color: "#1e3a8a",
    keywords: ["noir doigt gellure grand froid montagne ski dur noir cloque ongle amputés", "engelure doigt de pieds blanc marbré gelures glace"],
    advice: [
      "Lésions classiques des alpinisme / sports de skis / Froid intense > -20C sans protection ou sans gants.",
      "L'organe devient blanc pale puis bulle et devient Noir avec escarre (Tissulaire 'Gangrèze sèche par froid'), Souvent on le coupe.",
      "Réchauffement à EAU DOUCE 37°C stricte (PAS D'EAU BOUILLANTE sous menace de cuire le membre analgésie) accompagné de Médecin, Vasolidateurs ! Aspirine et pas Tabac !"
    ]
  },
  {
    name: "decompression_sickness",
    nameFr: "Maladie de Décompression (Accident Plongée Sous-Marine)",
    icon: "🤿",
    color: "#2563eb",
    keywords: ["plongée sous marine remontée rapide puce bend douleur epaule puce peau azote avion bulle neuro bave vertige", "accident de plongee bulles gaz palier remontre trop vite decompresser fatique"],
    advice: [
      "🔴 URGENCE ABSOLUE et HYPERBARE. Vous avez remonté à vive allure de la Vingtaine sans réaliser vos Paliere strictes sous marine Bouteille.",
      "L'Azote se met à bouillir comme le Bouchon de Champagne, provoquant bulles cérébrales, bulles à moelles lombo-sciatiques et puce 'BEND'. Vous perdez sensibilité au ventre jambes et fatigue accablante 'Bend'.",
      "NE JAMAIS REPLONGER pour le 'Réparer', ALLONGEZ VOUS => Oxygénations 100% avec Masque + Evacuation Hyperbares (Caissons Recompressions CROSS MED etc.)"
    ]
  },
  {
    name: "altitude_sickness_hace_hape",
    nameFr: "Mal Aigu des Montagnes (MAM) & Œdèmes de Haute Altitude",
    icon: "🏔️",
    color: "#8b5cf6",
    keywords: ["mont blanc everest 3000 ams opah ocah mal de tete bourre montagne vomit marche comme un con", "mal aigu montage ams hpae oah aspi essoufflé poumons crache bulle cervau"],
    advice: [
      "Typiquement > 3000 mètres : Maux de tête nausées 'Rhum de foie', 'Cervelle écrasée'. => MAM bénigne: Paracétamol, ou Diamox et REDESCENDRE DE 500 mètres. PAS DE PILLULES DU SOMMEIL !",
      "🔴 URGENCE VITALE (OAPh / OCAh) : S'il est essoufflé même allonger la NUIT , s'il crache du sang MAUSSEUX ou S'il ne sait plus marcher une ligne droite et confus/Ivre (Le Cerveau GONFLE PAR LE MANQUE D'AIR).",
      "REDESCENDEZ IMMÉDIATEMENT LES 1000 MÈTRES PAR MARCHE OU HÉLICOPTERE sans attendre + Caisson de Cercueil hyperbare + Dexaméthasone !"
    ]
  }
];

// ─────────────────────────────────────────────
//  Score diseases based on keyword matches
// ─────────────────────────────────────────────
function scoreDiseases(text: string): Array<{ disease: DiseaseRule; probability: number; matchCount: number }> {
  const lowerText = text.toLowerCase();

  const scored = DISEASE_RULES.map(disease => {
    const matchCount = disease.keywords.filter(kw => lowerText.includes(kw.toLowerCase())).length;
    // Probability: each keyword hit adds weight, capped at 95%
    const rawScore = Math.min(95, Math.round((matchCount / disease.keywords.length) * 180));
    return { disease, probability: rawScore, matchCount };
  });

  // Return only diseases with at least 1 match, sorted by probability desc
  return scored
    .filter(s => s.matchCount > 0)
    .sort((a, b) => b.probability - a.probability);
}

// ─────────────────────────────────────────────
//  Main route handler
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 1. Send text to ClinicalBERT through Hugging Face Inference API
    let hfResult = null;
    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/medicalai/ClinicalBERT",
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (response.ok) {
        hfResult = await response.json();
        console.log("ClinicalBERT Result:", JSON.stringify(hfResult));
      } else {
        const errorText = await response.text();
        console.error("HF Inference API Error:", response.status, errorText);
      }
    } catch (e) {
      console.error("HF Inference API network error:", e);
    }

    // 2. Post-processing (Rules + Regex + Medical Keywords)
    const lowerText = text.toLowerCase();

    // Symptoms extraction
    const symptomKeywords = [
      "fièvre", "fever", "toux", "cough", "douleur", "pain", "essoufflement", "shortness of breath",
      "fatigue", "maux de tête", "headache", "nausée", "nausea", "vertige", "dizziness",
      "poitrine", "chest", "gorge", "throat", "vomissement", "vomiting", "diarrhée", "diarrhea",
      "brûlure", "heartburn", "constipation", "selles", "sang", "blood", "uriner", "urination",
      "démangeaison", "itching", "éruption", "rash", "gonflement", "swelling", "palpitation",
      "stress", "anxiété", "anxiety", "insomnie", "perte goût", "perte odorat", "courbature",
      "saignement", "bleeding", "crampe", "cramp", "tremblement", "tremor", "mémoire", "memory",
      "enceinte", "pregnant", "tache", "spot", "bouton", "pimple", "morsure", "bite", "vision",
      "perte de poids", "weight loss", "jaunisse", "jaundice", "malaise", "faint", "raideur",
      "étouffement", "chocking", "frissons", "chills"
    ];
    const detectedSymptoms = symptomKeywords.filter(s => lowerText.includes(s));

    // Duration extraction
    const durationRegex = /(\d+)\s*(minute|heure|hour|jour|day|semaine|week|mois|month|an|year)s?/i;
    const durationMatch = text.match(durationRegex);
    const duration = durationMatch ? durationMatch[0] : "Non précisée";

    // Urgency Detection (Dangerous combinations)
    const hasChestPain = lowerText.includes("douleur thoracique") || lowerText.includes("chest pain") || (lowerText.includes("douleur") && lowerText.includes("poitrine"));
    const hasShortnessOfBreath = lowerText.includes("essoufflement") || lowerText.includes("shortness of breath") || lowerText.includes("respirer");
    const hasDizziness = lowerText.includes("vertige") || lowerText.includes("tournis") || lowerText.includes("dizziness");
    const hasSweating = lowerText.includes("sueur") || lowerText.includes("transpiration") || lowerText.includes("sweat");

    let isUrgent = false;
    if (hasChestPain && (hasShortnessOfBreath || hasDizziness || hasSweating)) {
      isUrgent = true;
    }

    // Severity detection
    let severity: "MILD" | "MODERATE" | "SEVERE" | "UNKNOWN" = "MILD";
    if (isUrgent || lowerText.includes("sévère") || lowerText.includes("severe") || lowerText.includes("intense") || lowerText.includes("aigu") || lowerText.includes("insupportable")) {
      severity = "SEVERE";
    } else if (lowerText.includes("modéré") || lowerText.includes("moderate") || lowerText.includes("moyen") || lowerText.includes("depuis longtemps")) {
      severity = "MODERATE";
    } else if (detectedSymptoms.length === 0) {
      severity = "UNKNOWN";
    }

    // Risk factors
    const riskKeywords = ["fumeur", "smoking", "diabète", "diabetes", "hypertension", "obésité", "obesity", "asthme", "asthma"];
    const detectedRisks = riskKeywords.filter(r => lowerText.includes(r));

    // Build dynamic dangers list
    const dangers = [];
    if (isUrgent) dangers.push("URGENCE MÉDICALE POTENTIELLE");
    if (hasShortnessOfBreath) dangers.push("Détresse respiratoire");
    if (hasChestPain) dangers.push("Douleur thoracique");
    if (hasDizziness) dangers.push("Risque de malaise / Vertiges");
    if (hasSweating) dangers.push("Signes de choc neurovégétatif");

    if (!isUrgent && severity === "SEVERE") {
      dangers.push("Vigilance accrue nécessaire");
    }

    // 3. Disease probability scoring
    const diseaseScoredList = scoreDiseases(text);
    const topDiseases = diseaseScoredList.slice(0, 4).map(s => ({
      name: s.disease.nameFr,
      icon: s.disease.icon,
      probability: s.probability,
      color: s.disease.color,
      advice: s.disease.advice
    }));

    // Collect advice from top matching disease (or use generic)
    const primaryAdvice: string[] = topDiseases.length > 0
      ? topDiseases[0].advice
      : [
        "Reposez-vous et surveillez l'évolution des symptômes.",
        "Buvez suffisamment d'eau pour rester hydraté.",
        "Prenez un médicament courant uniquement si nécessaire et selon les recommandations.",
        "Si les symptômes persistent plus de 48 heures, consultez un professionnel de santé.",
        "Consultez immédiatement si les symptômes s'aggravent."
      ];

    // Build structured response
    const analysis = {
      productName: "Analyse Médicale",
      result: isUrgent ? "UNSAFE" : (severity === "SEVERE" ? "WARNING" : "SAFE"),
      isUrgent,
      symptoms: detectedSymptoms,
      duration,
      severity,
      riskFactors: detectedRisks,
      recommendation: isUrgent
        ? "🚨 ALERTE URGENTE : Vos symptômes (douleur thoracique + essoufflement) peuvent indiquer une urgence médicale grave. Appelez les secours immédiatement."
        : severity === "SEVERE"
          ? "⚠️ Attention : Vos symptômes semblent sévères. Nous vous recommandons de consulter un médecin rapidement."
          : "Analyse terminée. Ces informations sont fournies à titre indicatif. Consultez toujours un professionnel de santé.",
      dangerousIngredients: dangers,
      diseases: topDiseases,
      advice: primaryAdvice
    };

    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Error in medical analysis:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
