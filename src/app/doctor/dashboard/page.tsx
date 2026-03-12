import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DoctorDashboardClient from "@/components/doctor/DoctorDashboardClient";

export default async function DoctorDashboard() {
    const session = await getSession();

    if (!session || session.role !== "DOCTOR") {
        redirect("/login");
    }

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const doctor = await prisma.user.findUnique({
        where: { id: session.userId as string },
        include: {
            doctorProfile: true,
            _count: {
                select: {
                    doctorPatients: true,
                }
            }
        }
    });

    if (!doctor) {
        redirect("/login");
    }

    // Fetch dynamic stats
    const pendingCount = await prisma.appointment.count({
        where: {
            doctorId: session.userId as string,
            status: "PENDING"
        }
    });

    const upcomingCount = await prisma.appointment.count({
        where: {
            doctorId: session.userId as string,
            status: "CONFIRMED",
            date: {
                gte: now
            }
        }
    });

    // Fetch today's appointments
    const todayAppointments = await prisma.appointment.findMany({
        where: {
            doctorId: session.userId as string,
            date: {
                gte: startOfToday,
                lte: endOfToday
            }
        },
        include: {
            patient: {
                include: {
                    healthProfile: true
                }
            }
        },
        orderBy: {
            date: 'asc'
        }
    });

    // Fetch data for charts (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const historicalAppointments = await prisma.appointment.findMany({
        where: {
            doctorId: session.userId as string,
            date: {
                gte: sevenDaysAgo
            },
            status: {
                in: ["CONFIRMED", "COMPLETED"]
            }
        },
        select: {
            date: true
        }
    });

    // Process data for the chart
    const dailyCounts: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toLocaleDateString('fr-FR', { weekday: 'short' });
        dailyCounts[key] = 0;
    }

    historicalAppointments.forEach(app => {
        const key = new Date(app.date).toLocaleDateString('fr-FR', { weekday: 'short' });
        if (dailyCounts[key] !== undefined) {
            dailyCounts[key]++;
        }
    });

    const chartData = Object.entries(dailyCounts).reverse().map(([label, value]) => ({
        label,
        value
    }));

    // Fetch appointment status distribution
    const statusStats = await prisma.appointment.groupBy({
        by: ['status'],
        where: { doctorId: session.userId as string },
        _count: { _all: true }
    });

    const statusData = {
        pending: statusStats.find(s => s.status === "PENDING")?._count._all || 0,
        confirmed: statusStats.find(s => s.status === "CONFIRMED")?._count._all || 0,
        completed: statusStats.find(s => s.status === "COMPLETED")?._count._all || 0,
        cancelled: statusStats.find(s => s.status === "CANCELLED")?._count._all || 0,
    };

    // Fetch patient demographics (Gender and Age)
    const patients = await prisma.doctorPatient.findMany({
        where: { doctorId: session.userId as string },
        include: {
            patient: {
                include: {
                    healthProfile: true
                }
            }
        }
    });

    const genderStats = {
        male: patients.filter(p => p.patient.healthProfile?.gender === 'M').length,
        female: patients.filter(p => p.patient.healthProfile?.gender === 'F').length,
    };

    const ageStats = {
        "0-18": 0,
        "19-35": 0,
        "36-50": 0,
        "51-65": 0,
        "65+": 0
    };

    patients.forEach(p => {
        const birthDate = p.patient.healthProfile?.birthDate;
        if (birthDate) {
            const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
            if (age <= 18) ageStats["0-18"]++;
            else if (age <= 35) ageStats["19-35"]++;
            else if (age <= 50) ageStats["36-50"]++;
            else if (age <= 65) ageStats["51-65"]++;
            else ageStats["65+"]++;
        }
    });

    return (
        <DoctorDashboardClient
            doctor={doctor}
            stats={{
                pendingCount,
                upcomingCount,
                patientCount: doctor._count.doctorPatients
            }}
            todayAppointments={todayAppointments}
            chartData={chartData}
            statusDistribution={statusData}
            genderDistribution={genderStats}
            ageDistribution={ageStats}
        />
    );
}
