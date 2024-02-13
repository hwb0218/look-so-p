import { useContext } from 'react';
import { cartContext } from './cart-provider';

export default function useCartContext() {
  const context = useContext(cartContext);

  if (context === undefined) {
    throw new Error('CartContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
