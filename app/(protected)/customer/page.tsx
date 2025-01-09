import React from 'react';
import PageWrapper from '@/components/page-wrapper';
import { CustomerPageTableView } from '../customer/page-tableview';
import { getPaginatedCustomers } from '@/services/customerServices';



const Customerpage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const 
  page = parseInt(searchParams.page || "1");
  const data = await getPaginatedCustomers({ pageSize: 10, currentPage: page });

  return <PageWrapper>
    <CustomerPageTableView title="Customer" data={data} />
  </PageWrapper>;
};
export default Customerpage;
