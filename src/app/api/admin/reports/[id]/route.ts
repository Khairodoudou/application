import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        if (!session || session.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        const { status_signale } = data;

        if (!status_signale) {
            return new NextResponse("Missing status_signale", { status: 400 });
        }

        const report = await prisma.report.update({
            where: { id },
            data: { status: "RESOLVED" },
        });

        return NextResponse.json(report);
    } catch (error: any) {
        console.error("REPORT_UPDATE_ERRORSnippet", error);
        return new NextResponse(`Internal Server Error: ${error?.message || 'Unknown error'}`, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        if (!session || session.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await prisma.report.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("REPORT_DELETE_ERROR", error);
        return new NextResponse(`Internal Server Error: ${error?.message || 'Unknown error'}`, { status: 500 });
    }
}
