import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PatientAppointmentsClient from "@/components/patient/PatientAppointmentsClient";

export default async function PatientAppointments() {
    const session = await getSession();

    if (!session || session.role !== "PATIENT") {
        redirect("/login");
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            patientId: session.userId as string,
            status: "PENDING"
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    doctorProfile: {
                        select: {
                            specialty: true
                        }
                    }
                }
            }
        },
        orderBy: { date: 'asc' }
    });

    // Transform to match client component needs
    const transformedAppointments = appointments.map(app => ({
        ...app,
        date: app.date.toISOString(),
        doctor: {
            ...app.doctor,
            doctorProfile: app.doctor.doctorProfile || { specialty: "Généraliste" }
        }
    }));

    return <PatientAppointmentsClient initialAppointments={transformedAppointments as any} />;
}
