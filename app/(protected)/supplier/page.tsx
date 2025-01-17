import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./supplier-table";
// import { PageAddSupplier } from "./create/addsupplier";
import { getPaginatedSupplier } from "@/services/supplierServices";


const SupplierPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1");
  const data = await getPaginatedSupplier({ pageSize: 10, currentPage: page });

  return <PageWrapper>
    <PageTableView title="Supplier" data={data} />
  </PageWrapper>;
};

export default SupplierPage;

