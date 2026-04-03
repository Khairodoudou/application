export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminValidatedReportsClient from "./AdminValidatedReportsClient";

export default async function AdminValidatedReportsPage() {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        redirect("/login");
    }

    const reports = await prisma.report.findMany({
        where: {
            status: "RESOLVED"
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return <AdminValidatedReportsClient reports={reports} />;
}

