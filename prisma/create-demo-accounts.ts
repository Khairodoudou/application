import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient({
    datasources: { db: { url: 'file:./dev.db' } },
});

// ─── Random Data Pools ───────────────────────────────────────────────────────

const firstNamesMale = ['Amine', 'Karim', 'Yassine', 'Mehdi', 'Sofiane', 'Rachid', 'Hamza', 'Ibrahim', 'Khaled', 'Nabil'];
const firstNamesFemale = ['Amina', 'Fatima', 'Sara', 'Nadia', 'Lina', 'Yasmine', 'Rania', 'Hanane', 'Soumaya', 'Houda'];
const lastNames = ['Benmoussa', 'Hadj', 'Belkacem', 'Zerrouk', 'Saïdi', 'Meziane', 'Boudjema', 'Tlemcani', 'Chikh', 'Abed'];
const specialties = ['Cardiologie', 'Pédiatrie', 'Dermatologie', 'Neurologie', 'Oncologie', 'Orthopédie', 'Gynécologie', 'Radiologie', 'Psychiatrie', 'Médecine Générale'];
const cities = ['Alger', 'Oran', 'Constantine', 'Sétif', 'Annaba', 'Blida', 'Béjaïa', 'Biskra', 'Tlemcen', 'Batna'];
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const diets = ['Équilibré', 'Végétarien', 'Sans gluten', 'Sans sel', 'Diabétique'];
const genders = ['Homme', 'Femme'];
const consultationModes = ['VIDEO', 'IN_PERSON', 'BOTH'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min: number, max: number): number { return Math.round((Math.random() * (max - min) + min) * 10) / 10; }
function randDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const ADMIN_EMAIL = 'admin@smarthealth.com';
const ADMIN_PASSWORD_PLAIN = 'Admin@SmartHealth2025';

