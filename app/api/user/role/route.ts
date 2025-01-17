import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ message: "success", data: roles });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 400 }
    );
  }
}