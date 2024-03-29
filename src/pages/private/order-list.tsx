import { useFetchOrderListQuery } from '@hooks/use-fetch-order-list-query';

import { Meta } from '@components/common/meta';
import { OrderList as OrderListComponent } from '@components/order-list';

import { getLocalStorage } from '@src/utils/local-storage';

import { AUTH_ROUTE_PATHS } from '@constants/routes';

import { User } from '@src/lib/firebase/types';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import Spinner from '@components/common/spinner/spinner';

function OrderList() {
  const { uid } = getLocalStorage({ key: 'auth' }) as User;

  const { data: orders } = useFetchOrderListQuery(uid);

  if (!Array.isArray(orders)) {
    return null;
  }

  return (
    <>
      <Meta title="주문/배송 조회 - LookSoPrt" url={AUTH_ROUTE_PATHS.ORDER_LIST} desc="주문/배송 조회" />
      <OrderListComponent orders={orders} />
    </>
  );
}

const OrderListPage = WithQueryAsyncBoundary(OrderList, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default OrderListPage;
