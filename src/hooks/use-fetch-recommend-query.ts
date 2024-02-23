import { useSuspenseQuery } from '@tanstack/react-query';

import { storeService } from '@src/lib/firebase/StoreService';

import { QUERY_KEYS } from '@constants/query-keys';

export default function useFetchRecommend(category: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.GOODS.RECOMMEND(category),
    queryFn: () => storeService.getRecommend(category),
  });
}
