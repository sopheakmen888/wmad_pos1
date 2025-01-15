import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.supplier.findMany();

    return NextResponse.json({
      message: "Success",
      data: data.map((i) => {
        return { id: i.id, name: i.supplierName };
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
