import { FirebaseError } from 'firebase/app';

import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';

import { storageService } from '@src/lib/firebase/StorageService';
import { storeService } from '@src/lib/firebase/StoreService';

import { type ProductFormSchema } from '@src/lib/zod/console-product-schema';

import { UpdateConsoleProducts } from '@src/types';

export default function useFetchConsoleProducts() {
  const createConsoleProducts = async (values: ProductFormSchema, id: string) => {
    try {
      const docRef = await storeService.createProducts(values, id);

      const thumbnailDownloadURL = await storageService.uploadThumbnail(
        values.thumbnail,
        `products/${id}/${docRef.id}`,
      );
      const downloadUrls = await storageService.uploadFiles(values.images, `products/${id}/${docRef.id}`);

      if (thumbnailDownloadURL && downloadUrls) {
        await storeService.updateProductsImages(docRef, { thumbnailDownloadURL, downloadUrls });
      }

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(id) });
    } catch (err) {
      if (err instanceof FirebaseError) console.error(err);
    }
  };

  const updateConsoleProducts = async (values: UpdateConsoleProducts, sellerId: string, productId: string) => {
    try {
      const thumbnailDownloadURL = await storageService.uploadThumbnail(
        values.thumbnail as FileList,
        `products/${sellerId}/${productId}`,
      );

      const downloadUrls = await storageService.uploadFiles(
        values.images as FileList,
        `products/${sellerId}/${productId}`,
      );

      await storeService.updateProducts(values, {
        sellerId,
        productId,
        ...(thumbnailDownloadURL && { thumbnailDownloadURL }),
        ...(downloadUrls && { downloadUrls }),
      });

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId) });
    } catch (err) {
      if (err instanceof FirebaseError) console.error(err);
    }
  };

  return {
    createConsoleProducts,
    updateConsoleProducts,
  };
}
