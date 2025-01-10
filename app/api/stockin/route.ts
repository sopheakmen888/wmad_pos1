import { NextResponse, NextRequest } from "next/server";

// Mock database
let purchaseDatabase: Record<string, any> = {};

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Data processed successfully",
    data: purchaseDatabase,
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      id,
      supplierId,
      referenceNumber,
      stockInDate,
      numberOfItems,
      purchaseAmount,
    } = data;

    if (
      !id ||
      !supplierId ||
      !referenceNumber ||
      !stockInDate ||
      !numberOfItems ||
      !purchaseAmount
    ) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Store the data in our mock database
    purchaseDatabase[id] = {
      id,
      supplierId,
      referenceNumber,
      stockInDate,
      numberOfItems,
      purchaseAmount,
    };

    return NextResponse.json({
      success: true,
      message: "Data processed successfully",
      purchaseModel: purchaseDatabase[id],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Invalid JSON input or server error",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id,
      supplierId,
      referenceNumber,
      stockInDate,
      numberOfItems,
      purchaseAmount,
    } = data;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Missing 'id' field",
      });
    }

    if (!purchaseDatabase[id]) {
      return NextResponse.json({
        success: false,
        error: "Purchase not found",
      });
    }

    // Update the purchase data
    purchaseDatabase[id] = {
      id,
      supplierId,
      referenceNumber,
      stockInDate,
      numberOfItems,
      purchaseAmount,
    };

    return NextResponse.json({
      success: true,
      message: "Data updated successfully",
      purchaseModel: purchaseDatabase[id],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Invalid JSON input or server error",
    });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id"); // Use `.get("id")`

  if (!id || !purchaseDatabase[id]) {
    return NextResponse.json({
      success: false,
      error: "Purchase not found",
    });
  }

  // Delete the purchase data
  delete purchaseDatabase[id];

  return NextResponse.json({
    success: true,
    message: "Purchase deleted successfully",
  });
}
