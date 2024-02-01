import { QUERY_KEYS } from '@constants/query-keys';
import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { storeService } from '@src/lib/firebase/StoreService';
import { queryClient } from '@src/main';
import { Product } from '@src/lib/firebase/types';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export function useGetConsoleProducts(sellerId: string) {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId),
    queryFn: () => storeService.getSellerProducts({ sellerId }),
  });

  return {
    products: data ?? [],
  };
}

export function useGetProductsInfiniteQuery(sellerId: string) {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId),
    queryFn: ({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData> }) =>
      storeService.getSellerProducts({ sellerId, pageParam }),
    initialPageParam: undefined,
    getNextPageParam: ({ lastVisible }) => lastVisible,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.products),
      pageParams: data.pageParams,
    }),
  });

  return {
    products: products?.pages ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export function useDeleteProductsMutation() {
  return useMutation({
    mutationFn: ({ productId, sellerId }: { productId: string; sellerId: string }) =>
      storeService.deleteProducts(productId, sellerId),
    onMutate: async ({ productId, sellerId }) => {
      const queryKey = QUERY_KEYS.CONSOLE.PRODUCTS(sellerId);

      await queryClient.cancelQueries({ queryKey });
      const prevProducts = queryClient.getQueryData(queryKey) as Product[];
      const filteredProducts = prevProducts?.filter((product) => product.id !== productId);

      queryClient.setQueryData(queryKey, filteredProducts);

      return { productId, sellerId, filteredProducts };
    },
    onError: (_, { sellerId }, context) => {
      const queryKey = QUERY_KEYS.CONSOLE.PRODUCTS(sellerId);
      queryClient.setQueryData(queryKey, context?.filteredProducts);
    },
    onSettled: (data, err, { sellerId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId) });
    },
  });
}
