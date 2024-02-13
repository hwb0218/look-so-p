import { Outlet } from 'react-router-dom';

import GlobalNav from './global-nav';
import Wrapper from '@components/common/wrapper';
import { Cart } from '@components/cart';

function GlobalLayout() {
  return (
    <>
      <GlobalNav />
      <Cart />
      <Wrapper className="mt-[72px]">
        <Outlet />
      </Wrapper>
    </>
  );
}

export default GlobalLayout;
