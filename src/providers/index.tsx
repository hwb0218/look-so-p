import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { SearchBarProvider } from './search-bar';
import { ModalProvider, ModalPortal } from './modal';
import { NavMobilePotal, NavMobileProvider } from './nav-mobile';

import { Toaster } from '@components/ui/sonner';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ModalProvider>
          <CartProvider>
            <SearchBarProvider>
              <NavMobileProvider>
                {children}
                <Toaster />
                <ModalPortal />
                <NavMobilePotal />
              </NavMobileProvider>
            </SearchBarProvider>
          </CartProvider>
        </ModalProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
