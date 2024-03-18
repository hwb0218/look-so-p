import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@src/utils/test-helpers';

import { AuthContext } from './auth-provider';

import type { User } from '@src/lib/firebase/types';

const authContext = {
  state: {
    auth: {
      email: 'custom@mail.com',
      isSeller: true,
      nickname: 'custom nickname',
      uid: 'custom uid',
    } as User,
    isLoggedIn: true,
  },
  setAuth: vi.fn(),
  resetAuth: vi.fn(),
};

describe('AuthContext', () => {
  it('renders default value', () => {
    render(
      <AuthContext.Consumer>{(value) => <span>Received: {value.state.auth.nickname}</span>}</AuthContext.Consumer>,
    );

    expect(screen.getByText(/^Received:/).textContent).toBe('Received: test nickname');
  });

  it('renders custom value', () => {
    render(
      <AuthContext.Consumer>{(value) => <span>Received: {value.state.auth.nickname}</span>}</AuthContext.Consumer>,
      {
        authContext,
      },
    );

    expect(screen.getByText(/^Received:/).textContent).toBe('Received: custom nickname');
  });
});
