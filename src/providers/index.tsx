import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './auth';
import { ModalPortal, ModalProvider } from './modal';
import { CartProvider } from './cart';
import { SearchBarProvider } from './search-bar';

import { Toaster } from '@components/ui/sonner';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ModalProvider>
          <CartProvider>
            <SearchBarProvider>{children}</SearchBarProvider>
            <Toaster />
            <ModalPortal />
          </CartProvider>
        </ModalProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
