import { useMemo, createContext, PropsWithChildren } from 'react';
import useCart from './use-cart';

import type { CartGoods } from '@src/lib/firebase/types';
import useOverlay from './use-overlay';

interface CartContext {
  expanded: boolean;
  cart: CartGoods[];
  checkedGoods: CartGoods[];
  totalPrice: number;
  onOpenCart: () => void;
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
  const {
    cart,
    checkedGoods,
    totalPrice,
    onAddItemToCart,
    onDeleteItemFromCart,
    onToggleCartGoods,
    onAllCheckedGoods,
    onChangeGoodsCount,
  } = useCart();

  const { expanded, onOpenCart, overlayRef } = useOverlay();

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
      onOpenCart,
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
