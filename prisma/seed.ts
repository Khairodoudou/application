
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs'; // You might need to install bcryptjs if not present, or mock it

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Clean up existing data
    await prisma.notification.deleteMany();
    await prisma.report.deleteMany();
    await prisma.foodScan.deleteMany();
    await prisma.message.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.doctorPatient.deleteMany();
    await prisma.healthProfile.deleteMany();
    await prisma.doctorProfile.deleteMany();
    await prisma.user.deleteMany();

    // 1. Create Admin
    const admin = await prisma.user.create({
        data: {
            email: 'admin@smarthealth.com',
            password: 'password123', // In a real app, hash this!
            role: 'ADMIN',
            firstName: 'Admin',
            lastName: 'System',
        },
    });
    console.log(`Created admin user: ${admin.email}`);

    // 2. Create Doctors
    const doctor1 = await prisma.user.create({
        data: {
            email: 'dr.house@smarthealth.com',
            password: 'password123',
            role: 'DOCTOR',
            firstName: 'Gregory',
            lastName: 'House',
            avatar: 'https://i.pravatar.cc/150?u=drhouse',
            doctorProfile: {
                create: {
                    specialty: 'Diagnosticien',
                    licenseNumber: 'RPPS-001',
                    clinicAddress: 'Hôpital Princeton-Plainsboro',
                    bio: 'Spécialiste en maladies infectieuses et néphrologie.',
                    consultationFee: 150.0,
                    subscriptionStatus: 'ACTIVE',
                    subscriptionStart: new Date(),
                    subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    latitude: 36.7372, // Alger
                    longitude: 3.0588,
                },
            },
        },
    });

    const doctor2 = await prisma.user.create({
        data: {
            email: 'dr.wilson@smarthealth.com',
            password: 'password123',
            role: 'DOCTOR',
            firstName: 'James',
            lastName: 'Wilson',
            avatar: 'https://i.pravatar.cc/150?u=drwilson',
            doctorProfile: {
                create: {
                    specialty: 'Oncologie',
                    licenseNumber: 'RPPS-002',
                    clinicAddress: 'Hôpital Princeton-Plainsboro',
                    bio: 'Chef du département d\'oncologie.',
                    consultationFee: 120.0,
                    subscriptionStatus: 'ACTIVE',
                    latitude: 35.6987, // Oran
                    longitude: -0.6359,
                },
            },
        },
    });

    const doctor3 = await prisma.user.create({
        data: {
            email: 'dr.amrani@smarthealth.com',
            password: 'password123',
            role: 'DOCTOR',
            firstName: 'Amine',
            lastName: 'Amrani',
            avatar: 'https://i.pravatar.cc/150?u=dramrani',
            doctorProfile: {
                create: {
                    specialty: 'Cardiologie',
                    licenseNumber: 'RPPS-003',
                    clinicAddress: 'Boulevard de l\'ALN, Constantine',
                    city: 'Constantine',
                    bio: 'Spécialiste en cardiologie interventionnelle.',
                    consultationFee: 80.0,
                    subscriptionStatus: 'ACTIVE',
                    latitude: 36.365, // Constantine
                    longitude: 6.6147,
                },
            },
        },
    });

    // 3. Create Patients
    const patient1 = await prisma.user.create({
        data: {
            email: 'jean.dupont@email.com',
            password: 'password123',
            role: 'PATIENT',
            firstName: 'Jean',
            lastName: 'Dupont',
            phone: '0612345678',
            avatar: 'https://i.pravatar.cc/150?u=jean',
            healthProfile: {
                create: {
                    birthDate: new Date('1985-04-12'),
                    height: 175,
                    weight: 78,
                    bloodType: 'A+',
                    diseases: JSON.stringify(['Hypertension']),
                    allergies: JSON.stringify(['Pénicilline']),
                    diet: 'Sans sel',
                },
            },
        },
    });

    const patient2 = await prisma.user.create({
        data: {
            email: 'marie.curie@email.com',
            password: 'password123',
            role: 'PATIENT',
            firstName: 'Marie',
            lastName: 'Curie',
            healthProfile: {
                create: {
                    birthDate: new Date('1990-11-07'),
                    height: 165,
                    weight: 55,
                    bloodType: 'O-',
                    allergies: JSON.stringify(['Polonium']),
                    diet: 'Equilibré',
                },
            },
        },
    });

    // 4. Create Relationships (Doctor-Patient)
    await prisma.doctorPatient.create({
        data: {
            doctorId: doctor1.id,
            patientId: patient1.id,
            notes: 'Patient difficile, ne suit pas toujours les traitements.',
        },
    });

    await prisma.doctorPatient.create({
        data: {
            doctorId: doctor2.id,
            patientId: patient2.id,
        },
    });

    // 5. Create Appointments
    await prisma.appointment.create({
        data: {
            doctorId: doctor1.id,
            patientId: patient1.id,
            date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
            type: 'CONSULTATION',
            status: 'CONFIRMED',
            notes: 'Suivi hypertension',
        },
    });

    await prisma.appointment.create({
        data: {
            doctorId: doctor2.id,
            patientId: patient2.id,
            date: new Date(new Date().setDate(new Date().getDate() + 3)), // In 3 days
            type: 'CHECKUP',
            status: 'PENDING',
        },
    });

    // 6. Create Food Scans
    await prisma.foodScan.create({
        data: {
            userId: patient1.id,
            productName: 'Nutella',
            barcode: '3017620422003',
            brand: 'Ferrero',
            ingredients: JSON.stringify(['Sucre', 'Huile de palme', 'Noisettes', 'Cacao']),
            result: 'WARNING',
            dangerousIngredients: JSON.stringify(['Sucre', 'Huile de palme']),
            recommendation: 'Attention, très riche en sucre et graisses saturées. A consommer avec modération vue votre hypertension.',
            nutriscore: 'E',
        },
    });

    await prisma.foodScan.create({
        data: {
            userId: patient1.id,
            productName: 'Pommes Bio',
            barcode: '321321321',
            brand: 'BioVillage',
            ingredients: JSON.stringify(['Pommes']),
            result: 'SAFE',
            recommendation: 'Excellent choix ! Aucun additif, riche en fibres.',
            nutriscore: 'A',
        },
    });

    // 7. Create Messages
    await prisma.message.create({
        data: {
            senderId: doctor1.id,
            receiverId: patient1.id,
            content: 'Bonjour Jean, n\'oubliez pas de prendre votre traitement ce matin.',
        },
    });

    await prisma.message.create({
        data: {
            senderId: patient1.id,
            receiverId: doctor1.id,
            content: 'Oui docteur, c\'est fait. Merci du rappel.',
        },
    });

    console.log('Seeding existing data finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
