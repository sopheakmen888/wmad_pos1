import { NextResponse, NextRequest } from "next/server";

// In-memory product database
let productDatabase: Record<string, any> = {};

// 📖 GET: Fetch a product by ID
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      success: false,
      error: "Missing 'id' query parameter",
      data: productDatabase,
    });
  }

  if (!productDatabase[id]) {
    return NextResponse.json({
      success: false,
      error: "Product not found",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Product found",
    product: productDatabase[id],
  });
}


export async function PUT(request: NextRequest) {
  const body = await request.json();

  const { id, nameEn, nameKh, category, sku, image } = body;

  if (!id || !nameEn || !category || !sku) {
    return NextResponse.json({
      success: false,
      error: "Missing required fields: 'id', 'nameEn', 'category', 'sku'",
    });
  }

  // Check if the product exists
  if (!productDatabase[id]) {
    return NextResponse.json({
      success: false,
      error: "Product not found",
    });
  }

  // Update the product in the database
  productDatabase[id] = { id, nameEn, nameKh, category, sku, image };

  return NextResponse.json({
    success: true,
    message: "Product updated successfully",
    product: productDatabase[id],
  });
}


// DELETE: Remove a product by ID
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      success: false,
      error: "Missing 'id' query parameter",
    });
  }

  if (!productDatabase[id]) {
    return NextResponse.json({
      success: false,
      error: "Product not found",
    });
  }

  // Remove the product from the database
  delete productDatabase[id];

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully",
  });
}
