import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { SupplierTable } from "./supplier-table"; // Use SupplierTable
import { getPaginatedSupplier } from "@/services/supplierServices";


const SupplierPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1"); // Ensure page is a number

  // Fetch paginated supplier data
  const data = await getPaginatedSupplier({ pageSize: 10, currentPage: page });

  return (
    <PageWrapper>
      {/* Pass the fetched data to SupplierTable */}
      <SupplierTable title="Suppliers" data={data} />
    </PageWrapper>
  );
};

export default SupplierPage;