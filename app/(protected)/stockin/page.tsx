import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { getPurchases } from "@/services/purchaseService";
import { PageTableView } from "./tableview-pagination";


const PurchasePage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    const page = parseInt(searchParams.page || "1");
    const data = await getPurchases({ pageSize: 10, currentPage: page });
    console.log(data);
  

    return (
        <PageWrapper>
           <PageTableView title="Stockin" data={data} />
        </PageWrapper>
    );
};

export default PurchasePage;
