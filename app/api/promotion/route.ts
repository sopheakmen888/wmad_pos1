import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const promotion = await prisma.promotion.create({ data });
    return NextResponse.json({ success: true, data: promotion });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'eroor'});
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const promotions = await prisma.promotion.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { startDate: "desc" },
  });

  return NextResponse.json({ success: true, data: promotions });
}


