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
  productPrice: number;
  productQuantity: number;
  productCategory: string;
  sellerId: string;
  images: string[];
  thumbnail: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface User extends DocumentData {
  email: string;
  isSeller: boolean;
  nickname: string;
  profile: string[];
  uid: string;
}

export interface CartGoods extends Product {
  goodsCount: number;
}
