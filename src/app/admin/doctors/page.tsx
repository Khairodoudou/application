export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma";
import AdminDoctorsClient from "@/components/admin/AdminDoctorsClient";

export default async function AdminDoctorsPage() {
    // Fetch all doctors from the database
    const doctorsData = await prisma.user.findMany({
        where: {
            role: "DOCTOR"
        },
        include: {
            doctorProfile: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Transform data to match AdminDoctorsClient props
    const doctors = doctorsData.map(doc => ({
        id: doc.id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        specialty: doc.doctorProfile?.specialty || "Non spécifié",
        clinic: (doc.doctorProfile as any)?.clinicAddress || "Non spécifié",
        status: doc.doctorProfile?.subscriptionStatus || "PENDING",
        joinedDate: doc.createdAt.toLocaleDateString('fr-FR')
    }));

    const activeDoctors = doctorsData.filter(doc => doc.doctorProfile?.subscriptionStatus === "ACTIVE").length;
    const suspendedDoctors = doctorsData.filter(doc => doc.doctorProfile?.subscriptionStatus === "SUSPENDED").length;

    return (
        <AdminDoctorsClient
            doctors={doctors}
            totalDoctors={doctors.length}
            activeDoctors={activeDoctors}
            suspendedDoctors={suspendedDoctors}
        />
    );
}

