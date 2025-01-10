import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./promotion-table";
import { getPaginatedPromotions } from "@/services/promotionService";


const PromotionPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1");
  const data = await getPaginatedPromotions({ pageSize: 10, currentPage: page });

  return <PageWrapper>
    <PageTableView title="Promotions" data={data} />
  </PageWrapper>;
};

export default PromotionPage;
