import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getSession();

        if (!session || (session as any).role !== "PATIENT") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const patient = await prisma.user.findUnique({
            where: { id: (session as any).userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                avatar: true,
                role: true,
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
        });

        if (!patient) {
            return NextResponse.json(
                { error: "Patient non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(patient);

    } catch (error) {
        console.error("Fetch profile error:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getSession();

        if (!session || (session as any).role !== "PATIENT") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
            // Personal (User table)
            firstName,
            lastName,
            email,
            phone,
            avatar,

            // Health Profile
            gender,
            birthDate,
        } = body;

        // Update User
        const updatedUser = await prisma.user.update({
            where: { id: (session as any).userId },
            data: {
                firstName,
                lastName,
                email,
                phone,
                avatar,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                avatar: true,
                role: true,
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
        });

        // Update HealthProfile
        const updatedProfile = await prisma.healthProfile.upsert({
            where: { userId: (session as any).userId },
            create: {
                userId: (session as any).userId,
                gender,
                birthDate: birthDate ? new Date(birthDate) : null,
            },
            update: {
                gender,
                birthDate: birthDate ? new Date(birthDate) : null,
            }
        });

        return NextResponse.json({
            success: true,
            user: { ...updatedUser, healthProfile: updatedProfile }
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du profil" },
            { status: 500 }
        );
    }
}
