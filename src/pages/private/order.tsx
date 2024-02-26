import { Meta } from '@components/common/meta';
import Spinner from '@components/common/spinner/spinner';
import { OrderForm } from '@components/order-form';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';

import { AUTH_ROUTE_PATHS } from '@constants/routes';

function Order() {
  return (
    <>
      <Meta title="주문/결제 - LookSoPrt" url={AUTH_ROUTE_PATHS.ORDER} desc="주문/결제" />
      <OrderForm />
    </>
  );
}

const OrderPage = WithQueryAsyncBoundary(Order, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default OrderPage;
