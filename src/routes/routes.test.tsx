import { vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';

import Providers from '@providers/index';
import { ROUTE_PATHS } from '@constants/routes';

vi.mock('.@src/lib/firebase/StoreService');

import routes from './routes';

const context = describe;

function renderRouter(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <Providers>
      <Suspense fallback="fallback">
        <RouterProvider router={router} />
      </Suspense>
    </Providers>,
  );
}

describe('routes', () => {
  context('when the current path is “/”', () => {
    it('renders the home page', async () => {
      renderRouter(ROUTE_PATHS.HOME);

      await waitFor(() => {
        screen.getByText(/LookSoPrt/);
      });
    });
  });

  context('when the current path is "/login"', () => {
    it('renders the login page', async () => {
      renderRouter(ROUTE_PATHS.LOGIN);

      await waitFor(() => {
        screen.getByLabelText('아이디');
        screen.getByLabelText('비밀번호');
      });

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: {
          value: 'newbie@example.com',
        },
      });
      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: {
          value: 'password',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    });
  });

  context('when the current path is "/signup"', () => {
    it('renders the signup page', async () => {
      renderRouter(ROUTE_PATHS.SIGNUP);

      await waitFor(() => {
        screen.getByLabelText('아이디');
        screen.getByLabelText('닉네임');
        screen.getByLabelText('비밀번호');
        screen.getByLabelText('비밀번호 확인');
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    });
  });

  context('when the current path is "/goods/goods-list"', () => {
    it('renders the product list page', async () => {
      renderRouter(ROUTE_PATHS.GOODS_LIST);

      const categories = ['클렌징', '토너/패드', '로션/크림', '에센스/앰플', '선케어'];

      await waitFor(() => {
        categories.forEach((category) => screen.getByText(category));
      });
    });
  });
});
