import { purchaseModel } from "@/models/api/purchaseModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";

export const getPurchases = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<purchaseModel>> => {
    const skip = pageSize * (currentPage - 1);

    // Fetch paginated data
    const data = await prisma.stockIn.findMany({
        skip,
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
        include: {
            stockInDetails: true,
            supplier: true,
        },
    });

    // Count total records
    const totalItems = await prisma.stockIn.count();
    const totalPages = Math.ceil(totalItems / pageSize);

    // Map data to `purchaseModel`
    const records: purchaseModel[] = data.map(item => {
        const numberOfProduct = item.stockInDetails.length;
        const purchaseAmount = item.stockInDetails.reduce(
            (total, detail) => total + (detail.purchaseUnitPrice?.toNumber() || 0),
            0
        );

        return {
            id: item.id,
            referenceNumber: item.referenceNumber,
            stockInDate: item.stockInDate,
            supplierName: item.supplier.supplierName,
            numberOfProduct,
            purchaseAmount,
        };
    });

    // Build and return the paginated result
    return {
        pageSize,
        currentPage,
        totalPages,
        totalItems,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        records,
    };
};

