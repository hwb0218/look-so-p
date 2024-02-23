import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@constants/query-keys';
import { storeService } from '@src/lib/firebase/StoreService';

export default function useFetchGoodsByIdQuery(productId: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.GOODS.BY_ID(productId),
    queryFn: () => storeService.getGoodsById(productId),
  });
}
