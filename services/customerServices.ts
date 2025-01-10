import { customerModel } from "@/models/api/customerModel";
import PaginationData from "../models/PaginationData";
import prisma from "../lib/prisma";

export const getPaginatedCustomers = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number; currentPage?: number }): Promise<PaginationData<customerModel>> => {
    const data = await prisma.customer.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
    });

    const count = await prisma.customer.count();
    const totalPages = Math.ceil(count / pageSize);

    const result: PaginationData<customerModel> = {
        pageSize,
        currentPage,
        prevPage: Math.max(currentPage - 1, 1),
        nextPage: Math.min(currentPage + 1, totalPages),
        totalItems: count,
        totalPages: totalPages,
        records: data.map(item => {
            return {
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                phone: item.phone,
                address: item.address,
            } as customerModel;
        }),
    };

    return result;
};