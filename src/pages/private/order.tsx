import { Meta } from '@components/common/meta';
import { OrderForm } from '@components/order-form';
import { AUTH_ROUTE_PATHS } from '@constants/routes';

export default function OrderPage() {
  return (
    <>
      <Meta title="주문/결제 - LookSoPrt" url={AUTH_ROUTE_PATHS.ORDER} desc="주문/결제" />
      <OrderForm />
    </>
  );
}
