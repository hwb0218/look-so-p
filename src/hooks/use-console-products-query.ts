import { QUERY_KEYS } from '@constants/query-keys';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { storeService } from '@src/lib/firebase/StoreService';
import { queryClient } from '@src/main';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

export function useGetProductsInfiniteQuery({ sellerId, pageLimit }: { sellerId: string; pageLimit?: number }) {
  const res = useInfiniteQuery({
    queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId),
    queryFn: ({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData> }) =>
      storeService.getSellerProducts({ sellerId, pageParam, pageLimit }),
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
  // FIXME: 상위 스코프에서 queryKey 재사용하기
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
      console.error(err);
      const queryKey = QUERY_KEYS.CONSOLE.PRODUCTS(sellerId);
      queryClient.setQueryData(queryKey, context?.filteredProducts);
    },
    onSettled: (_data, _err, { sellerId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId) });
    },
  });
}
