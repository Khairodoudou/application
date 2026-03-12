import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Ensure the user exists and is a doctor
        const user = await prisma.user.findUnique({
            where: { id },
            include: { doctorProfile: true }
        });

        if (!user || user.role !== "DOCTOR") {
            return NextResponse.json(
                { error: "Utilisateur non trouvé ou n'est pas un médecin" },
                { status: 404 }
            );
        }

        if (!user.doctorProfile) {
            return NextResponse.json(
                { error: "Profil médecin introuvable" },
                { status: 404 }
            );
        }

        // Update status to ACTIVE
        await prisma.doctorProfile.update({
            where: { userId: id },
            data: { subscriptionStatus: "ACTIVE" }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error approving doctor:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'activation du compte" },
            { status: 500 }
        );
    }
}
