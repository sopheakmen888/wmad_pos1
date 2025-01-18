import DataModel from "./model";

export interface SupplierModel extends DataModel {
    id: number;
    supplierName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    addressLine1: string;
    addressLine2: string;
    province: string;
    websiteUrl: string;
    imageUrl: string;
    taxIdentification: string;
    StockIn: any;
  }