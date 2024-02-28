import { FirebaseError } from 'firebase/app';

import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';

import { storageService } from '@src/lib/firebase/StorageService';
import { storeService } from '@src/lib/firebase/StoreService';

import { type ProductFormSchema } from '@src/lib/zod/console-product-schema';

import { UpdateConsoleProducts } from '@src/types';

export default function useFetchConsoleProducts() {
  const createConsoleProducts = async (values: ProductFormSchema, sellerId: string) => {
    try {
      const docRef = await storeService.createProducts(values, sellerId);

      const thumbnailDownloadURL = await storageService.uploadThumbnail(
        values.thumbnail,
        `products/${sellerId}/${docRef.id}`,
      );
      const downloadUrls = await storageService.uploadFiles(values.images, `products/${sellerId}/${docRef.id}`);

      if (thumbnailDownloadURL && downloadUrls) {
        await storeService.updateProductsImages(docRef, { thumbnailDownloadURL, downloadUrls });
      }

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId) });

      return Promise.resolve();
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      } else {
        console.error(err);
      }
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

      const { imagesToBeUpdated, thumbnailToBeUpdated } = await storeService.updateProducts(values, {
        productId,
        ...(thumbnailDownloadURL && { thumbnailDownloadURL }),
        ...(downloadUrls && { downloadUrls }),
      });

      await storageService.deleteFiles([...imagesToBeUpdated, ...thumbnailToBeUpdated] as string[]);
      // FIXME: 추후 낙관적 업데이트로 수정
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId) });

      return '상품 추가 완료';
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  };

  return {
    createConsoleProducts,
    updateConsoleProducts,
  };
}
