const { createClient } = require('@libsql/client');
require('dotenv').config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function cleanup() {
  const emails = [
    'kheireddine.debz@univ-annaba.dz',
    'curltest9999@yopmail.com',
    'curltest999@yopmail.com',
    'jeantest99@yopmail.com',
  ];

  for (const email of emails) {
    const r = await client.execute({
      sql: 'DELETE FROM User WHERE email = ?',
      args: [email],
    });
    if (r.rowsAffected > 0) console.log(`✅ Supprimé: ${email}`);
    else console.log(`ℹ️  Non trouvé: ${email}`);
  }
  console.log('Nettoyage terminé.');
  process.exit(0);
}

cleanup().catch(e => { console.error(e.message); process.exit(1); });
