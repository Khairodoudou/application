import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getSession();

        if (!session || (session as any).role !== "DOCTOR") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const doctor = await prisma.user.findUnique({
            where: { id: (session as any).userId },
            include: {
                doctorProfile: true
            }
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Médecin non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(doctor);

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

        if (!session || (session as any).role !== "DOCTOR") {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
            // Personal
            gender,
            avatar, // from User
            // Professional
            specialty,
            licenseNumber,
            yearsOfExperience,
            spokenLanguages, // JSON string
            // Contact
            city,
            country,
            clinicAddress,
            // App
            bio,
            consultationFee,
            consultationMode,
            availability, // JSON string
            // Social Media
            linkedin,
            whatsapp,
            telegram,
            googleMapsLink
        } = body;

        // Update User (avatar)
        const updatedUser = await prisma.user.update({
            where: { id: (session as any).userId },
            data: {
                avatar: avatar,
            },
            include: {
                doctorProfile: true
            }
        });

        // Update DoctorProfile
        const updatedProfile = await prisma.doctorProfile.upsert({
            where: { userId: (session as any).userId },
            create: {
                userId: (session as any).userId,
                specialty: specialty || "Généraliste",
                licenseNumber: licenseNumber || "PENDING-" + Date.now(),
                clinicAddress: clinicAddress || "",
                bio,
                consultationFee: consultationFee ? parseFloat(consultationFee) : null,
                gender,
                yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
                spokenLanguages: JSON.stringify(spokenLanguages || []),
                city,
                country,
                consultationMode,
                availability: JSON.stringify(availability || {}),
                linkedin,
                whatsapp,
                telegram,
                googleMapsLink,
            },
            update: {
                specialty,
                licenseNumber,
                clinicAddress,
                bio,
                consultationFee: consultationFee ? parseFloat(consultationFee) : null,
                gender,
                yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
                spokenLanguages: JSON.stringify(spokenLanguages || []),
                city,
                country,
                consultationMode,
                availability: JSON.stringify(availability || {}),
                linkedin,
                whatsapp,
                telegram,
                googleMapsLink,
            }
        });

        return NextResponse.json({
            success: true,
            user: { ...updatedUser, doctorProfile: updatedProfile }
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du profil" },
            { status: 500 }
        );
    }
}
