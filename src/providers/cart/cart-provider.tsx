import React, { useState, useMemo, createContext } from 'react';

interface CartContext {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export const cartContext = createContext<CartContext>({
  expanded: false,
  setExpanded: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function CartProvider({ children }: Props) {
  const [expanded, setExpanded] = useState(false);

  const contextValue = useMemo(() => ({ expanded, setExpanded }), [expanded]);

  return <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>;
}
