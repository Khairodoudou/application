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

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { status, followUps } = body;
        const appointmentId = id;

        // Verify appointment existence
        const existingAppointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!existingAppointment) {
            return NextResponse.json(
                { error: "Rendez-vous non trouvé" },
                { status: 404 }
            );
        }

        // Security logic
        if (session.role === "DOCTOR") {
            if (existingAppointment.doctorId !== session.userId) {
                return NextResponse.json(
                    { error: "Accès refusé : ce rendez-vous ne vous appartient pas" },
                    { status: 403 }
                );
            }

            // Doctors can only update status
            const updatedAppointment = await prisma.appointment.update({
                where: { id: appointmentId },
                data: { status }
            });

            // Specific logic: If status becomes COMPLETED
            if (status === "COMPLETED") {
                await prisma.doctorPatient.upsert({
                    where: {
                        doctorId_patientId: {
                            doctorId: existingAppointment.doctorId,
                            patientId: existingAppointment.patientId
                        }
                    },
                    create: {
                        doctorId: existingAppointment.doctorId,
                        patientId: existingAppointment.patientId,
                        status: "ACTIVE"
                    },
                    update: { status: "ACTIVE" }
                });

                // Automated Follow-up Appointment Creation
                let earliestNext: Date | null = null;
                let earliestReason: string | null = null;
                if (Array.isArray(followUps) && followUps.length > 0) {
                    for (const followup of followUps) {
                        if (!followup.date) continue;
                        const appointmentDate = new Date(followup.date);

                        // Track earliest future for the table/summary
                        if (appointmentDate > new Date()) {
                            if (!earliestNext || appointmentDate < earliestNext) {
                                earliestNext = appointmentDate;
                                earliestReason = followup.reason;
                            }
                        }

                        // Check if appointment already exists at this time to avoid duplicates
                        const existingFollowUp = await prisma.appointment.findFirst({
                            where: {
                                doctorId: existingAppointment.doctorId,
                                patientId: existingAppointment.patientId,
                                date: appointmentDate
                            }
                        });

                        if (!existingFollowUp) {
                            await prisma.appointment.create({
                                data: {
                                    doctorId: existingAppointment.doctorId,
                                    patientId: existingAppointment.patientId,
                                    date: appointmentDate,
                                    status: "PENDING",
                                    type: "CONSULTATION",
                                    notes: followup.reason || "Suivi régulier"
                                }
                            });
                        }
                    }

                    // Update the nextConsultation field in DoctorPatient for synchronization
                    if (earliestNext) {
                        await prisma.doctorPatient.update({
                            where: {
                                doctorId_patientId: {
                                    doctorId: existingAppointment.doctorId,
                                    patientId: existingAppointment.patientId
                                }
                            },
                            data: {
                                nextConsultation: earliestNext,
                                consultationReason: earliestReason || undefined
                            }
                        });
                    }
                }
            }

            return NextResponse.json(updatedAppointment);

        } else if (session.role === "PATIENT") {
            if (existingAppointment.patientId !== session.userId) {
                return NextResponse.json(
                    { error: "Accès refusé : ce rendez-vous ne vous appartient pas" },
                    { status: 403 }
                );
            }

            // Patients can only update date if PENDING
            if (existingAppointment.status !== "PENDING") {
                return NextResponse.json(
                    { error: "Vous ne pouvez plus modifier un rendez-vous déjà validé ou terminé" },
                    { status: 400 }
                );
            }

            const updatedAppointment = await prisma.appointment.update({
                where: { id: appointmentId },
                data: { date: new Date(body.date) }
            });

            return NextResponse.json(updatedAppointment);
        }

        return NextResponse.json({ error: "Rôle non reconnu" }, { status: 403 });

    } catch (error) {
        console.error("Update appointment status error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du rendez-vous" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const appointmentId = id;

        // Verify appointment existence
        const existingAppointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!existingAppointment) {
            return NextResponse.json(
                { error: "Rendez-vous non trouvé" },
                { status: 404 }
            );
        }

        // Check ownership based on role
        const isOwner = (session.role === "DOCTOR" && existingAppointment.doctorId === session.userId) ||
            (session.role === "PATIENT" && existingAppointment.patientId === session.userId);

        if (!isOwner) {
            return NextResponse.json(
                { error: "Accès refusé : ce rendez-vous ne vous appartient pas" },
                { status: 403 }
            );
        }

        await prisma.appointment.delete({
            where: { id: appointmentId }
        });

        return NextResponse.json({ success: true, message: "Rendez-vous annulé" });

    } catch (error) {
        console.error("Delete appointment error:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'annulation du rendez-vous" },
            { status: 500 }
        );
    }
}
