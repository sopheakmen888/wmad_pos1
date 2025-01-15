import { ProductTable } from "./product-table";
import PageWrapper from "@/components/page-wrapper";
import { getProductlist } from "@/services/productServices";



const ProductPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1");
  const data = await getProductlist({ pageSize: 10, currentPage: page });
//  console.log(data)
  return <PageWrapper>
    <ProductTable title="Products" data={data} />
  </PageWrapper>;
};

export default ProductPage;