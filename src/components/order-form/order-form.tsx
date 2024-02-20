import { useCartContext } from '@providers/cart';
import { ShippingForm, GoodsInfo } from '.';

import Wrapper from '@components/common/wrapper';

export default function OrderForm() {
  const { checkedGoods, setCart, setTotalPrice } = useCartContext();

  return (
    <Wrapper className="max-w-5xl pb-20 mx-auto my-0">
      <ShippingForm checkedGoods={checkedGoods} setCart={setCart} setTotalPrice={setTotalPrice} />
      <GoodsInfo checkedGoods={checkedGoods} />
    </Wrapper>
  );
}
