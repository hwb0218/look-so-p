import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { storeService } from '@src/lib/firebase/StoreService';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { queryClient } from '@src/main';

import { QUERY_KEYS } from '@constants/query-keys';

import { Status } from '@src/lib/firebase/types';

export default function useFetchOrderManagementQuery({
  sellerId,
  pageLimit,
}: {
  sellerId: string;
  pageLimit?: number;
}) {
  const res = useInfiniteQuery({
    queryKey: QUERY_KEYS.CONSOLE.ORDER_MANAGEMENT(sellerId),
    queryFn: ({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData> }) =>
      storeService.getOrderManagement({ pageParam, pageLimit }),
    initialPageParam: undefined,
    getNextPageParam: ({ lastVisible }) => lastVisible,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.orders),
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

export function useUpdateOrderManageMentMutation(sellerId: string) {
  const queryKey = QUERY_KEYS.CONSOLE.ORDER_MANAGEMENT(sellerId);

  return useMutation({
    mutationFn: ({ orderId, orderListId, status }: { orderId: string; orderListId: string; status: Status }) =>
      storeService.updateOrderListStatus(orderId, orderListId, status),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
  });
}
