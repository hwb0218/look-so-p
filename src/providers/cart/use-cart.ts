import { useCallback, useEffect, useState } from 'react';

import { storeService } from '@src/lib/firebase/StoreService';

import { useAuthContext } from '@providers/auth';

import { getLocalStorage, setLocalStorage } from '@src/utils/local-storage';
import calcTotalPrice from '@src/utils/calc-total-price';

import type { CartGoods } from '@src/lib/firebase/types';

export default function useCart() {
  const storedCart = getLocalStorage({ key: 'cart' }) as CartGoods[];

  const { state } = useAuthContext();
  const { auth } = state;

  const [cart, setCart] = useState<CartGoods[]>(storedCart ?? []);
  const [checkedGoods, setCheckedGoods] = useState<CartGoods[]>(storedCart ?? []);
  const [totalPrice, setTotalPrice] = useState<number>(calcTotalPrice(storedCart));

  useEffect(() => {
    if (storedCart?.length) {
      setCart(storedCart);
      setCheckedGoods(storedCart);
    } else {
      setCart([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedCart?.length]);

  const onResetCart = useCallback((cart: CartGoods[]) => {
    setCart(cart);
    setCheckedGoods(cart);
    setTotalPrice(calcTotalPrice(cart));
  }, []);

  const onAddItemToCart = useCallback(
    (item: CartGoods) => {
      const newCartGoods = [item, ...cart];
      setCart(newCartGoods);
      setLocalStorage({ key: 'cart', value: newCartGoods });
      setCheckedGoods([...checkedGoods, item]);
      setTotalPrice(calcTotalPrice(newCartGoods));
    },
    [cart, checkedGoods],
  );

  const onDeleteItemFromCart = useCallback(
    async (cartGoodsId: string) => {
      try {
        await storeService.deleteGoodsToCartById(cartGoodsId, auth?.uid);
        const filteredCart = cart.filter((item) => item.id !== cartGoodsId);
        setCart(filteredCart);
        setLocalStorage({ key: 'cart', value: filteredCart });
        setCheckedGoods(checkedGoods.filter((goods) => goods.id !== cartGoodsId));
        setTotalPrice(calcTotalPrice(filteredCart));
      } catch (err) {
        console.error(err);
      }
    },
    [cart, checkedGoods, auth?.uid],
  );

  const onToggleCartGoods = useCallback(
    (cartGoods: CartGoods) => {
      // FIXME: 결제 성공 후 장바구니 단일 품목 체크 시 가격 데이터 버그 발생
      const isAlreadyChecked = checkedGoods.some((goods) => goods.id === cartGoods.id);

      const newCheckedGoods = isAlreadyChecked
        ? checkedGoods.filter((goods) => goods.id !== cartGoods.id)
        : [...checkedGoods, cartGoods];

      setCheckedGoods(newCheckedGoods);
      setTotalPrice(calcTotalPrice(newCheckedGoods));
    },
    [checkedGoods],
  );

  const onAllCheckedGoods = useCallback(
    (checked: HTMLInputElement['checked']) => {
      if (checked) {
        setCheckedGoods(storedCart);
        setTotalPrice(calcTotalPrice(storedCart));
      } else {
        setCheckedGoods([]);
        setTotalPrice(0);
      }
    },
    [storedCart],
  );

  const onChangeGoodsCount = useCallback(
    async (cartGoods: CartGoods, goodsCount: number) => {
      try {
        const updatedCartGoods = await storeService.changeGoodsCountFromCart(cartGoods, auth?.uid, goodsCount);
        setCart(updatedCartGoods);

        const duplicatesCardgoods = updatedCartGoods.filter((updatedItem) =>
          checkedGoods.some((chckedItem) => updatedItem.id === chckedItem.id),
        );

        setCheckedGoods(duplicatesCardgoods);
        setTotalPrice(calcTotalPrice(duplicatesCardgoods));
      } catch (err) {
        console.error(err);
      }
    },
    [auth?.uid, checkedGoods],
  );

  return {
    cart,
    checkedGoods,
    totalPrice,
    onAddItemToCart,
    onDeleteItemFromCart,
    onToggleCartGoods,
    onAllCheckedGoods,
    onChangeGoodsCount,
    onResetCart,
  };
}
