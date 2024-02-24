import { useState } from 'react';

import { useUpdateOrderManageMentMutation } from '@hooks/use-fetch-order-management-query';

import { Li, Ul } from '@components/common/ui/list';
import Wrapper from '@components/common/ui/wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

import dateFormat from '@src/utils/date-format';
import numberFormat from '@src/utils/number-format';

import { Status, type OrderList } from '@src/lib/firebase/types';

interface Props {
  orders: OrderList[];
  sellerId: string;
}

export default function ConsoleOrderManagement({ orders, sellerId }: Props) {
  const [statusSelectView, setStatusSelectView] = useState('');

  const { mutate } = useUpdateOrderManageMentMutation(sellerId);

  const handleChange = (status: Status, orderId: string, orderListId: string = '') => {
    mutate({ orderId, orderListId, status });
    setStatusSelectView('');
  };

  const handleClickStatusSelectView = (orderListId: string = '') => {
    if (statusSelectView !== '') {
      setStatusSelectView('');
    } else {
      setStatusSelectView(orderListId);
    }
  };

  return (
    <Wrapper className="flex-col items-start space-y-4">
      <h1 className="px-4 text-2xl font-bold">주문 관리</h1>
      <table className="w-full">
        <colgroup>
          <col className="w-1/6" />
          <col />
          <col className="w-1/12" />
          <col className="w-[10%]" />
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
        {orders?.map(({ orderItems, id, merchantId, createdAt, uid }) => (
          <tbody key={id}>
            {orderItems?.map((orderItem, i) => {
              const firstItem = i === 0;
              return (
                <tr key={orderItem.id} className="*:p-4 *:border-b *:text-center [&>:not(:first-child)]:border-l">
                  {firstItem && (
                    <td rowSpan={orderItems?.length} className="text-center">
                      <Ul className="flex-col text-sm">
                        <Li className="font-bold">{dateFormat(createdAt?.toDate())}</Li>
                        <Li className="text-lime-600">{merchantId}</Li>
                        <Li>{`uid: ${uid}`}</Li>
                      </Ul>
                    </td>
                  )}
                  <td className="max-w-[110px] border-l">
                    <Wrapper className="flex items-center">
                      <span className="w-[80px] h-[80px] min-w-[80px] min-h-[80px]">
                        <img src={orderItem.thumbnail} alt={orderItem.productName} className="w-full h-full" />
                      </span>
                      <span className="ml-4 text-sm truncate">{orderItem.productName}</span>
                    </Wrapper>
                  </td>
                  <td>{orderItem.goodsCount}</td>
                  <td className="text-lime-600">{numberFormat(orderItem.totalPrice)}원</td>
                  <td className="h-full">
                    <strong
                      className="inline-block p-2 text-sm cursor-pointer"
                      onClick={() => handleClickStatusSelectView(orderItem.id)}
                    >
                      {orderItem.status}
                    </strong>
                    {statusSelectView === orderItem.id && (
                      <Select
                        defaultValue={orderItem.status}
                        onValueChange={(value: Status) => handleChange(value, id, orderItem.id)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>{orderItem.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="min-w-[100px] z-[1000000]">
                          {Object.entries(Status).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
