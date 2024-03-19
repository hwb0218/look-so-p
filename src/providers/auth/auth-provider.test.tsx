import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthProvider, { AuthContext } from './auth-provider';

const context = describe;

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the empty auth', async () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>{(value) => <span>Received: {value.state.auth.nickname}</span>}</AuthContext.Consumer>
      </AuthProvider>,
    );

    screen.getByText(/^Received:/).textContent;
  });

  context('calls "setAuth" button', () => {
    it('renders test auth', async () => {
      const testAuth = {
        email: 'update@mail.com',
        isSeller: true,
        nickname: 'update nickname',
        profile: ['update profile'],
        uid: 'update uid',
      };

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => (
              <div>
                <span>Received: {value.state.auth.nickname}</span>
                <button onClick={() => value.setAuth(testAuth)}>button</button>
              </div>
            )}
          </AuthContext.Consumer>
        </AuthProvider>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'button' }));

      expect(screen.getByText(/^Received:/).textContent).toBe('Received: update nickname');
    });
  });
});
