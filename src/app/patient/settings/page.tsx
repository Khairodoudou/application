import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PatientSettingsClient from "@/components/patient/PatientSettingsClient";

export default async function PatientSettings() {
    const session = await getSession();

    if (!session || session.role !== "PATIENT") {
        redirect("/login");
    }

    const patient = await prisma.user.findUnique({
        where: { id: session.userId as string },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            role: true,
            healthProfile: {
                select: {
                    birthDate: true,
                    gender: true,
                    height: true,
                    weight: true,
                    bloodType: true,
                    diet: true
                }
            }
        }
    });

    if (!patient) {
        redirect("/login");
    }

    return <PatientSettingsClient patient={patient} />;
}
