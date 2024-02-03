import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  orderBy,
  getDocs,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { auth, firestore } from './config';

import type { CreateProductsValues, Product } from './types';

class StoreService {
  async getSellerProducts({
    sellerId,
    pageParam,
  }: {
    sellerId: string;
    pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }) {
    const limitNum = 5;
    const products: Product[] = [];

    const collectionRef = collection(firestore, 'console', sellerId, 'products');
    const q = query(
      collectionRef,
      orderBy('updatedAt', 'desc'),
      limit(limitNum),
      ...(pageParam ? [startAfter(pageParam)] : []),
    );
    const documentSnapshots = await getDocs(q);

    const lastVisible =
      documentSnapshots.size >= limitNum ? documentSnapshots.docs[documentSnapshots.docs.length - 1] : undefined;

    documentSnapshots.forEach((doc) => {
      const { id } = doc;
      const data = doc.data() as Product;
      products.push({ ...data, id });
    });

    return { products, lastVisible };
  }

  async createProducts(values: CreateProductsValues, sellerId: string) {
    const collectionRef = collection(firestore, `console/${sellerId}/products`);
    await addDoc(collectionRef, {
      ...values,
      sellerId: sellerId,
      thumbnailUrl: values.images[0],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async deleteProducts(productId: string, sellerId: string) {
    if (sellerId) {
      const documentRef = doc(firestore, 'console', sellerId, 'products', productId);
      await deleteDoc(documentRef);
    }
  }
}

export const storeService = new StoreService();
