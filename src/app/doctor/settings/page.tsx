import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DoctorSettingsClient from "@/components/doctor/DoctorSettingsClient";

export default async function DoctorSettings() {
    const session = await getSession();

    if (!session || session.role !== "DOCTOR") {
        redirect("/login");
    }

    const doctor = await prisma.user.findUnique({
        where: { id: session.userId as string },
        include: {
            doctorProfile: true,
        }
    });

    if (!doctor) {
        redirect("/login");
    }

    return <DoctorSettingsClient doctor={doctor} />;
}
