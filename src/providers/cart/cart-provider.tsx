import React, { useState, useMemo, createContext, useEffect, useRef } from 'react';

interface CartContext {
  expanded: boolean;
  handleOpenCart: (e: React.MouseEvent) => void;
}

export const CartContext = createContext<CartContext>({
  expanded: false,
  handleOpenCart: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function CartProvider({ children }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const handleCloseCart = (e: globalThis.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (expanded && overlayRef.current?.contains(target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseCart);
    return () => {
      window.removeEventListener('click', handleCloseCart);
    };
  });

  const handleOpenCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(true);
  };

  const contextValue = useMemo(() => ({ expanded, handleOpenCart }), [expanded]);

  return (
    <>
      <div ref={overlayRef} className={`fixed inset-0 z-[9999] ${expanded ? 'bg-stone-800/80' : 'hidden'}`} />
      <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    </>
  );
}
