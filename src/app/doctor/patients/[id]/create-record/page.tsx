import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import PatientCreateRecordClient from "@/components/doctor/PatientCreateRecordClient";

export default async function CreateRecord({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getSession();

    if (!session || session.role !== "DOCTOR") {
        redirect("/login");
    }

    const doctorPatient = await prisma.doctorPatient.findUnique({
        where: {
            doctorId_patientId: {
                doctorId: session.userId as string,
                patientId: id
            }
        },
        include: {
            patient: {
                include: {
                    patientAppointments: {
                        where: {
                            doctorId: session.userId as string,
                            status: { in: ['PENDING', 'CONFIRMED'] }
                        },
                        orderBy: { date: 'desc' }
                    }
                }
            }
        }
    });

    if (!doctorPatient) {
        notFound();
    }

    return <PatientCreateRecordClient data={doctorPatient} />;
}
