import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { firestore } from './config';

import type { Product } from './types';
import type { ProductFormSchema } from '../zod/console-product-schema';

import extractPathFromUrl from '@src/utils/extract-path-from-url';

import type { UpdateConsoleProducts } from '@src/types';

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

  async createProducts(values: ProductFormSchema, sellerId: string) {
    const productValues = {
      productName: values.productName,
      productQuantity: values.productQuantity,
      productPrice: values.productPrice,
      productDescription: values.productDescription,
    };

    const collectionRef = collection(firestore, `console/${sellerId}/products`);
    const docRef = await addDoc(collectionRef, {
      ...productValues,
      sellerId: sellerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef;
  }

  async updateProductsImages(
    docRef: DocumentReference<DocumentData, DocumentData>,
    {
      thumbnailDownloadURL,
      downloadUrls,
    }: {
      thumbnailDownloadURL: string;
      downloadUrls: string[];
    },
  ) {
    await updateDoc(docRef, {
      thumbnail: thumbnailDownloadURL,
      images: downloadUrls,
    });
  }

  async updateProducts(
    values: UpdateConsoleProducts,
    {
      sellerId,
      productId,
      thumbnailDownloadURL = '',
      downloadUrls = [],
    }: { sellerId: string; productId: string; thumbnailDownloadURL?: string; downloadUrls?: string[] },
  ) {
    const updateProductsValues = {
      productName: values.productName,
      productQuantity: values.productQuantity,
      productPrice: values.productPrice,
      productDescription: values.productDescription,
    };

    const docRef = doc(firestore, `console/${sellerId}/products/${productId}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const { imagesToBeUpdated } = values;

      const { thumbnail, images } = docSnapshot.data() as Product;

      const extractedThumbnailPath = extractPathFromUrl(thumbnail);
      const newThumbnauilPath = extractedThumbnailPath !== thumbnailDownloadURL && thumbnailDownloadURL;

      const filteredImagesPath = images.filter((image) => {
        if (image) {
          const extractedImagesPath = extractPathFromUrl(image) ?? '';
          return !imagesToBeUpdated.images.includes(extractedImagesPath);
        }
      });

      const newImagesPath = [...filteredImagesPath, ...downloadUrls];

      await updateDoc(docRef, {
        ...updateProductsValues,
        ...(newThumbnauilPath && { thumbnail: newThumbnauilPath }),
        ...(newImagesPath.length && { images: newImagesPath }),
        updatedAt: serverTimestamp(),
      });
    }
  }

  async deleteProducts(productId: string, sellerId: string) {
    if (sellerId) {
      const docRef = doc(firestore, 'console', sellerId, 'products', productId);

      await deleteDoc(docRef);
    }
  }
}

export const storeService = new StoreService();
