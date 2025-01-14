import prisma from "@/lib/prisma";
import { ProductModel } from "@/models/api/productModel";
import { getPaginatedProducts } from "@/services/productServices";
import { NextRequest, NextResponse } from "next/server";

// GET Handler: Fetch paginated products
export async function GET(req: NextRequest) {
  try {
    const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "10");
    const currentPage = parseInt(req.nextUrl.searchParams.get("currentPage") || "1");

    const data = await getPaginatedProducts({ pageSize, currentPage });

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const data = await req.json();

    const product = await prisma.product.create({
      data,
      include: { category: true},
    });

    const resData: ProductModel = {
      id:product.id,
      nameEn: product.nameEn,
      nameKh: product.nameKh || '',
      category: product.category.nameEn,
      sku: product.sku || '',
      imageUrl: product.imageUrl || '',
    };



    return NextResponse.json({ message: "Create product successfully", data:resData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    )
  }
}

