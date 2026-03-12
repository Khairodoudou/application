import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Ensure the user exists and is a patient (security check)
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        if (user.role !== "PATIENT") {
            return NextResponse.json(
                { error: "Action non autorisée sur ce type d'utilisateur" },
                { status: 403 }
            );
        }

        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting patient:", error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression du patient" },
            { status: 500 }
        );
    }
}
