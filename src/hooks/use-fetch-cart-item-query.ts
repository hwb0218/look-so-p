import { storeService } from '@src/lib/firebase/StoreService';

import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@providers/index';

import { QUERY_KEYS } from '@constants/query-keys';

import type { CartGoods } from '@src/lib/firebase/types';

export default function useAddGoodsToCartQuery() {
  const queryKey = QUERY_KEYS.AUTH.CART();

  return useMutation({
    mutationFn: ({ goods, uid }: { goods: CartGoods; uid: string }) => storeService.addGoodsToCart(goods, uid),
    onMutate: async ({ goods }) => {
      await queryClient.cancelQueries({ queryKey });
      const prevCartItem = queryClient.getQueryData<CartGoods[]>(queryKey) ?? [];
      queryClient.setQueryData(queryKey, [...prevCartItem, goods]);

      return { prevCartItem };
    },
    onSuccess: async (goods) => {
      await queryClient.cancelQueries({ queryKey });
      const prevCartItem = queryClient.getQueryData<CartGoods[]>(queryKey) ?? [];
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
