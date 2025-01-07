import { UserModel } from "@/models/api/userModel";
import PaginationData from "@/models/PaginationData";
import prisma from "@/lib/prisma";


export const getPaginatedUsers = async ({ pageSize = 10, currentPage = 1 }: { pageSize?: number, currentPage?: number }): Promise<PaginationData<UserModel>> => {
    const data = await prisma.user.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
        orderBy: {
            id: 'desc',
        },
        include: {
            role: true,
        }
    });

    const count = await prisma.user.count();

    const result: PaginationData<UserModel> = {
        pageSize,
        currentPage,
        totalRecords: count,
        records: data.map(item => {
            return {
                id: item.id,
                username: item.username,
                email: item.email,
                imageUrl: item.imageUrl ?? null,
                isActive: item.isActive,
                role: item.role.name,
            } as UserModel;
        }),
    }

    return result;
}