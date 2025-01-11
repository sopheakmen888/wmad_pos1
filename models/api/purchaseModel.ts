import { Decimal } from "@prisma/client/runtime/library";
import DataModel from "./model";

export interface PurchaseModel extends DataModel {
        id: number;
        referenceNumber: string;
        stockInDate: Date;
        supplierName: string;
        numberOfProduct: number;
        purchaseAmount: number;
    
    
}