import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagedPatientsClient from "@/components/doctor/ManagedPatientsClient";

export default async function DoctorPatients() {
    const session = await getSession();

    if (!session || session.role !== "DOCTOR") {
        redirect("/login");
    }

    const managedPatients = await prisma.doctorPatient.findMany({
        where: { doctorId: session.userId as string },
        select: {
            id: true,
            status: true,
            notes: true,
            createdAt: true,
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    avatar: true,
                    healthProfile: {
                        select: {
                            birthDate: true,
                            gender: true
                        }
                    },
                    patientAppointments: {
                        where: {
                            status: "PENDING",
                            doctorId: session.userId as string
                        },
                        orderBy: { date: 'asc' }
                    }
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return <ManagedPatientsClient initialPatients={managedPatients} />;
}
