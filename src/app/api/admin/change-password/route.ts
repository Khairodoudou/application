import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword, getSession } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const session = await getSession();

        if (!session || (session as any).role !== "ADMIN") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { currentPassword, newPassword, confirmPassword } = body;

        // Basic validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { error: "Tous les champs sont requis" },
                { status: 400 }
            );
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { error: "Les nouveaux mots de passe ne correspondent pas" },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "Le mot de passe doit contenir au moins 6 caractères" },
                { status: 400 }
            );
        }

        // Get user from DB
        const user = await prisma.user.findUnique({
            where: { id: (session as any).userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        // Verify current password
        const isPasswordValid = await comparePassword(currentPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Mot de passe actuel incorrect" },
                { status: 400 }
            );
        }

        // Update password
        const hashedPassword = await hashPassword(newPassword);

        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Mot de passe modifié avec succès"
        });

    } catch (error) {
        console.error("Password change error:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors du changement de mot de passe" },
            { status: 500 }
        );
    }
}
