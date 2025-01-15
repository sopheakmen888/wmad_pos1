import prisma from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const body = await request.json();
        const { supplierId, referenceNumber, stockInDate } = body;

        if (!supplierId || !referenceNumber || !stockInDate) {
            return NextResponse.json(
                { message: "All fields (supplierId, referenceNumber, stockInDate) are required" },
                { status: 400 }
            );
        }

        const updateStockIn = await prisma.stockIn.update({
            where: { id: parseInt(id) },
            data: { supplierId, referenceNumber, stockInDate },
        });

        return NextResponse.json({ message: "Stock updated successfully", data: updateStockIn });
    } catch (error) {
        console.error("Error updating stock:", error);
        return NextResponse.json({ message: "Error updating stock" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return NextResponse.json(
                { message: "Invalid stock ID" },
                { status: 400 }
            );
        }

        // Delete related stockInDetails
        await prisma.stockInDetail.deleteMany({
            where: { stockInId: parsedId },
        });

        // Delete the stockIn record
        const deletedStockIn = await prisma.stockIn.delete({
            where: { id: parsedId },
        });

        return NextResponse.json({ message: "Stock deleted successfully", data: deletedStockIn });
    } catch (error) {
        console.error("Error deleting stock:", error);
        return NextResponse.json({ message: "Error deleting stock" }, { status: 500 });
    }
}


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return NextResponse.json(
                { message: "Invalid stock ID" },
                { status: 400 }
            );
        }

        const stockIn = await prisma.stockIn.findUnique({
            where: { id: parsedId },
            include: {
                stockInDetails: true, // Include related stockInDetails
            },
        });

        if (!stockIn) {
            return NextResponse.json(
                { message: "Stock not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Stock retrieved successfully", data: stockIn });
    } catch (error) {
        console.error("Error retrieving stock:", error);
        return NextResponse.json({ message: "Error retrieving stock" }, { status: 500 });
    }
}
