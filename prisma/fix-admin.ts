import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Enforcing single admin account...');

    const email = 'dahloumdouniahana@gmail.com';
    const password = 'password123';
    const hashedPassword = await hash(password, 10);

    // 1. Delete ALL other admins
    const deleteResult = await prisma.user.deleteMany({
        where: {
            role: 'ADMIN',
            email: {
                not: email
            }
        }
    });

    console.log(`Deleted ${deleteResult.count} other admin accounts.`);

    // 2. Upsert the specific admin account
    // Upsert = Update if exists, Create if not
    const admin = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword, // Reset password to be sure
            role: 'ADMIN',
            firstName: 'Admin',
            lastName: 'System'
        },
        create: {
            email,
            password: hashedPassword,
            role: 'ADMIN',
            firstName: 'Admin',
            lastName: 'System',
            // Default empty profile or handle verification if needed? 
            // Admins usually don't have doctor/health profiles in this schema
        },
    });

    console.log(`Admin account enforced: ${admin.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
