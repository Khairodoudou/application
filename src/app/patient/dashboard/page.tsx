import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PatientDashboardClient from "@/components/patient/PatientDashboardClient";

export default async function PatientDashboard() {
  const session = await getSession();

  if (!session || session.role !== "PATIENT") {
    redirect("/login");
  }

  const patient = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      healthProfile: {
        select: {
          birthDate: true,
          gender: true,
          bloodType: true,
          height: true,
          weight: true
        }
      },
      patientAppointments: {
        where: {
          date: { gte: new Date() },
          status: { in: ['PENDING', 'CONFIRMED'] }
        },
        include: {
          doctor: {
            include: {
              doctorProfile: true
            }
          }
        },
        orderBy: { date: 'asc' },
        take: 5
      }
    }
  });

  if (!patient) {
    redirect("/login");
  }

  // Fetch patient dashboard statistics
  const pendingAppointmentsCount = await prisma.appointment.count({
    where: {
      patientId: patient.id,
      status: 'PENDING',
      date: { gte: new Date() }
    }
  });

  const uniqueDoctors = await prisma.appointment.groupBy({
    by: ['doctorId'],
    where: {
      patientId: patient.id,
      status: 'COMPLETED'
    }
  });
  const uniqueDoctorsCount = uniqueDoctors.length;

  // Appointment status distribution for chart
  const statusStats = await prisma.appointment.groupBy({
    by: ['status'],
    where: { patientId: patient.id },
    _count: { _all: true }
  });

  const statusDistribution = {
    pending: statusStats.find(s => s.status === 'PENDING')?._count._all || 0,
    confirmed: statusStats.find(s => s.status === 'CONFIRMED')?._count._all || 0,
    completed: statusStats.find(s => s.status === 'COMPLETED')?._count._all || 0,
    cancelled: statusStats.find(s => s.status === 'CANCELLED')?._count._all || 0,
  };

  // Appointment activity by month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const historicalAppointments = await prisma.appointment.findMany({
    where: {
      patientId: patient.id,
      date: { gte: sixMonthsAgo }
    },
    select: { date: true }
  });

  const monthlyActivity: Record<string, number> = {};
  for (let i = 0; i < 6; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthKey = d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    monthlyActivity[monthKey] = 0;
  }

  historicalAppointments.forEach(app => {
    const monthKey = new Date(app.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    if (monthlyActivity[monthKey] !== undefined) {
      monthlyActivity[monthKey]++;
    }
  });

  const chartActivity = Object.entries(monthlyActivity).reverse().map(([label, value]) => ({
    label,
    value
  }));

  // Original stats (food scans)
  const totalScans = await prisma.foodScan.count({
    where: { userId: patient.id }
  });

  const safeScans = await prisma.foodScan.count({
    where: { userId: patient.id, result: "SAFE" }
  });

  const warningScans = await prisma.foodScan.count({
    where: { userId: patient.id, result: "WARNING" }
  });

  const unsafeScans = await prisma.foodScan.count({
    where: { userId: patient.id, result: "UNSAFE" }
  });

  // Fetch recent scans
  const recentScans = await prisma.foodScan.findMany({
    where: { userId: patient.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const dashboardStats = {
    totalScans,
    safeScans,
    warningScans,
    unsafeScans,
    pendingAppointmentsCount,
    uniqueDoctorsCount,
    statusDistribution,
    chartActivity
  };

  return (
    <PatientDashboardClient
      patient={patient}
      stats={dashboardStats}
      recentScans={recentScans}
    />
  );
}
