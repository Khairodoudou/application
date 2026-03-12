import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PatientHistoryClient from "@/components/patient/PatientHistoryClient";

export default async function PatientHistory() {
    const session = await getSession();

    if (!session || session.role !== "PATIENT") {
        redirect("/login");
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            patientId: session.userId as string,
            status: "COMPLETED"
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
        orderBy: { date: 'desc' }
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

    return <PatientHistoryClient appointments={transformedAppointments as any} />;
}
