import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface ProductRefModel {
  id: number;
  nameEn: string;
  nameKh: string;
  categoryNameEn: string;
  categoryNameKh: string;
  productCode: string;
}

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      message: "Success",
      data: data.map((i) => {
        return {
          id: i.id,
          nameEn: i.nameEn,
          nameKh: i.nameKh,
          categoryNameEn: i.category.nameEn,
          categoryNameKh: i.category.nameKh,
          productCode: i.productCode,
        } as ProductRefModel;
      }),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}
