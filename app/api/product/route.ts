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


// // POST Handler: Add a new product
// export async function POST(request: NextRequest) {
//   const body = await request.json();

//   // Destructure and check required fields
//   const { nameEn, nameKh, category, sku, image } = body;

//   // Check if all required fields are present
//   if (!nameEn || !category || !sku) {
//     return NextResponse.json({
//       success: false,
//       error: "Missing required fields: 'nameEn', 'category', 'sku'",
//     });
//   }

//   try {
//     // Check if the product already exists (based on SKU or some unique identifier)
//     const existingProduct = await prisma.product.findUnique({
//       where: { sku }, // Assuming 'sku' is unique
//     });

//     if (existingProduct) {
//       return NextResponse.json({
//         success: false,
//         error: "Product with this SKU already exists",
//       });
//     }

//     // Add the new product to the database
//     const newProduct = await prisma.product.create({
//       data: {
//         nameEn,
//         nameKh,
//         category: { connect: { id: category } }, // Assuming category is a reference (ID)
//         sku,
//         imageUrl: image, // Corrected to reference 'image' from request body
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Product added successfully",
//       product: newProduct,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       success: false,
//       error: "Failed to add product",
//     }, { status: 500 });
//   }
// }
