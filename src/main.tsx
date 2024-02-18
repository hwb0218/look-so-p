import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from '@providers/auth';
import { ModalProvider } from '@providers/modal';

import App from './App';

import './index.css';
import Modal from '@providers/modal/modal';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1_000 * 60 * 5,
    },
  },
});

function main() {
  const { IMP } = window;
  IMP?.init(import.meta.env.VITE_PORTONE_IMP);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>
            <App />
            <Modal />
          </ModalProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

main();
