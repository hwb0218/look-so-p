import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import CartProvider, { CartContext } from './cart-provider';

import numberFormat from '@src/utils/number-format';
import React from 'react';

describe('CartContext', () => {
  it('renders default value', () => {
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => (
            <ul>{value?.cart.map((item, i) => <React.Fragment key={i}>{JSON.stringify(item)}</React.Fragment>)}</ul>
          )}
        </CartContext.Consumer>
      </CartProvider>,
    );
    screen.debug();
    // expect(screen.getByText(/^Received:/).textContent).toBe('Received: test nickname');
  });
  // it('renders custom value', () => {
    render(
      <CartContext.Consumer>{(value) => (
        <ul>{value?.cart.map((item, i) => <React.Fragment key={i}>{JSON.stringify(item)}</React.Fragment>)}</ul>
      )}</CartContext.Consumer>,
      // {
      //   authContext,
      // },
    );
    expect(screen.getByText(/^Received:/).textContent).toBe('Received: custom nickname');
  });
});
