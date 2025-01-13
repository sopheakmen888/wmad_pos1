import DataModel from "./model";

export interface ProductModel extends DataModel {
  id: number;
  nameEn:String;
  nameKh:String;  
  category: string;
  sku:String;
  imageUrl?: string;
}
