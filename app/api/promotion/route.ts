import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { PromotionCreateModel } from "@/models/api/promotionModel";

async function getPaginatedPromotions(page: number, pageSize: number) {
  const promotions = await prisma.promotion.findMany({
    skip: (page - 1) * pageSize, //
    take: pageSize,
    orderBy: {
      promotionCode: "desc",
    },
  });

  return promotions;
}
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const promotions = await getPaginatedPromotions(page, pageSize);
  return NextResponse.json({ message: "success", data: promotions });
}

async function createPromotion(data: PromotionCreateModel) {
  return await prisma.promotion.create({
    data,
  });
}

export async function POST(request: NextRequest) {
  const { promotionCode, description, startDate, endDate, discountPercentage } =
    await request.json();

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    !promotionCode ||
    !description ||
    !startDate ||
    !endDate ||
    !discountPercentage
  ) {
    return NextResponse.json(
      { message: "Invalid data provided" },
      { status: 400 }
    );
  }
  try {
    const promotion = await createPromotion({
      promotionCode,
      description,
      startDate: start,
      endDate: end,
      discountPercentage,
    });
    return NextResponse.json({
      message: "Promotion created successfully",
      data: promotion,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating promotion", error },
      { status: 500 }
    );
  }
}
