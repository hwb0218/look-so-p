import { render as originalRender } from '@testing-library/react';

import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

type Option = {
  path?: string;
};

HelmetProvider.canUseDOM = false;

export function render(element: React.ReactElement, { path = '/' }: Option = {}) {
  return originalRender(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>{element}</MemoryRouter>
    </HelmetProvider>,
  );
}
