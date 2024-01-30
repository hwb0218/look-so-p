import { Outlet } from 'react-router-dom';

import ConsoleNav from './console-nav';

function ConsoleLayout() {
  return (
    <div>
      <ConsoleNav />
      <Outlet />
    </div>
  );
}

export default ConsoleLayout;
