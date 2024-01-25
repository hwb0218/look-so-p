import { NavLink } from 'react-router-dom';

import { Ul, Li } from '@components/common/list';

import { NavItems, NavItemsAuth, NavItemsUnauth } from './nav-items';

import { ROUTE_PATHS } from '@constants/routes';

import checkAuth from '@/utils/checkAuth';

function GlobalNav() {
  // const location = useLocation();
  return (
    <header className="px-5 py-2 flex justify-between sticky left-0 right-0 top-0 bottom-0 z-10">
      <Ul>
        <Li className="w-14 h-14 rounded overflow-hidden">
          <NavLink to={ROUTE_PATHS.HOME}>
            <img src="/logo.svg" />
          </NavLink>
        </Li>
      </Ul>
      <Ul>
        <NavItems />
        <NavItemsAuth renderIf={() => checkAuth() === true} />
        <NavItemsUnauth renderIf={() => checkAuth() === false} />
      </Ul>
    </header>
  );
}

export default GlobalNav;
