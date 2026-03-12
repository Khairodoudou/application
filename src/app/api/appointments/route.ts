import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const userId = (session as any).userId;
        const role = (session as any).role;

        let appointments;

        if (role === "DOCTOR") {
            appointments = await prisma.appointment.findMany({
                where: { doctorId: userId },
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
                orderBy: { date: 'asc' }
            });
        } else {
            appointments = await prisma.appointment.findMany({
                where: { patientId: userId },
                include: {
                    doctor: {
                        include: {
                            doctorProfile: true
                        }
                    }
                },
                orderBy: { date: 'asc' }
            });
        }

        return NextResponse.json(appointments);

    } catch (error) {
        console.error("Fetch appointments error:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();

        if (!session || (session as any).role !== "PATIENT") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { doctorId, date, notes } = body;

        if (!doctorId || !date) {
            return NextResponse.json(
                { error: "Le médecin et la date sont requis" },
                { status: 400 }
            );
        }

        const appointment = await prisma.appointment.create({
            data: {
                doctorId,
                patientId: (session as any).userId,
                date: new Date(date),
                notes,
                status: "PENDING"
            }
        });

        return NextResponse.json(appointment);

    } catch (error) {
        console.error("Create appointment error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la prise de rendez-vous" },
            { status: 500 }
        );
    }
}
