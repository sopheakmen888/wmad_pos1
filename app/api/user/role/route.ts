import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.role.findMany();

    return NextResponse.json({
      message: "Success",
      data: data.map((i) => {
        return { id: i.id, name: i.name };
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
