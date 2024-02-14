import { Outlet } from 'react-router-dom';

import GlobalNav from './global-nav';
import Wrapper from '@components/common/wrapper';
import { Cart } from '@components/cart';
import useCheckAuth from '@hooks/use-check-auth';

import { CartProvider } from '@providers/cart';

function GlobalLayout() {
  useCheckAuth();

  return (
    <CartProvider>
      <GlobalNav />
      <Cart />
      <Wrapper className="mt-[72px]">
        <Outlet />
      </Wrapper>
    </CartProvider>
  );
}

export default GlobalLayout;
