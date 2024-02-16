import { useMutation } from '@tanstack/react-query';

import { storeService } from '@src/lib/firebase/StoreService';
import { Product } from '@src/lib/firebase/types';
import { QUERY_KEYS } from '@constants/query-keys';
import { queryClient } from '@src/main';

export default function useAddGoodsToCartQuery() {
  const queryKey = QUERY_KEYS.AUTH.CART();

  return useMutation({
    mutationFn: ({ goods, uid }: { goods: Product; uid: string }) => storeService.addGoodsToCart(goods, uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const prevCartItem = queryClient.getQueryData<Product[]>(queryKey) ?? [];

      return { prevCartItem };
    },
    onSuccess: async (goods) => {
      await queryClient.cancelQueries({ queryKey });
      const prevCartItem = queryClient.getQueryData<Product[]>(queryKey) ?? [];
      queryClient.setQueryData(queryKey, [...prevCartItem, goods]);
    },
    onError: (err, _, context) => {
      console.error(err);
      queryClient.setQueryData(queryKey, context?.prevCartItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
