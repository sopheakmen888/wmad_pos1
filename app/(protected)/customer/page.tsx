import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { getPaginationCustomers } from '@/services/customerService';

  const CustomerPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    
    const page = parseInt(searchParams.page || "1");
    const data = await getPaginationCustomers({ pageSize: 10, currentPage: page });
    console.log(data);
  
    return <PageWrapper>
      <div></div>
     </PageWrapper>;
};
export default CustomerPage;

