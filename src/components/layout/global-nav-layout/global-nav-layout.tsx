import { Outlet } from 'react-router-dom';

import GlobalNav from './global-nav';
import Wrapper from '@components/common/wrapper';

function GlobalLayout() {
  return (
    <>
      <GlobalNav />
      <Wrapper className="mt-[72px]">
        <Outlet />
      </Wrapper>
    </>
  );
}

export default GlobalLayout;
