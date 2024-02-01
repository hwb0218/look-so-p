import { DocumentData, Timestamp } from 'firebase/firestore';

export interface CreateUserValues {
  profile: string[];
  email: string;
  password: string;
  nickname: string;
  checkPassword?: string | undefined;
  isSeller?: boolean | undefined;
}

export interface CreateProductsValues {
  productName: string;
  productQuantity: string;
  productPrice: string;
  productDescription?: string | undefined;
  images: string[];
}

export interface Product extends DocumentData {
  id: string;
  productDescription: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  sellerId: string;
  images: string[];
  thumbnailUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
