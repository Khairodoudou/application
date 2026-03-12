import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            accountType,
            firstName,
            lastName,
            email,
            phone,
            password,
            // Patient specific
            diseases,
            allergies,
            diet,
            // Doctor specific
            specialty,
            licenseNumber,
            clinic
        } = body;

        // 1. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Cet email est déjà utilisé" },
                { status: 400 }
            );
        }

        // 2. Hash password
        const hashedPassword = await hashPassword(password);

        // 3. Create User & Profile
        const role = accountType === "doctor" ? "DOCTOR" : "PATIENT";

        let user;

        if (role === "DOCTOR") {
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: "DOCTOR",
                    firstName,
                    lastName,
                    phone,
                    doctorProfile: {
                        create: {
                            specialty,
                            licenseNumber,
                            clinicAddress: clinic,
                            subscriptionStatus: "PENDING",
                        },
                    },
                },
            });
        } else {
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: "PATIENT",
                    firstName,
                    lastName,
                    phone,
                    healthProfile: {
                        create: {
                            diet: diet || "Aucun",
                        },
                    },
                },
            });
        }

        // 4. Create Session (Only for Patients)
        if (role === "PATIENT") {
            await createSession({ userId: user.id, role: user.role });
        }

        return NextResponse.json({
            success: true,
            userId: user.id,
            role: user.role,
            requiresApproval: role === "DOCTOR"
        });

    } catch (error: any) {
        console.error("Registration error:", error);

        if (error.code === 'P2002') {
            if (error.meta?.target?.includes('licenseNumber')) {
                return NextResponse.json(
                    { error: "Ce numéro de licence est déjà utilisé" },
                    { status: 400 }
                );
            }
            if (error.meta?.target?.includes('email')) {
                return NextResponse.json(
                    { error: "Cet email est déjà utilisé" },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: "Une erreur est survenue lors de l'inscription" },
            { status: 500 }
        );
    }
}
