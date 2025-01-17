import DataModel from "./model";

export interface SupplierModel extends DataModel {
    id: number;
    supplierName: string;
    contactName?: string;
    contactEmail?: String;
    contactPhone?: String;
    addressLine1?: string;
    addressLine2?: string;
    province?: String;
    websiteUrl?: string;
    imageUrl?: string;
    taxIdentification?: String;
    createdAt: Date;
    updatedAt?: Date;
    StockIn: any;
  }