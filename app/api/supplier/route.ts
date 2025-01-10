import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


// POST Supplier
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      supplierName,
      contactName,
      contactEmail,
      contactPhone,
      addressLine1,
      addressLine2,
      province,
      websiteUrl,
      imageUrl,
      taxIdentification,
    } = body;

    if (
      !supplierName ||
      !contactName ||
      !contactEmail ||
      !contactPhone ||
      !addressLine1 ||
      !province ||
      !taxIdentification
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newSupplier = await prisma.supplier.create({
      data: {
        supplierName,
        contactName,
        contactEmail,
        contactPhone,
        addressLine1,
        addressLine2: addressLine2 || null,
        province,
        websiteUrl: websiteUrl || null,
        imageUrl: imageUrl || null,
        taxIdentification,
      },
    });

    return NextResponse.json({ message: "Supplier created successfully", data: newSupplier }, { status: 201 });
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}


// Get All Supplier
export async function GET() {
    try {
      const suppliers = await prisma.supplier.findMany({
        orderBy: { createdAt: "desc" },
      });
  
      return NextResponse.json({ message: "Success", data: suppliers }, { status: 200 });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
  }


// DELETE Supplier
export async function DELETE(request: NextRequest) {
    try {
      const url = new URL(request.url); 
      const id = url.searchParams.get('id'); 
  
      if (!id) {
        return NextResponse.json({ message: "Supplier ID is required" }, { status: 400 });
      }
  
      const deletedSupplier = await prisma.supplier.delete({
        where: { id: Number(id) },
      });
  
      return NextResponse.json({ message: "Supplier deleted successfully", data: deletedSupplier }, { status: 200 });
    } catch (error) {
      console.error("Error deleting supplier:", error);
      return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
  }