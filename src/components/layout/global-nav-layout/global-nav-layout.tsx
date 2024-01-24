import { Outlet } from 'react-router-dom';

import GlobalNav from './global-nav';

const GlobalLayout = () => {
  return (
    <div>
      <GlobalNav />
      <Outlet />
    </div>
  );
};

export default GlobalLayout;
