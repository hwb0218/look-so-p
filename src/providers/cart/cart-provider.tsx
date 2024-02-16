import React, { useState, useMemo, createContext, useEffect, useRef, useCallback, PropsWithChildren } from 'react';
import { storeService } from '@src/lib/firebase/StoreService';

import { useAuthContext } from '@providers/auth';

import { getLocalStorage, setLocalStorage } from '@src/utils/local-storage';
import calcTotalPrice from '@src/utils/calc-total-price';

import type { CartGoods } from '@src/lib/firebase/types';

interface CartContext {
  expanded: boolean;
  cart: CartGoods[];
  checkedGoods: CartGoods[];
  totalPrice: number;
  onOpenCart: (e: React.MouseEvent) => void;
  onAddItemToCart: (item: CartGoods) => void;
  onDeleteItemFromCart: (cartGoodsId: string) => void;
  onToggleCartGoods: (cartGoods: CartGoods) => void;
  onAllCheckedGoods: (checked: HTMLInputElement['checked']) => void;
  onChangeGoodsCount: (cartGoodsId: string, goodsCount: number) => void;
}

export const CartContext = createContext<CartContext>({
  expanded: false,
  checkedGoods: [],
  cart: [],
  totalPrice: 0,
  onOpenCart: () => {},
  onAddItemToCart: () => {},
  onDeleteItemFromCart: () => {},
  onToggleCartGoods: () => {},
  onAllCheckedGoods: () => {},
  onChangeGoodsCount: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
  const storedCart = getLocalStorage({ key: 'cart' }) as CartGoods[];
  const storedUsers = getLocalStorage({ key: 'auth' });

  const [expanded, setExpanded] = useState(false);
  const [cart, setCart] = useState<CartGoods[]>(storedCart ?? []);
  const [checkedGoods, setCheckedGoods] = useState<CartGoods[]>(storedCart ?? []);
  const [totalPrice, setTotalPrice] = useState<number>(calcTotalPrice(storedCart));

  const overlayRef = useRef<HTMLDivElement>(null);

  const { state } = useAuthContext();
  const { auth } = state;

  useEffect(() => {
    if (!storedUsers) {
      setCart([]);
    }
  }, [storedUsers]);

  useEffect(() => {
    const onCloseCart = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (expanded && overlayRef.current?.contains(target)) {
        document.body.classList.remove('overflow-hidden');
        setExpanded(false);
      }
    };

    window.addEventListener('click', onCloseCart);
    return () => {
      window.removeEventListener('click', onCloseCart);
    };
  }, [expanded]);

  const onOpenCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    document.body.classList.add('overflow-hidden');
    setExpanded(true);
  };

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

  console.log(checkedGoods);

  const contextValue = useMemo(
    () => ({
      expanded,
      cart,
      checkedGoods,
      totalPrice,
      onOpenCart,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
      onChangeGoodsCount,
    }),
    [
      expanded,
      cart,
      checkedGoods,
      totalPrice,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
      onChangeGoodsCount,
    ],
  );

  return (
    <>
      <div ref={overlayRef} className={`fixed inset-0 z-[9999] ${expanded ? 'bg-stone-800/80' : 'hidden'}`} />
      <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    </>
  );
}
