import React from "react";
import { PromotionDetailView } from "./page-tableview";
const promotioninfo = () => {
  const promotionId = "1"; // Replace with the actual promotionId you want to pass

  return (
    <div>
      <PromotionDetailView promotionId={promotionId} />
    </div>
  );
};

export default promotioninfo;
