import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    
    const body = await request.json();
    const { nameEn, nameKh, categoryId, sku, updatedBy } = body;

    // Validate
    if (!nameEn || !nameKh || !categoryId || !sku || !updatedBy) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        nameEn,
        nameKh,
        categoryId,
        sku,
        updatedBy,
      },
    });

    return NextResponse.json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete 
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    console.log(id);

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}




// Get a product by ID
export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params; 

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve product" },
      { status: 500 }
    );
  }
}
