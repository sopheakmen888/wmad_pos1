import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { UserModel } from "@/models/api/userModel";

async function getPaginatedUsers(page: number, pageSize: number) {
  const users = await prisma.user.findMany({
    skip: (page - 1) * pageSize, //
    take: pageSize,
    orderBy: {
      username: "desc",
    },
  });

  return users;
}

export async function GET(request: NextRequest) {
  const { page, pageSize } = request.nextUrl.searchParams;

  return NextResponse.json({ message: "success", data: [] });
}
