import { ProductModel } from "@/models/api/productModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";


export const getPaginatedProducts= async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<ProductModel>> => {
    const data = await prisma.product.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
        include: {
            category: true        }
    });

    const count = await prisma.product.count();
    const totalPages = Math.ceil(count / pageSize);

    const result: PaginationData<ProductModel> = {
        pageSize,
        currentPage,
        prevPage: Math.max(currentPage - 1, 1),
        nextPage: Math.min(currentPage + 1, totalPages),
        totalItems: count,
        totalPages: totalPages,
        records: data.map(item => {
            return {
                id: item.id,
                nameEn: item.nameEn,
                nameKh: item.nameKh??"",
                category: item.category, // Assuming category has nameEn
                sku: item.sku,
                imageUrl: item.imageUrl??"",}
        }),
    }
    console.log(".......",getPaginatedProducts)
    return result;
}