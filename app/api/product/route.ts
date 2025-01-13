import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nameEn, nameKh, categoryId, sku, createdBy, updatedBy } = body;

    // validate form data from client
    // logic to save to database

    if (!nameEn || !nameKh || !categoryId || !sku || !createdBy || !updatedBy) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const category = await prisma.productCategory.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 400 }
      );
    }

    const lastProduct = await prisma.product.findFirst({
      orderBy: { productCode: "desc" },
    });

    let newProductCode = "P0001"; // Default product code if no products exist

    if (lastProduct) {
      // Extract the number part from the last product code (e.g., 'p0009' -> 9)
      const lastProductCodeNumber = parseInt(
        lastProduct.productCode.replace("P", "")
      );
      const nextProductCodeNumber = lastProductCodeNumber + 1;

      newProductCode = `P${nextProductCodeNumber.toString().padStart(4, "0")}`;
    }

    const NewProduct = await prisma.product.create({
      data: {
        productCode: newProductCode,
        nameEn,
        nameKh,
        categoryId: categoryId,
        sku,
        createdBy,
        updatedBy,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      NewProduct,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add product" },
      { status: 500 }
    );
  }
}

//Get Product

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.product.findMany();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
