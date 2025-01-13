import React from "react";
import { CreatePromotionForm } from "./page-tableview";

const data = {
  promotionCode: "",
  description: "",
  startDate: "",
  endDate: "",
  discountPercentage: "",
};

const Page = () => {
  return (
    <div>
      <CreatePromotionForm title="New Promotion" data={data} />
    </div>
  );
};

export default Page;
