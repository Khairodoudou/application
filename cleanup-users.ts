import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})
const prisma = new PrismaClient({ adapter } as any)

async function run() {
  console.log('🔗 Connexion à la base de données...')
  
  // Supprimer tous les utilisateurs sauf les ADMIN
  const result = await prisma.user.deleteMany({
    where: {
      role: {
        not: 'ADMIN'
      }
    }
  })
  
  console.log(`✅ Nettoyage terminé : ${result.count} médecins et patients supprimés.`)
}

run().catch(e => {
  console.error('❌ Erreur:', e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
