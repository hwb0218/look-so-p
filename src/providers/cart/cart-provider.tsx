import React, { useState, useMemo, createContext, useEffect, useRef } from 'react';

import type { Product } from '@src/lib/firebase/types';
import { getLocalStorage, setLocalStorage } from '@src/utils/local-storage';

interface CartContext {
  expanded: boolean;
  onOpenCart: (e: React.MouseEvent) => void;
  cart: Product[];
  onAddItemToCart: (item: Product) => void;
  onDeleteItemFromCart: (cartGoodsid: string) => void;
}

export const CartContext = createContext<CartContext>({
  expanded: false,
  onOpenCart: () => {},
  cart: [],
  onAddItemToCart: () => {},
  onDeleteItemFromCart: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function CartProvider({ children }: Props) {
  const storedCart = getLocalStorage({ key: 'cart' });
  const storedUsers = getLocalStorage({ key: 'auth' });

  const [expanded, setExpanded] = useState(false);
  const [cart, setCart] = useState<Product[]>(storedCart ?? []);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!storedUsers) {
      setCart([]);
    }
  }, [storedUsers]);

  const onOpenCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(true);
  };

  useEffect(() => {
    const onCloseCart = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (expanded && overlayRef.current?.contains(target)) {
        setExpanded(false);
      }
    };

    window.addEventListener('click', onCloseCart);
    document.body.classList.toggle('overflow-hidden');

    return () => {
      window.removeEventListener('click', onCloseCart);
    };
  }, [expanded]);

  const onAddItemToCart = (item: Product) => {
    setCart([item, ...cart]);
    setLocalStorage({ key: 'cart', value: [item, ...cart] });
  };

  const onDeleteItemFromCart = (cartGoodsid: string) => {
    const filteredCart = cart.filter((item) => item.id !== cartGoodsid);

    setCart(filteredCart);
    setLocalStorage({ key: 'cart', value: filteredCart });
  };

  const contextValue = useMemo(
    () => ({ expanded, onOpenCart, cart, onAddItemToCart, onDeleteItemFromCart }),
    [expanded, cart],
  );

  return (
    <>
      <div ref={overlayRef} className={`fixed inset-0 z-[9999] ${expanded ? 'bg-stone-800/80' : 'hidden'}`} />
      <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    </>
  );
}
