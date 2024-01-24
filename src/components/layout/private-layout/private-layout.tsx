import { Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  return (
    <div>
      <p>private layout</p>
      <Outlet />
    </div>
  );
}
