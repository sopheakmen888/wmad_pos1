import { PurchaseModel } from "@/models/api/purchaseModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";


export const getPaginatedPurchase = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<PurchaseModel>> => {
    const data = await prisma.stockIn.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: "desc",
        },
        include: {
            supplier: true,
            stockInDetails: true,
        },
    });
console.log(data)
    const count = await prisma.stockIn.count();
    const totalPages = Math.ceil(count / pageSize);

    const result: PaginationData<PurchaseModel> = {
        pageSize,
        currentPage,
        prevPage: Math.max(currentPage - 1, 1),
        nextPage: Math.min(currentPage + 1, totalPages),
        totalItems: count,
        totalPages: totalPages,
        records: data.map(item => {
            return {
                id: item.id,
                supplierId: item.supplierId,
                referenceNumber: item.referenceNumber,
                stockInDate: item.stockInDate,
                supplierName:item.supplier.supplierName,
                numberOfItems: item.stockInDetails.length,
                purchaseAmount: item.stockInDetails.reduce(
                    (sum, detail) =>
                        sum + Number(detail.purchaseUnitPrice) * Number(detail.quantity),
                      0
                ),
            } as PurchaseModel;
        }),
    }

    return result;
}

