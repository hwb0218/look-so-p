import { DocumentData, Timestamp } from 'firebase/firestore';

export interface CreateUserValues {
  profile: string[];
  email: string;
  password: string;
  nickname: string;
  checkPassword?: string | undefined;
  isSeller?: boolean | undefined;
}

export interface Product extends DocumentData {
  id: string;
  productDescription: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  productCategory: string;
  sellerId: string;
  images: string[];
  thumbnail: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
