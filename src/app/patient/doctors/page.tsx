import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DoctorsListClient from "@/components/patient/DoctorsListClient";

export default async function DoctorsList() {
    const session = await getSession();

    if (!session || session.role !== "PATIENT") {
        redirect("/login");
    }

    // Fetch patient data for the booking form
    const patient = await prisma.user.findUnique({
        where: { id: session.userId as string },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            healthProfile: {
                select: {
                    birthDate: true,
                    gender: true
                }
            }
        }
    });

    if (!patient) {
        redirect("/login");
    }

    // Fetch doctors
    const doctors = await prisma.user.findMany({
        where: {
            role: "DOCTOR",
            doctorProfile: {
                subscriptionStatus: {
                    in: ["ACTIVE", "PENDING"] // Show pending too for dev/demo if needed, or strictly ACTIVE
                }
            }
        },
        include: {
            doctorProfile: true
        }
    });

    return <DoctorsListClient patient={patient} doctors={doctors} />;
}
