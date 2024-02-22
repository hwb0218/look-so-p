import { Ul } from '@components/common/list';

import { type OrderList } from '@src/lib/firebase/types';

interface Props {
  orders: OrderList[];
}

export default function ConsoleOrderManagement({ orders }: Props) {
  console.log(orders);

  return (
    <Ul className="flex-col items-start space-y-4">
      <h1 className="px-4 text-2xl font-bold">주문 관리</h1>
    </Ul>
  );
}
