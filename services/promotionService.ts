import { PromotionModel } from "@/models/api/promotionModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";


export const getPaginatedPromotions = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<PromotionModel>> => {
    const data = await prisma.promotion.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
        // include: {
        //     role: true,
        // }
    });

    const count = await prisma.promotion.count();
    const totalPages = Math.ceil(count / pageSize);

    const result: PaginationData<PromotionModel> = {
        pageSize,
        currentPage,
        prevPage: Math.max(currentPage - 1, 1),
        nextPage: Math.min(currentPage + 1, totalPages),
        totalItems: count,
        totalPages: totalPages,
        records: data.map(item => {
            return {
                id: item.id,
                promotionCode: item.promotionCode,
                description: item.description,
                startDate: item.startDate,
                endDate: item.endDate,
                discountPercentage: item.discountPercentage,
            } as PromotionModel;
        }),
    }

    return result;
}