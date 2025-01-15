import React from "react";
import PageWrapper from "@/components/page-wrapper";
<<<<<<< HEAD
import { SupplierTable } from "./supplier-table"; 
import { getPaginatedSupplier } from "@/services/supplierServices";

const SupplierPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1"); 
=======
import { SupplierTable } from "./supplier-table"; // Use SupplierTable
import { getPaginatedSupplier } from "@/services/supplierServices";


const SupplierPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1"); // Ensure page is a number

  // Fetch paginated supplier data
>>>>>>> supplier
  const data = await getPaginatedSupplier({ pageSize: 10, currentPage: page });

  return (
    <PageWrapper>
<<<<<<< HEAD
=======
      {/* Pass the fetched data to SupplierTable */}
>>>>>>> supplier
      <SupplierTable title="Suppliers" data={data} />
    </PageWrapper>
  );
};

<<<<<<< HEAD
export default SupplierPage;
=======
export default SupplierPage;
>>>>>>> supplier
