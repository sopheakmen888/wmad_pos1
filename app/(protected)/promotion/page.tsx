
import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./page-tableview";
import { getPaginatedPromotion } from "@/services/promotionServices";
interface PageProps{
  searchParams: {[key: string]: string | undefined};
}
const PromotionPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page || "1");
  const data = await getPaginatedPromotion({ pageSize: 10, currentPage: page });

  return <PageWrapper>
    <PageTableView title="Promotions" data={data} />
  </PageWrapper>;
};

export default PromotionPage;