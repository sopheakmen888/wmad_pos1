import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// PUT request handler to update a supplier
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    
    const body = await request.json();
    const { supplierName, contactName, contactEmail, contactPhone, updatedBy } = body;

    // Validate
    if (!supplierName || !contactName || !contactEmail || !contactPhone || !updatedBy) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingSupplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: {
        supplierName,
        contactName,
        contactEmail,
        contactPhone,
       
      },
    });

    return NextResponse.json({
      message: "Supplier updated successfully",
      updatedSupplier,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update supplier" },
      { status: 500 }
    );
  }
}

// DELETE request handler to delete a supplier
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;

    const existingSupplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }

    await prisma.supplier.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { message: "Failed to delete supplier" },
      { status: 500 }
    );
  }
}

// GET request handler to fetch a supplier by ID
export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params;

    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!supplier) {
      return NextResponse.json(
        { success: false, message: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supplier retrieved successfully",
      supplier,
    });
  } catch (error) {
    console.error("Error retrieving supplier:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve supplier" },
      { status: 500 }
    );
  }
}
