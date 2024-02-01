import { firestore } from '@src/lib/firebase/config';
import { query, getDocs, collection, DocumentData, Timestamp, orderBy } from 'firebase/firestore';

export interface Product extends DocumentData {
  id: string;
  productDescription: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  sellerId: string;
  images: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const getSellerProducts = async ({ sellerId }: { sellerId: string }) => {
  const q = query(collection(firestore, 'console', sellerId, 'products'), orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(q);

  const products: Product[] = [];

  querySnapshot.forEach((doc) => {
    const { id } = doc;
    const data = doc.data() as Product;

    products.push({ ...data, id });
  });

  return products;
};
