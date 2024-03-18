import { vi } from 'vitest';
import { render } from '@src/utils/test-helpers';
import { screen } from '@testing-library/react';

import ConsoleNav from '@components/layout/console-nav-layout.tsx/console-nav';

import type { User } from '@src/lib/firebase/types';

const context = describe;

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
  context('With default value', () => {
    it('renders user data', () => {
      render(<ConsoleNav />);

      expect(screen.getByText(/nickname/)).toHaveTextContent('test nickname');
    });
  });

  context('With custom value', () => {
    it('renders user data', () => {
      render(<ConsoleNav />, {
        authContext,
      });

      screen.debug();
      expect(screen.getByText(/nickname/)).toHaveTextContent('custom nickname');
    });
  });
});
