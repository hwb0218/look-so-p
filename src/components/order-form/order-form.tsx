import { useCartContext } from '@providers/cart';
import { ShippingForm, GoodsInfo } from '.';

import Wrapper from '@components/common/ui/wrapper';

export default function OrderForm() {
  const { checkedGoods, onResetCart } = useCartContext();

  return (
    <Wrapper className="max-w-5xl pb-20 mx-auto my-0">
      <ShippingForm checkedGoods={checkedGoods} onResetCart={onResetCart} />
      <GoodsInfo checkedGoods={checkedGoods} />
    </Wrapper>
  );
}
