import React, { useState, useMemo, createContext, useEffect, useRef, useCallback, PropsWithChildren } from 'react';

import type { CartGoods } from '@src/lib/firebase/types';
import { getLocalStorage, setLocalStorage } from '@src/utils/local-storage';

interface CartContext {
  expanded: boolean;
  cart: CartGoods[];
  checkedGoods: CartGoods['id'][];
  onOpenCart: (e: React.MouseEvent) => void;
  onAddItemToCart: (item: CartGoods) => void;
  onDeleteItemFromCart: (cartGoodsId: string) => void;
  onToggleCartGoods: (cartGoodsId: string) => void;
  onAllCheckedGoods: (checked: HTMLInputElement['checked']) => void;
}

export const CartContext = createContext<CartContext>({
  expanded: false,
  checkedGoods: [],
  cart: [],
  onOpenCart: () => {},
  onAddItemToCart: () => {},
  onDeleteItemFromCart: () => {},
  onToggleCartGoods: () => {},
  onAllCheckedGoods: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
  const storedCart = getLocalStorage({ key: 'cart' }) as CartGoods[];
  const storedUsers = getLocalStorage({ key: 'auth' });
  const initCartGoodsId = storedCart.map((cartGoods) => cartGoods.id);

  const [expanded, setExpanded] = useState(false);
  const [cart, setCart] = useState<CartGoods[]>(storedCart ?? []);
  const [checkedGoods, setcheckedGoods] = useState<string[]>(initCartGoodsId);

  const overlayRef = useRef<HTMLDivElement>(null);

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
      setCart([item, ...cart]);
      setLocalStorage({ key: 'cart', value: [item, ...cart] });
      setcheckedGoods([...checkedGoods, item.id]);
    },
    [cart, checkedGoods],
  );

  const onDeleteItemFromCart = useCallback(
    (cartGoodsId: string) => {
      const filteredCart = cart.filter((item) => item.id !== cartGoodsId);

      setCart(filteredCart);
      setLocalStorage({ key: 'cart', value: filteredCart });
      setcheckedGoods(checkedGoods.filter((id) => id !== cartGoodsId));
    },
    [cart, checkedGoods],
  );

  const onToggleCartGoods = useCallback(
    (cartGoodsId: string) => {
      const checkedGoodsSet = new Set(checkedGoods);
      checkedGoodsSet.has(cartGoodsId) ? checkedGoodsSet.delete(cartGoodsId) : checkedGoodsSet.add(cartGoodsId);
      const newCheckedCartGoods = [...checkedGoodsSet];

      setcheckedGoods(newCheckedCartGoods);
    },
    [checkedGoods],
  );

  const onAllCheckedGoods = useCallback(
    (checked: HTMLInputElement['checked']) => {
      if (checked) {
        setcheckedGoods(initCartGoodsId);
      } else {
        setcheckedGoods([]);
      }
    },
    [initCartGoodsId],
  );

  const contextValue = useMemo(
    () => ({
      expanded,
      cart,
      checkedGoods,
      onOpenCart,
      onAddItemToCart,
      onDeleteItemFromCart,
      onToggleCartGoods,
      onAllCheckedGoods,
    }),
    [expanded, cart, checkedGoods, onAddItemToCart, onDeleteItemFromCart, onToggleCartGoods, onAllCheckedGoods],
  );

  return (
    <>
      <div ref={overlayRef} className={`fixed inset-0 z-[9999] ${expanded ? 'bg-stone-800/80' : 'hidden'}`} />
      <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    </>
  );
}
