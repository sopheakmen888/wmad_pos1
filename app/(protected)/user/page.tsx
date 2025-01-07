import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./page-tableview";
import { getPaginatedUsers } from "@/services/userServices";


const UserPage = async () => {
  const data = await getPaginatedUsers({ pageSize: 10, currentPage: 1 });

  return <PageWrapper>
    <PageTableView title="Users" data={data} />
  </PageWrapper>;
};

export default UserPage;
