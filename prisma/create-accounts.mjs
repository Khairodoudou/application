// ESM script - run with: node prisma/create-accounts.mjs
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import { hash } from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Dynamic import of the generated Prisma client
const { PrismaClient } = await import('../prisma/generated/client/index.js');
const prisma = new PrismaClient({ datasources: { db: { url: 'file:' + path.join(__dirname, 'dev.db') } } });

// ─── Data Pools ───────────────────────────────────────────────────────────────
const firstNamesMale = ['Amine', 'Karim', 'Yassine', 'Mehdi', 'Sofiane', 'Rachid', 'Hamza', 'Ibrahim', 'Khaled', 'Nabil'];
const firstNamesFemale = ['Amina', 'Fatima', 'Sara', 'Nadia', 'Lina', 'Yasmine', 'Rania', 'Hanane', 'Soumaya', 'Houda'];
const lastNames = ['Benmoussa', 'Hadj', 'Belkacem', 'Zerrouk', 'Saidi', 'Meziane', 'Boudjema', 'Tlemcani', 'Chikh', 'Abed'];
const specialties = ['Cardiologie', 'Pédiatrie', 'Dermatologie', 'Neurologie', 'Oncologie', 'Orthopédie', 'Gynécologie', 'Radiologie', 'Psychiatrie', 'Médecine Générale'];
const cities = ['Alger', 'Oran', 'Constantine', 'Sétif', 'Annaba', 'Blida', 'Béjaïa', 'Biskra', 'Tlemcen', 'Batna'];
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const diets = ['Équilibré', 'Végétarien', 'Sans gluten', 'Sans sel', 'Diabétique'];
const modes = ['VIDEO', 'IN_PERSON', 'BOTH'];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randF = (min, max) => Math.round((Math.random() * (max - min) + min) * 10) / 10;
const randDate = (s, e) => new Date(s.getTime() + Math.random() * (e.getTime() - s.getTime()));

const ADMIN_EMAIL = 'admin@smarthealth.com';
const ADMIN_PASS = 'Admin@SmartHealth2025';
const DEMO_PASS = 'SmartHealth@2025';

