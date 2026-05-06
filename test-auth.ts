import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

async function runTest() {
  console.log("🚀 Lancement du test automatique de création de compte...");

  const testUser = {
    email: "annabikhairo@gmail.com",
    password: "1234567890", // Attention: The API policy might enforce stronger passwords, let's see. If it fails, the test will reveal it!
    firstName: "Khairo",
    lastName: "Annabi",
    role: "PATIENT"
  };

  try {
    // 1. Inscription
    console.log(`📝 Tentative d'inscription pour ${testUser.email}...`);
    const registerRes = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser)
    });

    const registerData = await registerRes.json();
    console.log("➡️ Réponse de l'inscription:", registerData);

    if (registerRes.ok) {
      console.log(`✅ Utilisateur créé avec succès. Un email de vérification devrait avoir été envoyé à ${testUser.email}.`);
      console.log("Vérifiez votre boîte de réception pour l'email de confirmation !");
    } else {
      console.log("❌ L'inscription a échoué.");
      if (registerData.error && registerData.error.includes("mot de passe")) {
          console.log("ℹ️ Le mot de passe '1234567890' est probablement trop faible selon la politique en place.");
      }
    }
  } catch (err) {
    console.error("❌ Erreur de connexion au serveur local:", err);
  }
}

// Wait for the dev server to be ready
setTimeout(runTest, 2000);
