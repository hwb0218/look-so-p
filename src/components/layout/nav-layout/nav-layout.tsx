import { Outlet } from 'react-router-dom';

import GlobalNav from './nav';

function GlobalLayout() {
  return (
    <>
      <GlobalNav />
      <Outlet />
    </>
  );
}

export default GlobalLayout;
