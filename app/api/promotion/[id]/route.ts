import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  console.log("params:", params); // Debug params
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  const promotion = await prisma.promotion.findUnique({
    where: { id: Number(id) }, // Ensure ID is a number
  });

  if (!promotion) {
    return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
  }

  return NextResponse.json(promotion);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const {
      promotionCode,
      description,
      startDate,
      endDate,
      discountPercentage,
    } = body;

    const updatedPromotion = await prisma.promotion.update({
      where: { id: Number(id) },
      data: {
        promotionCode,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        discountPercentage,
      },
    });

    return NextResponse.json({
      message: "Promotion updated successfully!",
      updatedPromotion,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update promotion",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const deletedPromotion = await prisma.promotion.delete({
      where: { id: Number(id) }, // Ensure the ID is correctly handled as a number
    });

    return NextResponse.json({
      message: "Promotion deleted successfully!",
      deletedPromotion,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete promotion",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  }
}