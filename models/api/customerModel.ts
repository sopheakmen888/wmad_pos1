import { string } from "zod";
import DataModel from "./model";

export interface customerModel extends DataModel{
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;

}