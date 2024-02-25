import { PropsWithChildren } from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './auth';
import { ModalPortal, ModalProvider } from './modal';
import { CartProvider } from './cart';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ModalProvider>
          <CartProvider>{children}</CartProvider>
          <ModalPortal />
        </ModalProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
