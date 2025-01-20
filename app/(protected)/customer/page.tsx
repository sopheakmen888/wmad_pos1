
import PageWrapper from '@/components/page-wrapper';
import { getPaginatedCustomer } from '@/services/customerServices';
import React from 'react'
import { CustomerTable } from '../customer/listpage';



const CustomerPage = async ({ searchParams }: { searchParams: Record<string, string>}) => {
    const page = parseInt (searchParams.page || "1");
    const data = await getPaginatedCustomer({ pageSize: 10, currentPage: page});
    
  return  <PageWrapper>
    <CustomerTable title="Customer" data={data} />
  </PageWrapper>;
}

export default CustomerPage;