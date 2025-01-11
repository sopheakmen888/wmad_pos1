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
// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   const stockIn = await prisma.stockIn.create({ data });
//   return NextResponse.json(stockIn);
// }

// export async function GET(request: NextRequest) {
//   const page = request.nextUrl.searchParams.get("page");
//   const pageSize = 10; // Fixed value, no flexibility

//   const stockIns = await prisma.stockIn.findMany({
//     skip: (Number(page) - 1) * pageSize,
//     take: pageSize,
//     orderBy: { stockInDate: "desc" },
//   });
//   return NextResponse.json(stockIns);
// }

// export async function PUT(request: NextRequest) {
//   const body = await request.json();
//   const updatedstockIn = await prisma.stockIn.update({
//     where: { id: body.id }, // Assumes `id` exists in the request body
//     data: body,
//   });
//   return NextResponse.json(updatedstockIn);
// }

// export async function DELETE(request: NextRequest) {
//   const body = await request.json();
//   await prisma.stockIn.delete({
//     where: { id: body.id }, // Assumes `id` exists in the request body
//   });
//   return NextResponse.json("Deleted");
// }
