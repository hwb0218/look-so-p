import { NavLink } from 'react-router-dom';

import { Ul, Li } from '@components/common/list';

import { NavItems, NavItemsAuth, NavItemsUnauth } from './global-nav-items';

import { useAuthContext } from '@providers/auth';

import { ROUTE_PATHS } from '@constants/routes';

function GlobalNav() {
  const { state } = useAuthContext();

  return (
    <header className="fixed top-0 left-0 right-0 px-4 py-2 flex justify-between z-10">
      <Ul>
        <Li className="w-16 rounded overflow-hidden">
          <NavLink to={ROUTE_PATHS.HOME}>
            <img src="/logo.svg" />
          </NavLink>
        </Li>
      </Ul>
      <Ul>
        <NavItems />
        <NavItemsAuth renderIf={() => !!state.auth?.uid} isSeller={state.auth?.isSeller} />
        <NavItemsUnauth renderIf={() => !state.auth?.uid} />
      </Ul>
    </header>
  );
}

export default GlobalNav;
