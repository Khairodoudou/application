const { createClient } = require('@libsql/client');
require('dotenv').config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function migrate() {
  console.log('🔄 Ajout colonne vitalsHistory à DoctorPatient...');
  try {
    await client.execute(`ALTER TABLE "DoctorPatient" ADD COLUMN "vitalsHistory" TEXT`);
    console.log('✅ vitalsHistory ajouté');
  } catch (e) {
    if (e.message?.includes('duplicate column')) {
      console.log('⚠️  vitalsHistory existe déjà — ignoré');
    } else throw e;
  }
  console.log('✅ Migration terminée');
  process.exit(0);
}

migrate().catch(e => { console.error('❌', e.message); process.exit(1); });
