import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch the customer data by id
        const customer = await prisma.customer.findUnique({
            where: { id: parseInt(id) },
        });

        // If customer not found, return 404 error
        if (!customer) {
            return NextResponse.json(
                { error: "Customer not found" },
                { status: 404 }
            );
        }

        // Return the customer data if found
        return NextResponse.json({ customer });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch customer", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, address } = body;

        const updatedCustomer = await prisma.customer.update({
            where: { id: parseInt(id) },
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
            },
        });

        return NextResponse.json({ message: "Customer updated successfully!", updatedCustomer });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update customer", details: (error as Error).message },
            { status: 400 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.customer.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete customer", details: (error as Error).message }, { status: 400 });
    }
}