async function main() {
    console.log('\n🚀 Création des comptes de démonstration...\n');

    const adminHash = await hash(ADMIN_PASS, 10);
    const demoHash = await hash(DEMO_PASS, 10);

    // ── Admin ────────────────────────────────────────────────────────────────
    let admin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (!admin) {
        admin = await prisma.user.create({ data: { email: ADMIN_EMAIL, password: adminHash, role: 'ADMIN', firstName: 'Super', lastName: 'Admin' } });
        console.log('✅ Admin créé :', ADMIN_EMAIL);
    } else {
        await prisma.user.update({ where: { email: ADMIN_EMAIL }, data: { password: adminHash, firstName: 'Super', lastName: 'Admin' } });
        console.log('ℹ️  Admin existant — mot de passe réinitialisé');
    }

    // ── Doctors ──────────────────────────────────────────────────────────────
    const doctorReport = [];

    for (let i = 0; i < 5; i++) {
        const gender = i % 2 === 0 ? 'Homme' : 'Femme';
        const firstName = gender === 'Homme' ? firstNamesMale[i] : firstNamesFemale[i];
        const lastName = lastNames[i];
        const safeFirst = firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const safeLast = lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const email = `dr.${safeFirst}.${safeLast}@smarthealth-demo.com`;
        const specialty = specialties[i];
        const license = `DZ-MED-2025-${String(i + 1).padStart(3, '0')}`;
        const city = cities[i];
        const fee = rand(1500, 5000);
        const exp = rand(3, 20);

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log(`⚠️  Médecin déjà existant: ${email}`);
            const dp = await prisma.doctorProfile.findUnique({ where: { userId: existing.id } });
            doctorReport.push({ n: i + 1, firstName, lastName, specialty, email, city, license, fee, exp, gender });
            continue;
        }

        // Check license uniqueness
        const existLic = await prisma.doctorProfile.findUnique({ where: { licenseNumber: license } });
        if (existLic) {
            console.log(`⚠️  Numéro de licence déjà pris: ${license}`);
            continue;
        }

        await prisma.user.create({
            data: {
                email, password: demoHash, role: 'DOCTOR', firstName, lastName,
                phone: `0${rand(5, 7)}${rand(10000000, 99999999)}`,
                avatar: `https://i.pravatar.cc/150?u=doc${i + 1}demo`,
                doctorProfile: {
                    create: {
                        specialty, licenseNumber: license,
                        clinicAddress: `${rand(1, 200)} Rue de la Santé, ${city}`,
                        city, country: 'Algérie', gender,
                        yearsOfExperience: exp,
                        consultationFee: fee,
                        consultationMode: pick(modes),
                        bio: `Dr. ${firstName} ${lastName} est spécialiste en ${specialty} avec ${exp} ans d'expérience à ${city}.`,
                        subscriptionStatus: 'ACTIVE',
                        subscriptionStart: new Date(),
                        subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                        spokenLanguages: JSON.stringify(['Arabe', 'Français']),
                        latitude: randF(18.0, 37.0),
                        longitude: randF(-8.0, 9.0),
                    },
                },
            },
        });

        doctorReport.push({ n: i + 1, firstName, lastName, specialty, email, city, license, fee, exp, gender });
        console.log(`✅ Médecin ${i + 1} créé : ${email}`);
    }

    // ── Patients ──────────────────────────────────────────────────────────────
    const patientReport = [];

    for (let i = 0; i < 5; i++) {
        const gender = i % 2 === 0 ? 'Homme' : 'Femme';
        const firstName = gender === 'Homme' ? firstNamesMale[i + 5] : firstNamesFemale[i + 5];
        const lastName = lastNames[i + 5];
        const safeFirst = firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const safeLast = lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const email = `patient.${safeFirst}.${safeLast}@demo-patient.com`;
        const blood = pick(bloodTypes);
        const diet = pick(diets);
        const birth = randDate(new Date('1970-01-01'), new Date('2005-12-31'));
        const height = rand(155, 195);
        const weight = rand(50, 100);

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log(`⚠️  Patient déjà existant: ${email}`);
            patientReport.push({ n: i + 1, firstName, lastName, email, blood, birth: birth.toISOString().slice(0, 10), height, weight, gender, diet });
            continue;
        }

        await prisma.user.create({
            data: {
                email, password: demoHash, role: 'PATIENT', firstName, lastName,
                phone: `07${rand(10000000, 99999999)}`,
                avatar: `https://i.pravatar.cc/150?u=pat${i + 1}demo`,
                healthProfile: {
                    create: { birthDate: birth, gender, height, weight, bloodType: blood, diet },
                },
            },
        });

        patientReport.push({ n: i + 1, firstName, lastName, email, blood, birth: birth.toISOString().slice(0, 10), height, weight, gender, diet });
        console.log(`✅ Patient ${i + 1} créé : ${email}`);
    }

    // ── Console Report ────────────────────────────────────────────────────────
    const line = '═'.repeat(66);
    console.log(`\n╔${line}╗`);
    console.log('║' + '        📋  RAPPORT DES COMPTES DE DÉMONSTRATION         '.padEnd(66) + '║');
    console.log(`╠${line}╣`);
    console.log('║' + '  🔐  COMPTE ADMINISTRATEUR'.padEnd(66) + '║');
    console.log(`║  Email        : ${ADMIN_EMAIL.padEnd(50)}║`);
    console.log(`║  Mot de passe : ${ADMIN_PASS.padEnd(50)}║`);
    console.log(`║  Rôle         : ${'ADMIN'.padEnd(50)}║`);
    console.log(`╠${line}╣`);
    console.log('║' + `  👨‍⚕️  COMPTES MÉDECINS  (mot de passe : ${DEMO_PASS})`.padEnd(66) + '║');
    console.log(`╠${line}╣`);
    for (const d of doctorReport) {
        console.log(`║  Dr. ${d.firstName} ${d.lastName} (${d.specialty})`.padEnd(67) + '║');
        console.log(`║    Email     : ${d.email.padEnd(51)}║`);
        console.log(`║    Genre     : ${d.gender}   |  Ville : ${d.city}`.padEnd(67) + '║');
        console.log(`║    Licence   : ${d.license}   |  Tarifconsult : ${d.fee} DA`.padEnd(67) + '║');
        console.log(`║    Expérience: ${d.exp} ans`.padEnd(67) + '║');
        if (d.n < doctorReport.length) console.log(`║${'─'.repeat(66)}║`);
    }
    console.log(`╠${line}╣`);
    console.log('║' + `  🧑‍🤝‍🧑  COMPTES PATIENTS  (mot de passe : ${DEMO_PASS})`.padEnd(66) + '║');
    console.log(`╠${line}╣`);
    for (const p of patientReport) {
        console.log(`║  ${p.firstName} ${p.lastName}`.padEnd(67) + '║');
        console.log(`║    Email      : ${p.email.padEnd(50)}║`);
        console.log(`║    Genre      : ${p.gender}   |  Groupe sanguin : ${p.blood}`.padEnd(67) + '║');
        console.log(`║    Né(e) le   : ${p.birth}   |  Taille: ${p.height}cm  |  Poids: ${p.weight}kg`.padEnd(67) + '║');
        console.log(`║    Régime     : ${p.diet.padEnd(50)}║`);
        if (p.n < patientReport.length) console.log(`║${'─'.repeat(66)}║`);
    }
    console.log(`╚${line}╝\n`);

    return { admin: { email: ADMIN_EMAIL, password: ADMIN_PASS }, doctors: doctorReport, patients: patientReport, demoPassword: DEMO_PASS };
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
