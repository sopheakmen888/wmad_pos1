import DataModel from "./model";

export interface ProductModel extends DataModel {
  id: number;
  nameEn: string;
  nameKh: string;
  category: string;
  sku: string;
  imageUrl: string;
}

