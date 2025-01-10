import DataModel from "./model";

export interface PurchaseModel extends DataModel {
  id: number; 
  supplierId: number;
  referenceNumber: string; 
  stockInDate: Date;
  supplierName:string;
  numberOfItems: number; 
  purchaseAmount: number; 
}
