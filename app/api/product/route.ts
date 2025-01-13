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

    // Flatten the response to only return the array of records
    const records = data.records || [];

    return NextResponse.json({ message: "Success", data: records });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}
