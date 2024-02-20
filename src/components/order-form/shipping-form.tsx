import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { OrderFormSchema, orderFormSchema } from '@src/lib/zod/order-schema';

import { useAuthContext } from '@providers/auth';
import usePayment from '@hooks/use-payment';

import Wrapper from '@components/common/wrapper';
import { Button } from '@components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import AddressSearch from './address-search';

import { storeService } from '@src/lib/firebase/StoreService';

import calcTotalPrice from '@src/utils/calc-total-price';

import { type CartGoods, type Order } from '@src/lib/firebase/types';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE_PATHS } from '@constants/routes';

interface Props {
  checkedGoods: CartGoods[];
  setCart: React.Dispatch<React.SetStateAction<CartGoods[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function ShippingForm({ checkedGoods, setCart, setTotalPrice }: Props) {
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);

  const { state } = useAuthContext();
  const { auth } = state;

  const { requestPayment } = usePayment(checkedGoods);

  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: '',
      roadAddress: '',
      jibunAddress: '',
      address2: '',
      postalCode: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (values: OrderFormSchema) => {
    try {
      const result = await requestPayment();

      const { merchantId, transactionId } = result as { merchantId: string; transactionId: string };

      const orderValues: Order = {
        ...values,
        merchantId,
        transactionId,
        totalPrice: calcTotalPrice(checkedGoods),
        orderItems: checkedGoods,
        uid: auth?.uid,
      };

      await storeService.createOrder(orderValues);

      const newCart = await storeService.getCart(auth?.uid);
      setCart(newCart);
      setTotalPrice(calcTotalPrice(newCart));

      navigate(AUTH_ROUTE_PATHS.ORDER_LIST);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const handleClickSearchPostalCode = () => {
    setSearching(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Wrapper className="flex items-end pt-6 pb-1 w-full">
          <h2 className="inline-block text-xl">배송지 정보</h2>
          <Button className="ml-auto">결제하기</Button>
        </Wrapper>
        <table className="w-full">
          <colgroup>
            <col className="w-44" />
            <col />
          </colgroup>
          <tbody>
            <tr className="*:p-4 border-t-2 border-b first:*:bg-gray-100">
              <th className="text-start text-sm">받는분</th>
              <td>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" {...field} className="w-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
            <tr className="*:p-4 border-zinc-200 border-b first:*:bg-gray-100">
              <th className="text-start text-sm">연락처</th>
              <td>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="tel" {...field} className="w-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
            <tr className="*:p-4 border-zinc-200 border-b first:*:bg-gray-100">
              <th className="text-start text-sm">주소</th>
              <td>
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <Wrapper className="flex items-center">
                        <FormControl>
                          <Input type="text" readOnly {...field} className="w-24 bg-gray-100" />
                        </FormControl>
                        <Button type="button" onClick={handleClickSearchPostalCode} className="ml-2">
                          우편번호 찾기
                        </Button>
                        <FormMessage />
                      </Wrapper>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jibunAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" readOnly {...field} className="w-[500px] my-2 bg-gray-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roadAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" readOnly {...field} className="w-[500px] my-2 bg-gray-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" {...field} className="w-[500px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {searching && <AddressSearch setSearching={setSearching} form={form} />}
      </form>
    </Form>
  );
}
