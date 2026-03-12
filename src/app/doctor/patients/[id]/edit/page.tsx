import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import PatientEditClient from "@/components/doctor/PatientEditClient";

export default async function EditPatient({ params }: { params: Promise<{ id: string }> }) {
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
        select: {
            id: true,
            status: true,
            notes: true,
            nextConsultation: true,
            consultationReason: true,
            diseases: true,
            allergies: true,
            medicalHistory: true,
            familyHistory: true,
            surgeryHistory: true,
            bloodPressure: true,
            heartRate: true,
            temperature: true,
            symptoms: true,
            diagnosis: true,
            treatmentPlan: true,
            examsRequested: true,
            observation: true,
            recommendations: true,
            documents: true,
            patient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    healthProfile: {
                        select: {
                            birthDate: true,
                            gender: true,
                            height: true,
                            weight: true,
                            bloodType: true,
                            diet: true
                        }
                    }
                }
            }
        }
    });

    if (!doctorPatient) {
        notFound();
    }

    const serializedData = JSON.parse(JSON.stringify(doctorPatient));
    return <PatientEditClient data={serializedData} />;
}
