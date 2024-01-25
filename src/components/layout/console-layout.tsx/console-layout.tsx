import { Outlet } from 'react-router-dom';

function ConsoleLayout() {
  return (
    <div>
      <p>private layout</p>
      <Outlet />
    </div>
  );
}

export default ConsoleLayout;
