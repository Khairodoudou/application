import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PatientReportsClient from "./PatientReportsClient";

export default async function PatientReportsPage() {
    const session = await getSession();

    if (!session || session.role !== "PATIENT") {
        redirect("/login");
    }

    const patient = await prisma.user.findUnique({
        where: { id: session.userId as string },
    });

    if (!patient) {
        redirect("/login");
    }

    return <PatientReportsClient patient={patient} />;
}
