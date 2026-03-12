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

        // Fetch all users with DOCTOR role and their profiles
        const doctors = await prisma.user.findMany({
            where: {
                role: "DOCTOR",
                doctorProfile: {
                    subscriptionStatus: "ACTIVE" // Only show active doctors
                }
            },
            include: {
                doctorProfile: true
            }
        });

        // Add a fallback if no active doctors (for dev purposes, maybe show all if none active)
        if (doctors.length === 0) {
            const allDoctors = await prisma.user.findMany({
                where: { role: "DOCTOR" },
                include: { doctorProfile: true }
            });
            return NextResponse.json(allDoctors);
        }

        return NextResponse.json(doctors);

    } catch (error) {
        console.error("Fetch doctors error:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}
