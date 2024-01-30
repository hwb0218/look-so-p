import { Outlet } from 'react-router-dom';

import GlobalNav from './global-nav';

function GlobalLayout() {
  return (
    <>
      <GlobalNav />
      <Outlet />
    </>
  );
}

export default GlobalLayout;
