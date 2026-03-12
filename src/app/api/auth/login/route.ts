import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, role } = body;

        // 1. Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                doctorProfile: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Identifiants incorrects" },
                { status: 401 }
            );
        }

        // 2. Verify Password
        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
            return NextResponse.json(
                { error: "Identifiants incorrects" },
                { status: 401 }
            );
        }

        // 3. Verify Role match
        // If the user selected a role in the login form, ensure their account matches
        if (role && user.role.toUpperCase() !== role.toUpperCase()) {
            return NextResponse.json(
                { error: `Vous ne pouvez pas vous connecter en tant que ${role} avec ce compte.` },
                { status: 403 }
            );
        }

        // 4. Check Doctor Status
        if (user.role === "DOCTOR") {
            if (!user.doctorProfile) {
                return NextResponse.json(
                    { error: "Profil médecin introuvable" },
                    { status: 403 }
                );
            }

            const status = user.doctorProfile.subscriptionStatus;

            if (status === "PENDING") {
                return NextResponse.json(
                    { error: "Votre compte est en attente de validation par un administrateur." },
                    { status: 403 }
                );
            }

            if (status === "SUSPENDED" || status === "CANCELLED") {
                return NextResponse.json(
                    { error: "Votre compte a été suspendu ou désactivé." },
                    { status: 403 }
                );
            }
        }

        // 5. Create Session
        const token = await createSession({ userId: user.id, role: user.role });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la connexion" },
            { status: 500 }
        );
    }
}
