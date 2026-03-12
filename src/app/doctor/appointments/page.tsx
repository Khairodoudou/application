import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppointmentsClient from "@/components/doctor/AppointmentsClient";

export default async function DoctorAppointments() {
    const session = await getSession();

    if (!session || session.role !== "DOCTOR") {
        redirect("/login");
    }

    const appointments = await prisma.appointment.findMany({
        where: { doctorId: session.userId as string },
        select: {
            id: true,
            date: true,
            status: true,
            notes: true,
            type: true,
            patientId: true,
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    email: true,
                    phone: true,
                    healthProfile: {
                        select: {
                            birthDate: true,
                            gender: true
                        }
                    }
                }
            }
        },
        orderBy: { date: 'desc' }
    });

    return <AppointmentsClient initialAppointments={appointments} />;
}
