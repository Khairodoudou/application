import { PrismaClient } from '../../prisma/generated/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Professional singleton check to handle stale global instances during hot reload
const CUSTOM_CLIENT_SYMBOL = Symbol.for('prisma.custom_client')

const createPrismaClient = () => {
    const client = new PrismaClient()
        ; (client as any)[CUSTOM_CLIENT_SYMBOL] = true
    return client
}

export const prisma = (globalForPrisma.prisma && (globalForPrisma.prisma as any)[CUSTOM_CLIENT_SYMBOL])
    ? globalForPrisma.prisma
    : createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
