import { QUERY_KEYS } from '@constants/query-keys';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { storeService } from '@src/lib/firebase/StoreService';
import { queryClient } from '@src/main';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export function useGetProductsInfiniteQuery(sellerId: string) {
  const res = useInfiniteQuery({
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
    data: res.data,
    fetchNextPage: res.fetchNextPage,
    hasNextPage: res.hasNextPage,
    isFetchingNextPage: res.isFetchingNextPage,
    isFetched: res.isFetched,
  };
}

type UseInfiniteQueryReturn = ReturnType<typeof useGetProductsInfiniteQuery>;

export function useDeleteProductsMutation() {
  return useMutation({
    mutationFn: ({ productId, sellerId }: { productId: string; sellerId: string }) =>
      storeService.deleteProducts(productId, sellerId),
    onMutate: async ({ productId, sellerId }) => {
      const queryKey = QUERY_KEYS.CONSOLE.PRODUCTS(sellerId);

      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<UseInfiniteQueryReturn['data'] | undefined>(queryKey);

      const prevProducts = prevData?.pages.flatMap((page) => page.products) ?? [];
      const filteredProducts = prevProducts.filter((product) => product.id !== productId);

      queryClient.setQueryData(queryKey, {
        ...prevData,
        pages: [{ ...prevData?.pages[0], products: filteredProducts }],
      });

      return { productId, sellerId, filteredProducts };
    },
    onError: (err, { sellerId }, context) => {
      const queryKey = QUERY_KEYS.CONSOLE.PRODUCTS(sellerId);
      queryClient.setQueryData(queryKey, context?.filteredProducts);
    },
    onSettled: (data, err, { sellerId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId) });
    },
  });
}
