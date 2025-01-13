import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { SupplierTable } from "./supplier-table"; 
import { getPaginatedSupplier } from "@/services/supplierServices";

const SupplierPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1"); 
  const data = await getPaginatedSupplier({ pageSize: 10, currentPage: page });

  return (
    <PageWrapper>
      <SupplierTable title="Suppliers" data={data} />
    </PageWrapper>
  );
};

export default SupplierPage;
