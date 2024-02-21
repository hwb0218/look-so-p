import { useMutation, useQuery } from '@tanstack/react-query';
import { storeService } from '@src/lib/firebase/StoreService';

import { queryClient } from '@src/main';

import { QUERY_KEYS } from '@constants/query-keys';

import { Status, type OrderList } from '@src/lib/firebase/types';

export function useFetchOrderListQuery(uid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.ORDERS(),
    queryFn: () => storeService.getOrderList(uid),
  });
}

export function useCancelOrderListQuery() {
  const queryKey = QUERY_KEYS.AUTH.ORDERS();

  return useMutation({
    mutationFn: ({ orderId, orderListId }: { orderId: string; orderListId: string }) =>
      storeService.cancelOrderList(orderId, orderListId),
    onMutate: async ({ orderId, orderListId }) => {
      await queryClient.cancelQueries({ queryKey });
      const prevOrderList = queryClient.getQueryData<OrderList[]>(queryKey);
      const [filteredOrders] = prevOrderList?.filter((order) => order.id === orderId) as OrderList[];

      const mapedOrders = filteredOrders.orderItems?.map((orderItem) =>
        orderItem.id === orderListId ? { ...orderItem, status: Status.CANCELED } : orderItem,
      );

      const updatedOrder = {
        ...filteredOrders,
        orderItems: mapedOrders,
      };

      const newOrders = prevOrderList?.map((orderItem) => (orderItem.id === orderId ? updatedOrder : orderItem));

      await queryClient.setQueryData<OrderList[]>(queryKey, newOrders);
    },
  });
}
