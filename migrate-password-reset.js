/**
 * migrate-password-reset.js
 * Adds passwordResetToken and passwordResetExpires columns to the User table on Turso.
 * Run once: node migrate-password-reset.js
 */
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function run() {
  console.log('🔗 Connecting to Turso...');

  // Add passwordResetToken column (ignore if already exists)
  try {
    await client.execute(
      'ALTER TABLE "User" ADD COLUMN "passwordResetToken" TEXT;'
    );
    console.log('✅ Added passwordResetToken column');
  } catch (e) {
    if (e.message && e.message.includes('duplicate column')) {
      console.log('ℹ️  passwordResetToken column already exists, skipping.');
    } else {
      throw e;
    }
  }

  // Add passwordResetExpires column
  try {
    await client.execute(
      'ALTER TABLE "User" ADD COLUMN "passwordResetExpires" DATETIME;'
    );
    console.log('✅ Added passwordResetExpires column');
  } catch (e) {
    if (e.message && e.message.includes('duplicate column')) {
      console.log('ℹ️  passwordResetExpires column already exists, skipping.');
    } else {
      throw e;
    }
  }

  console.log('🎉 Migration complete!');
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
