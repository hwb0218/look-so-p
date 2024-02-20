import { OrderList } from '@components/order-list';
import { useAuthContext } from '@providers/auth';

export default function OrderListPage() {
  const { state } = useAuthContext();
  const { auth } = state;

  return <OrderList />;
}
