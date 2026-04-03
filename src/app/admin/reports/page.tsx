export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminReportsClient from "./AdminReportsClient";

export default async function AdminReportsPage() {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        redirect("/login");
    }

    const reports = await prisma.report.findMany({
        where: {
            status: "PENDING"
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return <AdminReportsClient reports={reports} />;
}

