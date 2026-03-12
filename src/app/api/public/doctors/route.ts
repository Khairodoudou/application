import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const doctors = await prisma.user.findMany({
            where: {
                role: "DOCTOR",
                doctorProfile: {
                    subscriptionStatus: "ACTIVE"
                }
            },
            select: {
                firstName: true,
                lastName: true,
                doctorProfile: {
                    select: {
                        specialty: true,
                        clinicAddress: true,
                        googleMapsLink: true,
                        city: true,
                        latitude: true,
                        longitude: true
                    }
                }
            }
        });

        // Fallback for demo if no active doctors
        if (doctors.length === 0) {
            const allDoctors = await prisma.user.findMany({
                where: { role: "DOCTOR" },
                select: {
                    firstName: true,
                    lastName: true,
                    doctorProfile: {
                        select: {
                            specialty: true,
                            clinicAddress: true,
                            googleMapsLink: true,
                            city: true,
                            latitude: true,
                            longitude: true
                        }
                    }
                }
            });
            return NextResponse.json(allDoctors);
        }

        return NextResponse.json(doctors);
    } catch (error) {
        console.error("Public doctors API error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
