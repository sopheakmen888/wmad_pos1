import { NextResponse, NextRequest } from "next/server";

let purchaseDatabase: Record<string, any> = {};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      success: false,
      error: "Missing 'id' query parameter",
      data: purchaseDatabase,
    });
  }

  if (!purchaseDatabase[id]) {
    return NextResponse.json({
      success: false,
      error: "Purchase not found",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Purchase found",
    purchaseModel: purchaseDatabase[id],
  });
}
