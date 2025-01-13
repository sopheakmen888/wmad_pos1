import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { PromotionModel } from "@/models/api/promotionModel";

async function getPromotionById(id: number) {
  return await prisma.promotion.findUnique({
    where: { id },
  });
}
async function updatePromotion(id: number, data: PromotionModel) {
  return await prisma.promotion.update({
    where: { id },
    data,
  });
}

async function deletePromotion(id: number) {
  return await prisma.promotion.delete({
    where: { id },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const promotion = await getPromotionById(id);
  if (!promotion) {
    return NextResponse.json(
      { message: "Promotion not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "success", data: promotion });
}

// Handle PUT request to update promotion by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const { promotionCode, description, startDate, endDate, discountPercentage } =
    await request.json();

  try {
    const updatedPromotion = await updatePromotion(id, {
      promotionCode,
      description,
      startDate,
      endDate,
      discountPercentage,
    });
    return NextResponse.json(
      { message: "Promotion updated successfully", data: updatedPromotion },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating promotion" },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete promotion by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  try {
    await deletePromotion(id);
    return NextResponse.json(
      { message: "Promotion deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting promotion" },
      { status: 500 }
    );
  }
}
