
import { prisma } from "@/lib/prisma";
import AdminPatientsClient from "@/components/admin/AdminPatientsClient";

export const dynamic = 'force-dynamic';

export default async function AdminPatients() {
    // Fetch patients from database
    const users = await prisma.user.findMany({
        where: {
            role: "PATIENT"
        },
        include: {
            _count: {
                select: { foodScans: true }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    // Format data for client component
    const patients = users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        scansCount: user._count.foodScans,
        joinedDate: user.createdAt.toLocaleDateString("fr-FR", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }));

    return <AdminPatientsClient patients={patients} totalPatients={patients.length} />;
}
