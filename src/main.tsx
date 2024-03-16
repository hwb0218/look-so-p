import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';

import App from './app';

import Providers from './providers';
import { ModalPortal } from '@providers/modal';
import { Toaster } from '@components/ui/sonner';

ReactDOM.createRoot(document.getElementById('root') || document.createElement('div')).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Toaster />
      <ModalPortal />
      <ReactQueryDevtools />
    </Providers>
  </React.StrictMode>,
);
