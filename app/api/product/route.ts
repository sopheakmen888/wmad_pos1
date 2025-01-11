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

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();

//     // Validate the incoming data
//     if (!data.nameEn || !data.nameKh || !data.categoryId || !data.imageUrl || !data.productCode) {
//       return NextResponse.json(
//         { message: "Invalid input data" },
//         { status: 400 }
//       );
//     }

//     // Create a new product in the database
//     const newProduct = await prisma.product.create({
//       data: {
//         nameEn: data.nameEn,
//         nameKh: data.nameKh,
//         categoryId: data.categoryId,
//         imageUrl: data.imageUrl,
//         productCode: data.productCode,
//       },
//       include: {
//         category: true, // Fetch related category data
//       },
//     });

//     // Construct the response object
//     const resData: ProductModel = {
//       id: newProduct.id,
//       nameEn: newProduct.nameEn,
//       nameKh: newProduct.nameKh??"",
//       categoryNameEn: newProduct.category?.nameEn || "Unknown",
//       categoryNameKh: newProduct.category?.nameKh || "Unknown",
//       imageUrl: newProduct.imageUrl || "",
//       productCode: newProduct.productCode,
//     };

//     return NextResponse.json({ message: "Success", data: resData });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
