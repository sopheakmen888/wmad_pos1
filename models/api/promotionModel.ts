import { Decimal } from "@prisma/client/runtime/library";
import DataModel from "./model";

export interface PromotionModel extends DataModel {
    id: number
    promotionCode: string;    
    description: string;       
    startDate: Date;        
    endDate: Date;           
    discountPercentage: Decimal; 
}