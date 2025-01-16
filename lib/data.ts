import prisma from "@/lib/prisma";

export async function getTotalSales() {
  const result = await prisma.saleItemMaster.aggregate({
    _sum: {
      grandTotalAmount: true,
    },
  });
  return result._sum.grandTotalAmount || 0;
}

export async function getTotalProducts() {
  return await prisma.product.count();
}

export async function getTotalCustomers() {
  return await prisma.customer.count();
}

export async function getTotalSuppliers() {
  return await prisma.supplier.count();
}

export async function getRecentSales() {
  return await prisma.saleItemMaster.findMany({
    take: 5,
    orderBy: {
      transactionDate: "desc",
    },
    include: {
      customer: true,
    },
  });
}

export async function getTopProducts() {
  const topProducts = await prisma.saleItemDetail.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  return Promise.all(
    topProducts.map(async (product) => {
      const productDetails = await prisma.product.findUnique({
        where: { id: product.productId },
      });
      return {
        ...productDetails,
        totalSold: product._sum.quantity,
      };
    })
  );
}

export async function getUserStats() {
  const userStats = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return userStats.map((stat) => ({
    date: stat.createdAt.toISOString().split("T")[0],
    totalUsers: stat._count.id,
  }));
}

export async function getInventoryOverview() {
  const categories = await prisma.productCategory.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  return categories.map((category, index) => ({
    name: category.nameEn,
    value: category._count.products,
    color: colors[index % colors.length],
  }));
}
