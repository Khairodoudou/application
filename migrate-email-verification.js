// Script de migration : ajoute les champs de vérification d'email au modèle User
const { createClient } = require('@libsql/client')
require('dotenv').config()

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function migrate() {
  console.log('🔄 Migration : ajout des champs emailVerified...')

  try {
    // Ajouter emailVerified (INTEGER = boolean en SQLite, défaut 0)
    await client.execute(
      `ALTER TABLE "User" ADD COLUMN "emailVerified" INTEGER NOT NULL DEFAULT 0`
    )
    console.log('✅ emailVerified ajouté')
  } catch (e) {
    if (e.message?.includes('duplicate column')) {
      console.log('⚠️  emailVerified existe déjà — ignoré')
    } else throw e
  }

  try {
    // Ajouter verificationToken
    await client.execute(
      `ALTER TABLE "User" ADD COLUMN "verificationToken" TEXT`
    )
    console.log('✅ verificationToken ajouté')
  } catch (e) {
    if (e.message?.includes('duplicate column')) {
      console.log('⚠️  verificationToken existe déjà — ignoré')
    } else throw e
  }

  try {
    // Ajouter verificationExpires
    await client.execute(
      `ALTER TABLE "User" ADD COLUMN "verificationExpires" DATETIME`
    )
    console.log('✅ verificationExpires ajouté')
  } catch (e) {
    if (e.message?.includes('duplicate column')) {
      console.log('⚠️  verificationExpires existe déjà — ignoré')
    } else throw e
  }

  console.log('\n✅ Migration terminée avec succès !')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('❌ Erreur de migration :', err)
  process.exit(1)
})
