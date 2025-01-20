import { getSessionDataFromCookie } from "@/app/auth/stateless-session";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getProductlist } from "@/services/productServices";

export interface ProductRefModel {
  id: number;
  nameEn: string;
  nameKh: string;
  categoryNameEn: string;
  categoryNameKh: string;
  productCode: string;
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nameEn, nameKh, categoryId, sku } = body;


    // validate form data from client
    // logic to save to database

    const authData = await getSessionDataFromCookie();
    // console.log("Cookie", authData);
    console.log("Auth Data:", authData); // Add this to see what's being returned


    if (!authData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    if (!nameEn || !nameKh || !categoryId || !sku) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const category = await prisma.productCategory.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 400 }
      );
    }

    const lastProduct = await prisma.product.findFirst({
      orderBy: { productCode: "desc" },
    });

    let newProductCode = "P0001"; // Default product code if no products exist

    if (lastProduct) {
      const lastProductCodeNumber = parseInt(
        lastProduct.productCode.replace("P", "")
      );
      const nextProductCodeNumber = lastProductCodeNumber + 1;

      newProductCode = `P${nextProductCodeNumber.toString().padStart(4, "0")}`;
    }

    const NewProduct = await prisma.product.create({
      data: {
        productCode: newProductCode,
        nameEn,
        nameKh,
        categoryId: categoryId,
        sku,
        createdBy: authData?.userId,
        updatedBy: authData?.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
     NewProduct
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add product" },
      { status: 500 }
    );
  }
}

//Get Product
export async function GET(req: NextRequest) {
  try {
    const pageSize = parseInt(
      req.nextUrl.searchParams.get("pageSize") as string
    );
    const currentPage = parseInt(
      req.nextUrl.searchParams.get("currentPage") as string
    );

    const data = await getProductlist({ pageSize, currentPage });

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}
