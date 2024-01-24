import { NavLink, useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from '@constants/routes';

const NAVIGATION_ITEMS = [
  {
    title: 'public',
    to: ROUTE_PATHS.MAIN,
  },
  {
    title: 'private',
    to: ROUTE_PATHS.PRIVATE,
  },
];

export default function GlobalNav() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header>
      <ul>
        {NAVIGATION_ITEMS.map(({ title, to }) => (
          <li key={to}>
            <NavLink to={to}>
              <span>{title}</span>
            </NavLink>
          </li>
        ))}
        {pathname === '/auth' && <li>log out</li>}
      </ul>
    </header>
  );
}
