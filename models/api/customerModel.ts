import DataModel from "../api/model";

export interface customerModel extends DataModel {
    id:number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    
}