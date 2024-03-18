import React from 'react';
import { RenderOptions, render as originalRender } from '@testing-library/react';

import Providers from '@providers/index';

import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

interface IExtendedRenderOptions extends RenderOptions {
  initialEntries?: string[];
}

HelmetProvider.canUseDOM = false;

export function render(element: React.ReactElement, options?: Omit<IExtendedRenderOptions, 'wrapper'>) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Providers>
        <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>{children}</MemoryRouter>
      </Providers>
    );
  };

  return originalRender(element, { wrapper: Wrapper, ...options });
}
