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
  where,
} from 'firebase/firestore';
import { db } from './config';

import extractPathFromUrl from '@src/utils/extract-path-from-url';

import type { Product } from './types';
import type { ProductFormSchema } from '../zod/console-product-schema';
import type { UpdateConsoleProducts } from '@src/types';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

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

    const collectionRef = collection(db, 'products');
    const q = query(
      collectionRef,
      where('sellerId', '==', sellerId),
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
      productQuantity: Number(values.productQuantity),
      productPrice: Number(values.productPrice),
      productDescription: values.productDescription,
    };

    const collectionRef = collection(db, `products`);
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
    { thumbnailDownloadURL, downloadUrls }: { thumbnailDownloadURL: string; downloadUrls: string[] },
  ) {
    await updateDoc(docRef, {
      thumbnail: thumbnailDownloadURL,
      images: downloadUrls,
    });
  }

  async updateProducts(
    values: UpdateConsoleProducts,
    {
      productId,
      thumbnailDownloadURL = '',
      downloadUrls = [],
    }: { productId: string; thumbnailDownloadURL?: string; downloadUrls?: string[] },
  ) {
    const updateProductsValues = {
      productName: values.productName,
      productQuantity: values.productQuantity,
      productPrice: values.productPrice,
      productDescription: values.productDescription,
      productCategory: values.productCategory,
    };

    const docRef = doc(db, `products/${productId}`);
    const docSnapshot = await getDoc(docRef);

    const { images: imagesToBeUpdated, thumbnail: thumbnailToBeUpdated } = values.imagesToBeUpdated;

    if (docSnapshot.exists()) {
      const { thumbnail, images } = docSnapshot.data() as Product;

      const extractedThumbnailPath = extractPathFromUrl(thumbnail);
      const newThumbnailPath = extractedThumbnailPath !== thumbnailDownloadURL && thumbnailDownloadURL;

      const filteredImagesPath = images.filter((image) => {
        if (image) {
          const extractedImagesPath = extractPathFromUrl(image) ?? '';
          return !imagesToBeUpdated.includes(extractedImagesPath);
        }
      });

      const newImagesPath = [...filteredImagesPath, ...downloadUrls];
      await updateDoc(docRef, {
        ...updateProductsValues,
        updatedAt: serverTimestamp(),
        ...(newThumbnailPath && { thumbnail: newThumbnailPath }),
        ...(newImagesPath.length && { images: newImagesPath }),
      });
    }

    return {
      imagesToBeUpdated,
      thumbnailToBeUpdated: thumbnailToBeUpdated === '' ? [] : [thumbnailToBeUpdated],
    };
  }

  async deleteProducts(productId: string, sellerId: string) {
    if (sellerId) {
      const docRef = doc(db, 'products', productId);

      await deleteDoc(docRef);
    }
  }

  async getAllGoods(categories: typeof GOODS_CATEGORIES) {
    const getCategoryDocs = async (category: string) => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('productCategory', '==', category), limit(4));

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return docs;
    };

    const promises = categories.map(async ({ value }) => {
      const docs = await getCategoryDocs(value);
      return { [value]: docs };
    });

    const categoryDocsArray = await Promise.all(promises);

    const allCategoryDocs = Object.assign({}, ...categoryDocsArray);

    return allCategoryDocs as {
      [category: string]: Product[];
    };
  }
}

export const storeService = new StoreService();
