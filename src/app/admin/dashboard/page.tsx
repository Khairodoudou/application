export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
    // 1. Fetch Stats
    const totalUsers = await prisma.user.count();

    const activeDoctors = await prisma.user.count({
        where: {
            role: "DOCTOR",
            doctorProfile: {
                subscriptionStatus: "ACTIVE"
            }
        }
    });

    const totalPatients = await prisma.user.count({
        where: { role: "PATIENT" }
    });

    const totalScans = await prisma.foodScan.count();
    const acceptedReports = await prisma.report.count({
        where: { status: "RESOLVED" }
    });

    const stats = {
        totalUsers,
        activeDoctors,
        totalPatients,
        totalScans,
        acceptedReports
    };

    // 2. Fetch Pending Doctors
    const pendingDoctorsData = await prisma.user.findMany({
        where: {
            role: "DOCTOR",
            doctorProfile: {
                subscriptionStatus: "PENDING"
            }
        },
        include: {
            doctorProfile: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Transform data to match AdminDashboardClient props
    const pendingDoctors = pendingDoctorsData.map(doc => ({
        id: doc.id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        specialty: doc.doctorProfile?.specialty || "Non spécifié",
        licenseNumber: doc.doctorProfile?.licenseNumber || "Na",
        clinic: (doc.doctorProfile as any)?.clinicAddress || "Non spécifié",
        joinedDate: doc.createdAt.toLocaleDateString('fr-FR')
    }));

    return (
        <AdminDashboardClient
            stats={stats}
            pendingDoctors={pendingDoctors}
        />
    );
}