const DEMO_PASSWORD_PLAIN = 'SmartHealth@2025';

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🚀 Creating demo accounts...\n');

    const adminPasswordHash = hashSync(ADMIN_PASSWORD_PLAIN, 10);
    const demoPasswordHash = hashSync(DEMO_PASSWORD_PLAIN, 10);

    // ── 1. Upsert Admin ───────────────────────────────────────────────────────
    let admin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (!admin) {
        admin = await prisma.user.create({
            data: {
                email: ADMIN_EMAIL,
                password: adminPasswordHash,
                role: 'ADMIN',
                firstName: 'Super',
                lastName: 'Admin',
            },
        });
        console.log(`✅ Admin created: ${admin.email}`);
    } else {
        // Update password to known value
        admin = await prisma.user.update({
            where: { email: ADMIN_EMAIL },
            data: { password: adminPasswordHash, firstName: 'Super', lastName: 'Admin' },
        });
        console.log(`ℹ️  Admin already exists, password reset: ${admin.email}`);
    }

    // ── 2. Create 5 Doctors ───────────────────────────────────────────────────
    const doctors: Array<{ email: string; firstName: string; lastName: string; specialty: string; licenseNumber: string; city: string; gender: string; consultationFee: number; subscriptionStatus: string; }> = [];

    for (let i = 1; i <= 5; i++) {
        const gender = i % 2 === 0 ? 'Femme' : 'Homme';
        const firstName = gender === 'Femme' ? firstNamesFemale[i - 1] : firstNamesMale[i - 1];
        const lastName = lastNames[i - 1];
        const email = `dr.${firstName.toLowerCase()}.${lastName.toLowerCase().replace('ï', 'i').replace('ë', 'e')}@smarthealth-demo.com`;
        const specialty = specialties[i - 1];
        const licenseNumber = `DZ-MED-2025-${String(i).padStart(3, '0')}`;
        const city = cities[i - 1];
        const consultationFee = rand(1500, 5000);
        const yearExp = rand(3, 20);

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log(`⚠️  Doctor already exists, skipping: ${email}`);
            doctors.push({ email, firstName, lastName, specialty, licenseNumber, city, gender, consultationFee, subscriptionStatus: 'ACTIVE' });
            continue;
        }

        // Check if licenseNumber already taken
        const existingLicense = await prisma.doctorProfile.findUnique({ where: { licenseNumber } });
        if (existingLicense) {
            console.log(`⚠️  License ${licenseNumber} already taken, skipping doctor ${i}`);
            continue;
        }

        await prisma.user.create({
            data: {
                email,
                password: demoPasswordHash,
                role: 'DOCTOR',
                firstName,
                lastName,
                phone: `06${rand(10000000, 99999999)}`,
                avatar: `https://i.pravatar.cc/150?u=doc${i}`,
                doctorProfile: {
                    create: {
                        specialty,
                        licenseNumber,
                        clinicAddress: `${rand(1, 150)} Rue de la Santé, ${city}`,
                        city,
                        country: 'Algérie',
                        gender,
                        yearsOfExperience: yearExp,
                        consultationFee: consultationFee,
                        consultationMode: pick(consultationModes),
                        bio: `Dr. ${firstName} ${lastName} est spécialiste en ${specialty} avec ${yearExp} ans d'expérience. Disponible en consultation à ${city}.`,
                        subscriptionStatus: 'ACTIVE',
                        subscriptionStart: new Date(),
                        subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                        spokenLanguages: JSON.stringify(['Arabe', 'Français']),
                        latitude: randFloat(18.0, 37.0),
                        longitude: randFloat(-8.0, 9.0),
                    },
                },
            },
        });

        doctors.push({ email, firstName, lastName, specialty, licenseNumber, city, gender, consultationFee, subscriptionStatus: 'ACTIVE' });
        console.log(`✅ Doctor ${i} created: ${email}`);
    }

    // ── 3. Create 5 Patients ──────────────────────────────────────────────────
    const patients: Array<{ email: string; firstName: string; lastName: string; bloodType: string; birthDate: string; height: number; weight: number; gender: string; }> = [];

    for (let i = 1; i <= 5; i++) {
        const gender = i % 2 === 0 ? 'Femme' : 'Homme';
        const firstName = gender === 'Femme' ? firstNamesFemale[i + 4] : firstNamesMale[i + 4];
        const lastName = lastNames[i + 4];
        const email = `patient.${firstName.toLowerCase()}.${lastName.toLowerCase().replace('ï', 'i').replace('ë', 'e')}@demo-patient.com`;
        const bloodType = pick(bloodTypes);
        const birthDate = randDate(new Date('1970-01-01'), new Date('2005-12-31'));
        const height = rand(155, 195);
        const weight = rand(50, 100);

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log(`⚠️  Patient already exists, skipping: ${email}`);
            patients.push({ email, firstName, lastName, bloodType, birthDate: birthDate.toISOString().split('T')[0], height, weight, gender });
            continue;
        }

        await prisma.user.create({
            data: {
                email,
                password: demoPasswordHash,
                role: 'PATIENT',
                firstName,
                lastName,
                phone: `07${rand(10000000, 99999999)}`,
                avatar: `https://i.pravatar.cc/150?u=pat${i}`,
                healthProfile: {
                    create: {
                        birthDate,
                        gender,
                        height,
                        weight,
                        bloodType,
                        diet: pick(diets),
                    },
                },
            },
        });

        patients.push({ email, firstName, lastName, bloodType, birthDate: birthDate.toISOString().split('T')[0], height, weight, gender });
        console.log(`✅ Patient ${i} created: ${email}`);
    }

    // ── 4. Print Summary ──────────────────────────────────────────────────────
    console.log('\n');
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║              RAPPORT DES COMPTES CRÉÉS                      ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log('║  COMPTE ADMIN                                                ║');
    console.log(`║  Email    : ${ADMIN_EMAIL.padEnd(48)}║`);
    console.log(`║  Mot de passe : ${ADMIN_PASSWORD_PLAIN.padEnd(44)}║`);
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log('║  COMPTES MÉDECINS (mot de passe: SmartHealth@2025)           ║');
    doctors.forEach((d, idx) => {
        console.log(`║  ${(idx + 1) + '. Dr. ' + d.firstName + ' ' + d.lastName + ' — ' + d.specialty}`.padEnd(63) + '║');
        console.log(`║     Email: ${d.email.padEnd(51)}║`);
        console.log(`║     Ville: ${d.city.padEnd(51)}║`);
    });
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log('║  COMPTES PATIENTS (mot de passe: SmartHealth@2025)           ║');
    patients.forEach((p, idx) => {
        console.log(`║  ${(idx + 1) + '. ' + p.firstName + ' ' + p.lastName + ' — ' + p.bloodType + ' — ' + p.gender}`.padEnd(63) + '║');
        console.log(`║     Email: ${p.email.padEnd(51)}║`);
    });
    console.log('╚══════════════════════════════════════════════════════════════╝');

    // Return structured data for report generation
    return { admin: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD_PLAIN }, doctors, patients, demoPassword: DEMO_PASSWORD_PLAIN };
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
