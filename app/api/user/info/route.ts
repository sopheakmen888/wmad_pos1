import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UserApiResModel, UserModel } from "@/models/api/userModel";

export interface UserResponseModel extends UserModel {
  roleId: number;
}

export interface UserUpdateFormData {
  id: number;
  username: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  roleId: number;
}

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.nextUrl.searchParams.get("id") as string);

    const user = await prisma.user.findFirst({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Bad request", data: null },
        { status: 400 }
      );
    }

    const data: UserResponseModel = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      role: user.role.name,
      isActive: user.isActive,
      imageUrl: user.imageUrl ?? undefined,
    };

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = parseInt(req.nextUrl.searchParams.get("id") as string);
    console.log("id", id);
    const user = await prisma.user.delete({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Bad request", data: null },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = (await req.json()) as UserUpdateFormData;
    console.log(data);

    const user = await prisma.user.update({
      data: {
        email: data.email,
        username: data.username,
        roleId: data.roleId,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
      },
      include: { role: true },
      where: { id: data.id },
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
