import { NextResponse, NextRequest } from "next/server";

let productDatabase: Record<string, any> = {};

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
      error: "Purchase not found",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Purchase found",
    purchaseModel: productDatabase[id],
  });
}
