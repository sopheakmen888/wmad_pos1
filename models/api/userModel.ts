export interface UserModel {
  id: number;
  username: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  role: string;
}
