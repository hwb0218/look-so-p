import { DocumentData, Timestamp } from 'firebase/firestore';
import { OrderFormSchema } from '../zod/order-schema';

export interface CreateUserValues {
  profile: string[];
  email: string;
  password: string;
  nickname: string;
  checkPassword?: string | undefined;
  isSeller?: boolean | undefined;
}

interface Time {
  seconds: number;
  nanoseconds: number;
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
  createdAt: Timestamp | Time;
  updatedAt: Timestamp | Time;
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
  totalPrice: number;
  productId: string;
}

export enum Status {
  CONFIRM = '구매 확인',
  PROCESSED = '발송 대기',
  SHIPPED = '발송 시작',
  CANCELED = '주문 취소',
  COMPLETED = '판매 완료',
}

export type Purchases = Partial<CartGoods> & {
  status?: Status;
};

export type Order = Partial<{
  uid: string;
  orderItems: Purchases[];
  totalPrice: number;
  merchantId: string;
  transactionId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}> &
  OrderFormSchema;

export interface OrderList extends Order {
  id: string;
}
