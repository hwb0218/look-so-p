import React from 'react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RenderOptions, render as originalRender } from '@testing-library/react';

import { AuthContext, IAuthContext } from '@providers/auth/auth-provider';
import { ModalContext, ModalContextProps } from '@providers/modal/modal-provider';
import { CartContext } from '@providers/cart/cart-provider';
import { User } from '@src/lib/firebase/types';

import fixtures from '../../fixtures';

interface IExtendedRenderOptions extends RenderOptions {
  initialEntries?: string[];
  authContext?: IAuthContext;
  modalContext?: ModalContextProps;
  cartContext?: CartContext;
}

const defaultAuth = {
  state: {
    auth: {
      email: 'test@gmail.com',
      isSeller: true,
      nickname: 'test nickname',
      uid: 'test uid',
    } as User,
    isLoggedIn: true,
  },
  setAuth: vi.fn(),
  resetAuth: vi.fn(),
};

const defaultModal = {
  isOpen: 'closed' as ModalContextProps['isOpen'],
  modalContent: <div>test modal content</div>,
  openModal: vi.fn(),
  closeModal: vi.fn(),
};

const defaultCart = {
  expanded: false,
  cart: fixtures.goods,
  checkedGoods: fixtures.goods,
  totalPrice: 2500000,
  onOpenCart: vi.fn(),
  onCloseCart: vi.fn(),
  onAddItemToCart: vi.fn(),
  onDeleteItemFromCart: vi.fn(),
  onToggleCartGoods: vi.fn(),
  onAllCheckedGoods: vi.fn(),
  onChangeGoodsCount: vi.fn(),
  onResetCart: vi.fn(),
};

HelmetProvider.canUseDOM = false;

export function render(element: React.ReactElement, options?: Omit<IExtendedRenderOptions, 'wrapper'>) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <HelmetProvider>
        <AuthContext.Provider value={options?.authContext ?? defaultAuth}>
          <ModalContext.Provider value={options?.modalContext ?? defaultModal}>
            <CartContext.Provider value={options?.cartContext ?? defaultCart}>
              <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>{children}</MemoryRouter>
            </CartContext.Provider>
          </ModalContext.Provider>
        </AuthContext.Provider>
      </HelmetProvider>
    );
  };

  return originalRender(element, { wrapper: Wrapper, ...options });
}
