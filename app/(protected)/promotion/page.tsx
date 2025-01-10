import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./page-tableview";
import {  getPaginatedPromotion} from "@/services/promotionServices";

interface PromotionPageProps {
  searchParams: Record<string, string>;
}

const PromotionPage: React.FC<PromotionPageProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);

  const data = await getPaginatedPromotion({ pageSize: 10, currentPage: page });

  return (
    <PageWrapper>
      <PageTableView title="Promotions" data={data} />
    </PageWrapper>
  );
};

export default PromotionPage;
