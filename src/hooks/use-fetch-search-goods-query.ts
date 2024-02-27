import { QUERY_KEYS } from '@constants/query-keys';
import { storeService } from '@src/lib/firebase/StoreService';
import { useQuery } from '@tanstack/react-query';

export default function useFetchSearchGoodsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.GOODS.SEARCH(),
    queryFn: () => storeService.getAllSearchGoods(),
  });
}
