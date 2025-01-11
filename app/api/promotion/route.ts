import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { PromotionModel } from "@/models/api/promotionModel";
import { Description } from "@radix-ui/react-dialog";

async function getPaginatedPromotions(page: number, pageSize: number) {
  const promotions = await prisma.promotion.findMany({
    skip: (page - 1) * pageSize, //
    take: pageSize,
    orderBy: {
      promotionCode: "desc",
    },
  });

  return promotions;
};

async function getPromotionById(id: number) {
  return await prisma.promotion.findUnique({
    where: { id },
  });
};

async function createPromotion(data: PromotionModel) {
  return await prisma.promotion.create({
     data
  });
};

async function updatePromotion(id: number, data: PromotionModel) {
  return await prisma.promotion.update({
    where: { id },
    data
  });
};

async function deletePromotion(id: number) {
  return await prisma.promotion.delete({
    where: { id }
  });  
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;


  const Id = Number(id);
  const promotion = await getPromotionById(Id);
  if(!promotion){
    return NextResponse.json({ message: 'Promotion not found'}, {status: 404});
  }
  const promotions = await getPaginatedPromotions(page, pageSize);
  return NextResponse.json({ message: "success", data: promotions });
}

export async function POST(request: NextRequest) {
  const { promotionCode, description, startDate, endDate, discountPercentage } = await request.json();

  const start = new Date(startDate)
  const end = new Date(endDate);

  console.log('=======>', start, end);

  if (!promotionCode || !description || !startDate || !endDate || !discountPercentage) {
    return NextResponse.json({ message: "Invalid data provided" }, { status: 400 });
  }
  try {
    const promotion = await createPromotion({
        promotionCode,
        description,
        startDate: start,
        endDate: end,
        discountPercentage,
    });
    return NextResponse.json({ message: "Promotion created successfully", data: promotion });
  } catch (error) {
    return NextResponse.json({ message: "Error creating promotion", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  const Id = Number(id);

  if(!Id){
    return NextResponse.json({message: "ID id required to update a promotion"});
  }
  const { promotionCode, description, startDate, endDate, discountPercentage } = await request.json();
  try{
    const updatepromotion = await updatePromotion(numberId,{
        promotionCode,
        description,
        startDate,
        endDate,
        discountPercentage,
    });
    return NextResponse.json({ message: "Promotion updated successfully", data: updatepromotion}, {status: 201});
  } catch (error) {
    return NextResponse.json({ message: "Error updating promotion", error}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  const Id = Number(id);

  if(!Id){
    return NextResponse.json({ message: "ID is required to delete a promotion"})
  }
  try{
    await deletePromotion(Id);
    return NextResponse.json({ message: "Promotion deleted successfuly"}, {status: 201});
  }catch (error) {
    return NextResponse.json({ message: "Error deleting promotion", error}, {status: 500});
  } 
}