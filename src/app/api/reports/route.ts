import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getSession();

        if (!session || session.role !== "PATIENT") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        const { productName, barcode, message, imageUrl } = data;

        if (!productName || !message) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const report = await prisma.report.create({
            data: {
                userId: session.userId as string,
                subject: productName,
                productName,
                barcode: barcode || null,
                message,
                imageUrl: imageUrl || null,
                type: "ISSUE",
                status: "PENDING",
            },
        });

        return NextResponse.json(report);
    } catch (error: any) {
        console.error("REPORT_SUBMISSION_ERROR", error);
        return new NextResponse(`Internal Server Error: ${error?.message || 'Unknown error'}`, { status: 500 });
    }
}
