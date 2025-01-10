import { SupplierModel } from "@/models/api/supplier";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";


export const getPaginatedSupplier = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<SupplierModel>> => {
    const data = await prisma.supplier.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
    });

    const count = await prisma.supplier.count();
    const totalPages = Math.ceil(count / pageSize);

    const result: PaginationData<SupplierModel> = {
        pageSize,
        currentPage,
        prevPage: Math.max(currentPage - 1, 1),
        nextPage: Math.min(currentPage + 1, totalPages),
        totalItems: count,
        totalPages: totalPages,
        records: data.map(item => {
            return {
                id: item.id,
                supplierName: item.supplierName,
                contactName: item.contactName,
                contactEmail: item.contactEmail,
                contactPhone: item.contactPhone,
                province: item.province,
                taxIdentification: item.taxIdentification,
            } as SupplierModel;
        }),
    }

    return result;
}