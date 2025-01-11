import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { getPaginatedProducts } from "@/services/productServices";
import { ProductTableView } from "./product-table"; // Adjust import as needed
import { ProductModel } from "@/models/api/productModel";


const ProductPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const 
  page = parseInt(searchParams.page || "1");
  const data = await getPaginatedProducts({ pageSize: 10, currentPage: page });

  return <PageWrapper>
    <ProductTableView title="Product" data={data} />
    </PageWrapper>;
};

export default ProductPage;

