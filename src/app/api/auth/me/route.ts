import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getSession();

        if (!session || !(session as any).userId) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: (session as any).userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error("Fetch user error:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}
