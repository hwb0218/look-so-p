import { Outlet } from 'react-router-dom';

function ConsoleLayout() {
  return (
    <div>
      <p>console layout</p>
      <Outlet />
    </div>
  );
}

export default ConsoleLayout;
