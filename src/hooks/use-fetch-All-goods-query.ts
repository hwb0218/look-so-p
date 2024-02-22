import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@constants/query-keys';
import { storeService } from '@src/lib/firebase/StoreService';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

export default function useFetchAllGoodsQuery(categories: typeof GOODS_CATEGORIES) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.GOODS.MAIN(),
    queryFn: () => storeService.getAllGoods(categories),
  });
}
