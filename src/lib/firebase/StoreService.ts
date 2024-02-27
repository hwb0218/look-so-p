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
  setDoc,
} from 'firebase/firestore';
import { db } from './config';

import { getLocalStorage, setLocalStorage } from '@src/utils/local-storage';
import extractPathFromUrl from '@src/utils/extract-path-from-url';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

import { type CartGoods, type Product, type Order, type OrderList, Status } from './types';
import type { ProductFormSchema } from '../zod/console-product-schema';
import type { UpdateConsoleProducts } from '@src/types';

class StoreService {
  async getSellerProducts({
    sellerId,
    pageParam,
    pageLimit = 10,
  }: {
    sellerId: string;
    pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pageLimit?: number;
  }) {
    const collectionRef = collection(db, 'products');
    const q = query(
      collectionRef,
      where('sellerId', '==', sellerId),
      orderBy('updatedAt', 'desc'),
      limit(pageLimit),
      ...(pageParam ? [startAfter(pageParam)] : []),
    );
    const docSnapshot = await getDocs(q);

    const lastVisible = docSnapshot.size >= pageLimit ? docSnapshot.docs[docSnapshot.docs.length - 1] : undefined;

    const products = docSnapshot.docs.map((doc) => {
      const { id } = doc;
      const data = doc.data();
      return { ...data, id } as Product;
    });

    return { products, lastVisible };
  }

  async createProducts(values: ProductFormSchema, sellerId: string) {
    const productValues = {
      productName: values.productName,
      productQuantity: Number(values.productQuantity),
      productPrice: Number(values.productPrice),
      productDescription: values.productDescription,
      productCategory: values.productCategory,
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

  async getAllGoods(categories: typeof GOODS_CATEGORIES, limitNum: number = 4) {
    const getCategoryDocs = async (category: string) => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('productCategory', '==', category), limit(limitNum));

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

  async getGoodsById(productId: string) {
    const docRef = doc(db, 'products', productId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const { id } = docSnapshot;
      const data = docSnapshot.data() as Product;

      return { ...data, id };
    }
  }

  async getAllGoodsByCategory(
    category: string,
    { pageParam, limitNum = 8 }: { pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData>; limitNum?: number },
  ) {
    const collectionRef = collection(db, 'products');
    const q = query(
      collectionRef,
      where('productCategory', '==', category),
      orderBy('updatedAt', 'desc'),
      limit(limitNum),
      ...(pageParam ? [startAfter(pageParam)] : []),
    );

    const docSnapshot = await getDocs(q);

    const lastVisible = docSnapshot.size >= limitNum ? docSnapshot.docs[docSnapshot.docs.length - 1] : undefined;

    const products = docSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Product;
    });

    return { products, lastVisible };
  }

