import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from './config';
import type { CreateProductsValues } from './types';

class StoreService {
  async createProducts(values: CreateProductsValues) {
    if (auth.currentUser?.uid) {
      const { uid } = auth.currentUser;

      const collectionRef = collection(firestore, `console/${uid}/products`);
      await addDoc(collectionRef, {
        ...values,
        sellerId: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }
}

export const storeService = new StoreService();
