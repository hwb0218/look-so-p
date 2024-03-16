import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { CartProvider } from './cart';
import { SearchBarProvider } from './search-bar';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1_000 * 60 * 10,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ModalProvider>
            <CartProvider>
              <SearchBarProvider>{children}</SearchBarProvider>
            </CartProvider>
          </ModalProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
