import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './app';

import Providers from './providers';

import Spinner from '@components/common/spinner/spinner';

import './index.css';

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

  const container = document.getElementById('root');
  if (!container) {
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </Providers>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

main();
