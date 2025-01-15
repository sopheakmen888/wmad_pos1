import DataModel from "./model";

export interface CustomerModel extends DataModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}