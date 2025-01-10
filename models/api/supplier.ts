import DataModel from "./model";

export interface SupplierModel extends DataModel {
    id: number;
    supplierName: string;
    contactName: string;
    contactEmail: String;
    contactPhone: String;
    province: String;
    taxIdentification: String;
  }