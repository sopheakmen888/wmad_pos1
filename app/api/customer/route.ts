import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request: NextRequest) {
    const data = await prisma.customer.findMany();
    return NextResponse.json({ message: "Hello", data });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse request body
        const { firstName, lastName, email, phone, address } = body; // Destructure required fields

        // Create a new customer in the database
        const newCustomer = await prisma.customer.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
            },
        });

        return NextResponse.json({ message: "Customer created successfully!", newCustomer });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create customer", details: (error as Error).message },
            { status: 400 }
        );
    }
}