import { SupplierModel } from "@/models/api/supplierModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";

export const getPaginatedSupplier = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<SupplierModel>> => {
    // Fetch paginated supplier data
    const data = await prisma.supplier.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
        include: {
            StockIn: true, // Assuming this is a related field
        },
    });

    // Count total suppliers
    const count = await prisma.supplier.count();
    const totalPages = Math.ceil(count / pageSize);

    // Map the supplier data to match the SupplierModel structure
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
                contactName: item.contactName ?? null,
                contactEmail: item.contactEmail ?? null,
                contactPhone: item.contactPhone ?? null,
                addressLine1: item.addressLine1 ?? null,
                addressLine2: item.addressLine2 ?? null,
                province: item.province ?? null,
                websiteUrl: item.websiteUrl ?? null,
                imageUrl: item.imageUrl ?? null,
                taxIdentification: item.taxIdentification ?? null,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt ?? null,
                StockIn: item.StockIn, // Assuming this is required as-is
            } as SupplierModel;
        }),
    };

    return result;
<<<<<<< HEAD
};
=======
};
>>>>>>> supplier
