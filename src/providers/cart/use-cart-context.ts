import { useContext } from 'react';
import { CartContext } from './cart-provider';

export default function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('CartContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
