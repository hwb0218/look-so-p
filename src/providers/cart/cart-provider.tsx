import { useMemo, createContext, PropsWithChildren } from 'react';
import useCart from './use-cart';

import type { CartGoods } from '@src/lib/firebase/types';
import useOverlay from './use-overlay';

export interface CartContext {
  expanded: boolean;
  cart: CartGoods[];
  checkedGoods: CartGoods[];
  totalPrice: number;
  onOpenCart: () => void;
  onCloseCart: () => void;
  onAddItemToCart: (item: CartGoods) => void;
  onDeleteItemFromCart: (cartGoodsId: string) => void;
  onToggleCartGoods: (cartGoods: CartGoods) => void;
  onAllCheckedGoods: (checked: HTMLInputElement['checked']) => void;
  onChangeGoodsCount: (cartGoods: CartGoods, goodsCount: number) => void;
  onResetCart: (cart: CartGoods[]) => void;
}

export const CartContext = createContext<CartContext | undefined>(undefined);

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
    onResetCart,
  } = useCart();

  const { expanded, onOpenCart, onCloseCart } = useOverlay();

  const contextValue = useMemo(
    () => ({
      expanded,
      cart,
      checkedGoods,
      totalPrice,
      onOpenCart,
      onCloseCart,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
      onChangeGoodsCount,
      onResetCart,
    }),
    [
      expanded,
      cart,
      checkedGoods,
      totalPrice,
      onOpenCart,
      onCloseCart,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
      onChangeGoodsCount,
      onResetCart,
    ],
  );

  const handeClickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onCloseCart();
  };

  return (
    <>
      <div
        onClick={handeClickWrapper}
        className={`fixed inset-0 z-[9999] ${expanded ? 'bg-stone-800/80' : 'hidden'}`}
      />
      <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    </>
  );
}
