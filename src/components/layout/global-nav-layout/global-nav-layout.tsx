import { Outlet } from 'react-router-dom';

import useCheckAuth from '@hooks/use-check-auth';

import GlobalNav from './global-nav';

import Wrapper from '@components/common/ui/wrapper';
import { Cart } from '@components/cart';

function GlobalLayout() {
  useCheckAuth();

  return (
    <>
      <GlobalNav />
      <Cart />
      <Wrapper className="pt-[72px]">
        <Outlet />
      </Wrapper>
    </>
  );
}

export default GlobalLayout;
