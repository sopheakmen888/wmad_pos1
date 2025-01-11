import { PurchaseModel } from "@/models/api/purchaseModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";

export const getPurchases = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<PurchaseModel>> => {
    const skip = pageSize * (currentPage - 1);

    // Fetch paginated data from the database
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

    // Count total records for pagination
    const totalItems = await prisma.stockIn.count();
    const totalPages = Math.ceil(totalItems / pageSize);

    // Map data to `purchaseModel`
    const records: PurchaseModel[] = data.map(item => {
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

    // Return paginated result with metadata and records
    return {

        pageSize,
        currentPage,
        prevPage: Math.max(currentPage - 1, 1),
        nextPage: Math.min(currentPage + 1, totalPages),
        totalItems: totalItems,
        totalPages: totalPages,
        records,
    };
};

