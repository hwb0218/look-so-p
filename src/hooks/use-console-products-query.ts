import { QUERY_KEYS } from '@constants/query-keys';
import { useMutation, useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { storeService } from '@src/lib/firebase/StoreService';
import { queryClient } from '@src/main';
import { Product } from '@src/lib/firebase/types';

export function useGetConsoleProducts(sellerId: string) {
  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId),
    queryFn: () => storeService.getSellerProducts({ sellerId }),
  });

  return {
    products: products ?? [],
  };
}

export function useGetProductsSuspenseInfiniteQuery(sellerId: string) {
  const { data: products } = useSuspenseInfiniteQuery({
    queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId),
    queryFn: ({ pageParam = '' }) => storeService.getSellerProducts(sellerId),
    initialPageParam: '',
    getNextPageParam: (lastPage) => {},
  });

  return {
    products: products ?? [],
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
