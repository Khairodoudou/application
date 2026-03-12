import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        if (!session || (session as any).role !== "DOCTOR") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const doctorId = (session as any).userId;
        const patientId = id;

        // Verify doctor-patient relationship
        const relationship = await prisma.doctorPatient.findUnique({
            where: {
                doctorId_patientId: { doctorId, patientId }
            }
        });

        if (!relationship) {
            return NextResponse.json(
                { error: "Accès refusé : ce patient n'est pas dans votre liste" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const {
            // Existing fields
            notes,
            diseases,
            allergies,
            diet,
            height,
            weight,
            bloodType,

            // New History Fields
            medicalHistory,
            familyHistory,
            surgeryHistory,

            // New Vitals
            bloodPressure,
            heartRate,
            temperature,

            // New Diagnosis
            symptoms,
            diagnosis,

            // New Treatment
            treatmentPlan,
            examsRequested,

            // New Doctor Notes & Consultation
            observation,
            recommendations,
            documents,
            followUps // Array of { date: string, reason: string }
        } = body;

        // 1. Update Patient HealthProfile (Shared physical/immutable data)
        await prisma.healthProfile.update({
            where: { userId: patientId },
            data: {
                diet,
                height: height ? parseFloat(height) : undefined,
                weight: weight ? parseFloat(weight) : undefined,
                bloodType,
            }
        });

        // 2. Handle Multiple Appointments
        let earliestNext: Date | null = null;
        let earliestReason: string | null = null;
        const toJson = (val: any) => Array.isArray(val) ? JSON.stringify(val) : val;

        if (Array.isArray(followUps) && followUps.length > 0) {
            for (const followup of followUps) {
                if (!followup.date) continue;
                const appointmentDate = new Date(followup.date);

                if (appointmentDate > new Date()) {
                    if (!earliestNext || appointmentDate < earliestNext) {
                        earliestNext = appointmentDate;
                        earliestReason = followup.reason;
                    }
                }

                const existingAppointment = await prisma.appointment.findFirst({
                    where: {
                        doctorId,
                        patientId,
                        date: appointmentDate
                    }
                });

                if (!existingAppointment) {
                    await prisma.appointment.create({
                        data: {
                            doctorId,
                            patientId,
                            date: appointmentDate,
                            status: "PENDING",
                            type: "CONSULTATION",
                            notes: followup.reason || "Suivi régulier"
                        }
                    });
                }
            }
        }

        // 3. Update DoctorPatient (Private Medical Record + earliest next consultation)
        await prisma.doctorPatient.update({
            where: {
                doctorId_patientId: { doctorId, patientId }
            },
            data: {
                notes,
                nextConsultation: earliestNext || undefined,
                consultationReason: earliestReason || undefined,

                // Isolated Clinical Data
                diseases: diseases ? toJson(diseases) : undefined,
                allergies: allergies ? toJson(allergies) : undefined,
                medicalHistory: medicalHistory ? toJson(medicalHistory) : undefined,
                familyHistory: familyHistory ? toJson(familyHistory) : undefined,
                surgeryHistory: surgeryHistory ? toJson(surgeryHistory) : undefined,
                bloodPressure,
                heartRate: heartRate ? parseInt(heartRate) : undefined,
                temperature: temperature ? parseFloat(temperature) : undefined,
                symptoms: symptoms ? toJson(symptoms) : undefined,
                diagnosis,
                treatmentPlan: treatmentPlan ? toJson(treatmentPlan) : undefined,
                examsRequested: examsRequested ? toJson(examsRequested) : undefined,
                observation,
                recommendations,
                documents: documents ? toJson(documents) : undefined,
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Update patient record error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du dossier" },
            { status: 500 }
        );
    }
}
