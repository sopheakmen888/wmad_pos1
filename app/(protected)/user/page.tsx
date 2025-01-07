import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./page-tableview";
import { getPaginatedUsers } from "@/services/userServices";


const UserPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const page = parseInt(searchParams.page || "1");
  const data = await getPaginatedUsers({ pageSize: 10, currentPage: page });

  return <PageWrapper>
    <PageTableView title="Users" data={data} />
  </PageWrapper>;
};

export default UserPage;
