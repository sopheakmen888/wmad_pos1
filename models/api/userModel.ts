import DataModel from "./model";

export interface UserModel extends DataModel {
  id: number;
  username: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  role: string;
}

export interface UserApiResModel extends UserModel {
  roleId: number;
}

export interface UserApiReqModel {
  email: string;
  username: string;
  password: string;
  roleId: number;
  isActive: boolean;
  imageUrl?: string | null;
}
