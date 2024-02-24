import { NavLink } from 'react-router-dom';

import { Ul, Li } from '@components/common/ui/list';

import { NavItems, NavItemsAuth, NavItemsUnauth } from './global-nav-items';

import { ROUTE_PATHS } from '@constants/routes';
import { getLocalStorage } from '@src/utils/local-storage';

function GlobalNav() {
  const auth = getLocalStorage({ key: 'auth' });

  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-2 flex justify-between z-10 border-b bg-white/70">
      <Ul className="flex items-center gap-x-6 font-black">
        <Li className="w-14 rounded overflow-hidden">
          <NavLink to={ROUTE_PATHS.HOME}>
            <img src="/logo.svg" />
          </NavLink>
        </Li>
        <Li>
          <span className="text-xl">LookSoPrt</span>
        </Li>
      </Ul>
      <Ul className="gap-x-2">
        <NavItems />
        <NavItemsAuth renderIf={() => auth} isSeller={auth?.isSeller} />
        <NavItemsUnauth renderIf={() => !auth} />
      </Ul>
    </header>
  );
}

export default GlobalNav;
