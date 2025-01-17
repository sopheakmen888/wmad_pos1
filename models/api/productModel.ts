import DataModel from "./model";

export interface ProductModel extends DataModel {
    id: number;
  nameEn:string;
  nameKh: string;
  categoryNameEn: string;
  categoryNameKh: string;
  imageUrl:string,
  productCode: string;
    
}
