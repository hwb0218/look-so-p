import { CartGoods } from '@src/lib/firebase/types';

export default function calcTotalPrice(cart: CartGoods[]) {
  return cart?.reduce((total, item) => total + item.productPrice * item.goodsCount, 0) ?? 0;
}
