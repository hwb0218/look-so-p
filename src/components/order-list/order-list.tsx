import { useModalContext } from '@providers/modal';

import { CancelPaymentModal } from '.';

import Wrapper from '@components/common/ui/wrapper';
import { Li, Ul } from '@components/common/ui/list';
import { Button } from '@components/ui/button';

import dateFormat from '@src/utils/date-format';
import numberFormat from '@src/utils/number-format';

import type { OrderList } from '@src/lib/firebase/types';

interface Props {
  orders: OrderList[];
}
export default function OrderList({ orders }: Props) {
  const { openModal } = useModalContext();

  const handleClickCancelButton = (orderId: string, orderListId: string = '') => {
    openModal(<CancelPaymentModal orderId={orderId} orderListId={orderListId} />);
  };

  return (
    <Wrapper className="max-w-5xl pb-20 mx-auto my-0">
      <h2 className="pt-10 pb-1 text-xl">주문/배송 조회</h2>
      <table className="w-full">
        <colgroup>
          <col className="w-1/6" />
          <col />
          <col className="w-1/12" />
          <col className="w-1/6" />
          <col className="w-1/6" />
        </colgroup>
        <thead>
          <tr className="*:p-2 border-t-2 border-b bg-gray-100">
            <th>주문일자</th>
            <th>상품</th>
            <th>수량</th>
            <th>주문금액</th>
            <th>상태</th>
          </tr>
        </thead>
        {orders.map(({ orderItems, id, merchantId, createdAt }) => (
          <tbody key={id}>
            {orderItems?.map((orderItem, i) => {
              const firstItem = i === 0;
              return (
                <tr key={orderItem.id} className="*:p-4 *:border-b *:text-center [&>:not(:first-child)]:border-l">
                  {firstItem && (
                    <td rowSpan={orderItems?.length} className="text-center">
                      <Ul className="flex-col">
                        <Li className="text-sm font-bold">{dateFormat(createdAt?.toDate())}</Li>
                        <Li className="text-sm text-lime-600">{merchantId}</Li>
                      </Ul>
                    </td>
                  )}
                  <td className="border-l">
                    <Wrapper className="flex items-center">
                      <span className="w-[80px] h-[80px]">
                        <img src={orderItem.thumbnail} alt={orderItem.productName} className="w-full h-full" />
                      </span>
                      <span className="ml-4 text-sm">{orderItem.productName}</span>
                    </Wrapper>
                  </td>
                  <td>{orderItem.goodsCount}</td>
                  <td className="text-lime-600">{numberFormat(orderItem.totalPrice)}원</td>
                  <td>
                    <strong className="block mb-1 text-sm">{orderItem.status}</strong>
                    {orderItem.status !== '주문 취소' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleClickCancelButton(id, orderItem?.id)}
                        className="h-8 px-2"
                      >
                        주문 취소
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </Wrapper>
  );
}
