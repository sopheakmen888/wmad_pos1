import { NextResponse, NextRequest } from "next/server";
import prisma from '@/lib/prisma';
import { error } from "console";
import { PurchaseDetailModel } from "@/models/api/purchaseDetailModel";

export async function GET(request:NextRequest){
  const data= await prisma.stockIn.findMany();
  return NextResponse.json({ message: "success", data });
}
interface PurchaseItemDetail {
  productId: number;
  quantity: number;
  purchaseUnitPrice: number;  
  saleUnitPrice: number;     
  totalPrice: number;
  expiryDate: Date;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { supplierId, referenceNumber, stockInDate, stockInDetails }: { 
      supplierId: number; 
      referenceNumber: string; 
      stockInDate: string; 
      stockInDetails: PurchaseItemDetail[]; 
    } = body;


    const stockIn = await prisma.stockIn.create({
      data: {
        supplierId,
        referenceNumber,
        stockInDate,
        stockInDetails: {
          create: stockInDetails.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            purchaseUnitPrice: item.purchaseUnitPrice, 
            saleUnitPrice: item.saleUnitPrice,          
            totalPrice: item.quantity* item.saleUnitPrice,
            expiryDate: item.expiryDate,
          })),
        },
      },
      include: {
        stockInDetails: true,  
      },
    });

    return NextResponse.json({ message: "Creation successful", data: stockIn });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating purchase"}, { status: 500 });
  }
}

