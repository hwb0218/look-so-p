import { useMemo, createContext, PropsWithChildren, RefObject, MouseEvent } from 'react';

import useCart from './use-cart';
import useOverlay from '@components/common/overlay/use-overlay';

import type { CartGoods } from '@src/lib/firebase/types';

interface CartContext {
  expanded: boolean;
  cart: CartGoods[];
  checkedGoods: CartGoods[];
  totalPrice: number;
  overlayRef: RefObject<HTMLDivElement>;
  onShowOverlay: () => void;
  onHideOverlay: (e: MouseEvent<HTMLElement>, forceHide?: boolean) => void;
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

  const { overlayRef, expanded, onShowOverlay, onHideOverlay } = useOverlay();

  const contextValue = useMemo(
    () => ({
      cart,
      checkedGoods,
      totalPrice,
      expanded,
      overlayRef,
      onShowOverlay,
      onHideOverlay,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
      onChangeGoodsCount,
      onResetCart,
    }),
    [
      cart,
      checkedGoods,
      totalPrice,
      expanded,
      overlayRef,
      onShowOverlay,
      onHideOverlay,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
      onChangeGoodsCount,
      onResetCart,
    ],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
