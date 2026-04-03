import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let settings = await prisma.appSetting.findUnique({
            where: { id: "global" }
        });

        if (!settings) {
            // Create default settings if they don't exist
            settings = await prisma.appSetting.create({
                data: {
                    id: "global",
                    supportEmail: "contact@smarthealth.com",
                    adminPhone: "+33 1 23 45 67 89",
                    headOffice: "123 Rue de la Santé, Paris, France",
                    facebook: "https://facebook.com/smarthealth",
                    instagram: "https://instagram.com/smarthealth",
                    linkedin: "https://linkedin.com/company/smarthealth",
                    googleMapsUrl: "https://www.google.com/maps?q=Alger,Algérie&t=&z=6&ie=UTF8&iwloc=&output=embed"
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error: any) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { supportEmail, adminPhone, headOffice, facebook, instagram, linkedin, googleMapsUrl } = body;

        const settings = await prisma.appSetting.upsert({
            where: { id: "global" },
            update: {
                supportEmail,
                adminPhone,
                headOffice,
                facebook,
                instagram,
                linkedin,
                googleMapsUrl
            },
            create: {
                id: "global",
                supportEmail: supportEmail || "contact@smarthealth.com",
                adminPhone: adminPhone || "+33 1 23 45 67 89",
                headOffice: headOffice || "123 Rue de la Santé, Paris, France",
                facebook: facebook || "",
                instagram: instagram || "",
                linkedin: linkedin || "",
                googleMapsUrl: googleMapsUrl || "https://www.google.com/maps?q=Alger,Algérie&t=&z=6&ie=UTF8&iwloc=&output=embed"
            }
        });

        return NextResponse.json({ success: true, settings });
    } catch (error: any) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
