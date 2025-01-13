import prisma from "@/lib/prisma";
import { UserApiResModel } from "@/models/api/userModel";
import { getPaginatedUsers } from "@/services/userServices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pageSize = parseInt(
      req.nextUrl.searchParams.get("pageSize") as string
    );
    const currentPage = parseInt(
      req.nextUrl.searchParams.get("currentPage") as string
    );

    const data = await getPaginatedUsers({ pageSize, currentPage });

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data,
      include: { role: true },
    });

    const resData: UserApiResModel = {
      id: user.id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl || undefined,
      isActive: user.isActive,
      roleId: user.roleId,
      role: user.role.name,
    };

    return NextResponse.json({ message: "Success", data: resData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { UserModel } from "@/models/api/userModel";

// async function getPaginatedUsers(page: number, pageSize: number) {
//   const users = await prisma.user.findMany({
//     skip: (page - 1) * pageSize, //
//     take: pageSize,
//     orderBy: {
//       username: "desc",
//     },
//   });

//   return users;
// }

// export async function GET(request: NextRequest) {
//   const { page, pageSize } = request.nextUrl.searchParams;

//   return NextResponse.json({ message: "success", data: [] });
// }
