import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session || !["DOCTOR", "PATIENT"].includes((session as any).role)) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
        }

        // Validate file type
        if (file.type !== "application/pdf") {
            return NextResponse.json({ error: "Seuls les fichiers PDF sont acceptés" }, { status: 400 });
        }

        // Validate file size (max 10 MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
        }

        // Create unique filename to prevent collisions
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const uniqueFilename = `${timestamp}_${safeName}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", "documents");
        await mkdir(uploadDir, { recursive: true });

        // Write file to disk
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, uniqueFilename);
        await writeFile(filePath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/documents/${uniqueFilename}`;

        return NextResponse.json({ url: publicUrl, name: file.name });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'envoi du fichier" },
            { status: 500 }
        );
    }
}
