import DataModel from "./model";

export interface PurchaseDetailModel extends DataModel {
  id: number; 
  stockId: number;
  productId: number; 
  quantity: number;
  purchaseUnitPrice:number;
  saleUnitPrice: number; 
  totalPrice: number; 
}
