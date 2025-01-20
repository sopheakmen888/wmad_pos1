import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; 
import { SupplierModel } from "@/models/api/supplierModel";

async function getPaginatedSupplier(page: number, pageSize: number) {
  const suppliers = await prisma.supplier.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      id: "desc",
    },
  });

  const totalCount = await prisma.supplier.count();
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    records: suppliers,
    currentPage: page,
    totalPages,
    totalItems: totalCount,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid page or pageSize parameters." },
        { status: 400 }
      );
    }

    const paginatedData = await getPaginatedSupplier(page, pageSize);

    return NextResponse.json({
      success: true,
      data: paginatedData,
    });
  } catch (error) {
    console.error("Error fetching paginated suppliers:", error);

    return NextResponse.json(
      { success: false, message: "An error occurred while fetching suppliers." },
      { status: 500 }
    );
  }
}


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

    if (!supplierName || !contactName || !contactEmail || !contactPhone || !province) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
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
        addressLine2,
        province,
        websiteUrl,
        imageUrl,
        taxIdentification,
        createdAt: new Date(), 
        updatedAt: new Date(), 
      },
    });

    return NextResponse.json({
      success: true,
      message: "Supplier created successfully.",
      supplier: newSupplier,
    });
  } catch (error) {
    console.error("Error creating supplier:", error);

    return NextResponse.json(
      { success: false, message: "An error occurred while creating the supplier." },
      { status: 500 }
    );
  }
}
;
