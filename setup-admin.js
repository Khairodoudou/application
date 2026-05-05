const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function run() {
  // 1. Hacher le mot de passe admin
  const hashedPassword = await bcrypt.hash('1234567890', 12);

  // 2. Générer un ID unique
  const id = 'c' + crypto.randomBytes(11).toString('hex');
  const now = new Date().toISOString();

  // 3. Créer le compte admin
  console.log('👤 Création du compte administrateur...');
  await client.execute({
    sql: `INSERT INTO User (id, email, password, role, firstName, lastName, emailVerified, createdAt, updatedAt)
          VALUES (?, ?, ?, 'ADMIN', 'Admin', 'HealthAegis', 1, ?, ?)`,
    args: [id, 'dahloumdouniahana@gmail.com', hashedPassword, now, now],
  });

  console.log('✅ Compte admin créé avec succès !');
  console.log('   Email    :', 'dahloumdouniahana@gmail.com');
  console.log('   Password : 1234567890');
  console.log('   Role     : ADMIN');
  console.log('   emailVerified : true ✅');
  process.exit(0);
}

run().catch(e => {
  console.error('❌ Erreur:', e.message);
  process.exit(1);
});
