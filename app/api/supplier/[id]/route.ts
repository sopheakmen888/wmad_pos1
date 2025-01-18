import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { SupplierModel } from "@/models/api/supplierModel";


async function getSupplierById(id: number) {
    return await prisma.supplier.findUnique({
      where: { id },
    });
  };
  async function updateSupplier(id: number, data: SupplierModel) {
    return await prisma.supplier.update({
      where: { id },
      data
    });
  };
  
  async function deleteSupplier(id: number) {
    return await prisma.supplier.delete({
      where: { id }
    });  
  };

  export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
  
    const supplier = await getSupplierById(id);
    if (!supplier) {
      return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
    }
  
    return NextResponse.json({ message: "success", data: supplier });
  }
  
  // Handle PUT request to update supplier by ID
  export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
  
    const { supplierName,
        contactName,
        contactEmail,
        contactPhone,
        addressLine1,
        addressLine2,
        province,
        websiteUrl,
        imageUrl,
        taxIdentification,
        StockIn } = await request.json();
    
    try {
      const updatedSupplier = await updateSupplier(id, {
        id,
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
      StockIn
      });
      return NextResponse.json({ message: "Supplier updated successfully", data: updatedSupplier }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error updating supplier" }, { status: 500 });
    }
  }
  
  // Handle DELETE request to delete supplier by ID
  export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
  
    try {
      await deleteSupplier(id);
      return NextResponse.json({ message: "Supplier deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting supplier" }, { status: 500 });
    }
  }

  