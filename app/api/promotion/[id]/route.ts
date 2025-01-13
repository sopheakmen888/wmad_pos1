import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
    const promotion = await prisma.promotion.findUnique({
      where: { id: parseInt(id) },
    });
  
    if (!promotion) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }
  
    return NextResponse.json(promotion);
  }
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      const data = await request.json();
      const updatedPromotion = await prisma.promotion.update({ where: { id: parseInt(params.id) }, data });
      return NextResponse.json({ success: true, data: updatedPromotion });
    } catch {
      return NextResponse.json({ success: false, error: "Failed to update promotion" }, { status: 400 });
    }
  }
  
  export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
      await prisma.promotion.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({ success: true, message: "Promotion deleted" });
    } catch {
      return NextResponse.json({ success: false, error: "Failed to delete promotion" }, { status: 400 });
    }
  }