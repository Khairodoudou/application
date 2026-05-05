import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

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

        // 3. Générer le token de vérification
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

        // 4. Create User & Profile
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
                    emailVerified: false,
                    verificationToken,
                    verificationExpires,
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
                    emailVerified: false,
                    verificationToken,
                    verificationExpires,
                    healthProfile: {
                        create: {
                            diet: diet || "Aucun",
                        },
                    },
                },
            });
        }

        // 5. Envoyer l'email de vérification (non bloquant)
        const emailRole = role === "DOCTOR" ? "doctor" : "patient";
        try {
            await sendVerificationEmail(email, verificationToken, emailRole);
            console.log(`✅ Email de vérification envoyé à ${email}`);
        } catch (emailError: any) {
            // L'email a échoué mais le compte est créé — on log et on continue
            console.error("⚠️ Échec envoi email de vérification:", emailError.message);
        }

        // 6. Ne pas créer de session — compte non vérifié
        return NextResponse.json({
            success: true,
            requiresEmailVerification: true,
            role: user.role,
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
