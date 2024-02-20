import { CartGoods, Product } from '@src/lib/firebase/types';

export default function calcTotalPrice(cart: CartGoods[] | Product[]) {
  return cart?.reduce((total, item) => total + item.productPrice * item.goodsCount, 0) ?? 0;
}
