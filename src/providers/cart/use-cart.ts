import { useCallback, useEffect, useState } from 'react';

import { storeService } from '@src/lib/firebase/StoreService';

import { useAuthContext } from '@providers/auth';

import { getLocalStorage, setLocalStorage } from '@src/utils/local-storage';
import calcTotalPrice from '@src/utils/calc-total-price';

import { CartGoods } from '@src/lib/firebase/types';

export default function useCart() {
  const storedUsers = getLocalStorage({ key: 'auth' });
  const storedCart = getLocalStorage({ key: 'cart' }) as CartGoods[];

  const [cart, setCart] = useState<CartGoods[]>(storedCart ?? []);
  const [checkedGoods, setCheckedGoods] = useState<CartGoods[]>(storedCart ?? []);
  const [totalPrice, setTotalPrice] = useState<number>(calcTotalPrice(storedCart));

  const { state } = useAuthContext();
  const { auth } = state;

  useEffect(() => {
    if (!storedUsers) {
      setCart([]);
    }
  }, [storedUsers]);

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
        await storeService.deleteGoodsToCart(cartGoodsId, auth?.uid);
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
    async (cartGoodsId: string, goodsCount: number) => {
      try {
        const updatedCartGoods = await storeService.changeGoodsCountFromCart(cartGoodsId, auth?.uid, goodsCount);
        setCart(updatedCartGoods);
        setTotalPrice(calcTotalPrice(updatedCartGoods));
      } catch (err) {
        console.error(err);
      }
    },
    [auth?.uid],
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
  };
}
