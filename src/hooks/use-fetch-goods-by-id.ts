import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@constants/query-keys';
import { storeService } from '@src/lib/firebase/StoreService';

export default function useFetchGoodsById(productId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GOODS.BY_ID(productId),
    queryFn: () => storeService.getGoodsById(productId),
  });
}
