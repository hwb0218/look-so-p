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
    const limitNum = 10;
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

  async createProducts(values: CreateProductsValues) {
    if (auth.currentUser?.uid) {
      const { uid } = auth.currentUser;

      const collectionRef = collection(firestore, `console/${uid}/products`);
      await addDoc(collectionRef, {
        ...values,
        sellerId: uid,
        thumbnailUrl: values.images[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }

  async deleteProducts(productId: string, sellerId: string) {
    const confirm = window.confirm('정말로 삭제하겠습니까?');

    if (confirm && sellerId) {
      const documentRef = doc(firestore, 'console', sellerId, 'products', productId);
      await deleteDoc(documentRef);
    }
  }
}

export const storeService = new StoreService();
