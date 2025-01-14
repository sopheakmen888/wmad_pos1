import DataModel from "./model";

export interface ProductModel extends DataModel {
    id: number;
  nameEn:string;
  nameKh: string;
  categoryNameEn: string;
  categoryNameKh: string;
  sku: string;
  imageUrl:string,
    
}
