import { Decimal } from "@prisma/client/runtime/library";
import DataModel from "./model";

export interface purchaseModel extends DataModel {

        id: number;
        referenceNumber: string;
        stockInDate: Date;
        supplierName: string;
        numberOfProduct: number;
        purchaseAmount: number;
    
    
}