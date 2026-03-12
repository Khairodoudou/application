import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import MedicalRecordClient from "@/components/patient/MedicalRecordClient";

export default async function PatientMedicalRecord() {
    const session = await getSession();

    if (!session || session.role !== "PATIENT") {
        redirect("/login");
    }

    const patientId = session.userId as string;

    // Fetch all doctor associations for this patient
    const doctorPatients = await prisma.doctorPatient.findMany({
        where: { patientId },
        select: {
            id: true,
            status: true,
            doctorId: true,
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
            updatedAt: true,
            doctor: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    doctorProfile: {
                        select: {
                            specialty: true
                        }
                    }
                }
            },
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
                    },
                    patientAppointments: {
                        select: {
                            id: true,
                            date: true,
                            status: true,
                            notes: true,
                            type: true,
                            doctorId: true
                        },
                        orderBy: { date: 'desc' }
                    }
                }
            }
        },
        orderBy: { updatedAt: 'desc' }
    });

    const serializedData = JSON.parse(JSON.stringify(doctorPatients));

    return <MedicalRecordClient data={serializedData} />;
}
