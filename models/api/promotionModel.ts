import { Decimal } from "@prisma/client/runtime/library";
import DataModel from "./model";

export interface PromotionCreateModel extends DataModel {
    promotionCode: string;    
    description: string;       
    startDate: Date;        
    endDate: Date;           
    discountPercentage: Decimal; 
}

export interface PromotionModel extends PromotionCreateModel {
    id: number
}