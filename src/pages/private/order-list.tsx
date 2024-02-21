import { useFetchOrderListQuery } from '@hooks/use-fetch-order-list-query';

import { OrderList } from '@components/order-list';

import { getLocalStorage } from '@src/utils/local-storage';

import { User } from '@src/lib/firebase/types';

export default function OrderListPage() {
  const { uid } = getLocalStorage({ key: 'auth' }) as User;

  const { data: orders } = useFetchOrderListQuery(uid);

  if (!Array.isArray(orders)) {
    return null;
  }

  return <OrderList orders={orders} />;
}