  async getRecommend(category: string) {
    const collectionRef = collection(db, 'products');
    const q = query(collectionRef, where('productCategory', '==', category), limit(20));

    const docSnapshot = await getDocs(q);
    const { docs } = docSnapshot;

    const shuffledDocs = docs.sort(() => Math.random() - 0.5).slice(0, 10);

    const recommend = shuffledDocs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Product;
    });

    return recommend;
  }

  async getCart(uid: string) {
    const q = query(collection(db, 'users', uid, 'cart'), orderBy('updatedAt', 'desc'));

    const cartSnapshot = await getDocs(q);

    const cart = cartSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as CartGoods;
    });

    setLocalStorage({ key: 'cart', value: cart });

    return cart;
  }

  async deleteGoodsToCart(checkedGoods: CartGoods[], uid: string) {
    const goodsToCartUpdator = async (cartGoods: CartGoods) => {
      const { id } = cartGoods;
      const cartRef = doc(db, 'users', uid, 'cart', id);

      await deleteDoc(cartRef);
    };

    const promises = checkedGoods.map(goodsToCartUpdator);

    await Promise.all(promises);
  }

  async addGoodsToCart(goods: CartGoods, uid: string) {
    const cartRef = doc(collection(db, 'users', uid, 'cart'));

    const values = {
      ...goods,
      totalPrice: goods.productPrice * goods.goodsCount,
      updatedAt: serverTimestamp(),
    };

    await setDoc(cartRef, values);

    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      const data = cartSnapshot.data() as CartGoods;
      const { id } = cartSnapshot;

      return { ...data, id };
    }
  }

  async deleteGoodsToCartById(cartGoodsId: string, uid: string) {
    const cartRef = doc(db, 'users', uid, 'cart', cartGoodsId);

    await deleteDoc(cartRef);
  }

  async changeGoodsCountFromCart(cartGoods: CartGoods, uid: string, goodsCount: number) {
    const { id } = cartGoods;

    const cartRef = doc(db, 'users', uid, 'cart', id);

    await updateDoc(cartRef, {
      goodsCount,
      totalPrice: cartGoods.productPrice * goodsCount,
    });

    const cart = getLocalStorage({ key: 'cart' }) as CartGoods[];

    const updatedCartGoods = cart.map((cartGoods) => (cartGoods.id === id ? { ...cartGoods, goodsCount } : cartGoods));
    setLocalStorage({ key: 'cart', value: updatedCartGoods });

    return updatedCartGoods;
  }

  async updateProductQuantity(checkedGoods: CartGoods[]) {
    const productQuantityUpdater = async (cartGoods: CartGoods) => {
      const { productId, goodsCount } = cartGoods;

      const productRef = doc(db, 'products', productId);

      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        const { productQuantity } = productSnapshot.data() as Product;

        await updateDoc(productRef, {
          productQuantity: productQuantity - goodsCount,
        });
      }
    };

    const promises = checkedGoods.map(productQuantityUpdater);

    await Promise.all(promises);
  }

  async rollbackProductQuantity(checkedGoods: CartGoods[]) {
    const productQuantityUpdater = async (cartGoods: CartGoods) => {
      const { productId, goodsCount } = cartGoods;

      const productRef = doc(db, 'products', productId);

      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        const { productQuantity } = productSnapshot.data() as Product;

        await updateDoc(productRef, {
          productQuantity: productQuantity + goodsCount,
        });
      }
    };

    const promises = checkedGoods.map(productQuantityUpdater);

    await Promise.all(promises);
  }

  async createOrder(values: Order) {
    const { orderItems } = values;

    const newOrderItems = orderItems?.map((orderItem) => ({
      id: orderItem.id,
      productId: orderItem.productId,
      productName: orderItem.productName,
      productPrice: orderItem.productPrice,
      goodsCount: orderItem.goodsCount,
      totalPrice: orderItem.totalPrice,
      thumbnail: orderItem.thumbnail,
      status: Status.CONFIRM,
    }));

    const orderValues = {
      ...values,
      orderItems: newOrderItems,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const orderRef = doc(collection(db, 'orders'));

    await setDoc(orderRef, orderValues);
  }

  async getOrderList(uid: string) {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('uid', '==', uid), orderBy('updatedAt', 'desc'));

    const docSnapshot = await getDocs(q);

    const orders = docSnapshot.docs.map((doc) => {
      const { id } = doc;
      const data = doc.data() as OrderList;

      return { ...data, id };
    });

    return orders;
  }

  async updateOrderListStatus(orderId: string, orderListId: string, status: Status) {
    const orderRef = doc(db, 'orders', orderId);

    const orderSnapshot = await getDoc(orderRef);

    if (orderSnapshot.exists()) {
      const { orderItems } = orderSnapshot.data() as OrderList;

      const newOrderItems = orderItems?.map((orderItem) =>
        orderItem.id === orderListId ? { ...orderItem, status } : orderItem,
      );

      await updateDoc(orderRef, {
        orderItems: newOrderItems,
      });
    }
  }

  async getOrderManagement({
    pageParam,
    pageLimit = 10,
  }: {
    pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pageLimit?: number;
  }) {
    const collectionRef = collection(db, 'orders');
    const q = query(
      collectionRef,
      orderBy('updatedAt', 'desc'),
      limit(pageLimit),
      ...(pageParam ? [startAfter(pageParam)] : []),
    );
    const docSnapshot = await getDocs(q);

    const lastVisible = docSnapshot.size >= pageLimit ? docSnapshot.docs[docSnapshot.docs.length - 1] : undefined;

    const orders = docSnapshot.docs.map((doc) => {
      const { id } = doc;
      const data = doc.data();
      return { ...data, id } as OrderList;
    });

    return { orders, lastVisible };
  }

  async getAllSearchGoods() {
    const collectionRef = collection(db, 'products');
    const docSnapshot = await getDocs(collectionRef);

    const goods = docSnapshot.docs.map((doc) => {
      const { id } = doc;
      const data = doc.data();
      return { ...data, id } as Product;
    });

    return goods;
  }
}

export const storeService = new StoreService();
