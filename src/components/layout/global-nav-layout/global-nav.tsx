import { NavLink } from 'react-router-dom';

import { Ul, Li } from '@components/common/ui/list';

import { NavItems, NavItemsAuth, NavItemsUnauth } from './global-nav-items';
import { SearchBar } from './goods-search-bar';

import { ROUTE_PATHS } from '@constants/routes';

import { getLocalStorage } from '@src/utils/local-storage';

function GlobalNav() {
  const auth = getLocalStorage({ key: 'auth' });

  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-2 flex justify-between z-10 bg-gradient-to-b from-muted">
      <Ul className="flex items-center font-black">
        <Li className="w-14 rounded overflow-hidden">
          <NavLink to={ROUTE_PATHS.HOME}>
            <img src="/logo.svg" />
          </NavLink>
        </Li>
        <Li>
          <NavLink to={ROUTE_PATHS.HOME} className="pl-6">
            <span className="text-xl">LookSoPrt</span>
          </NavLink>
        </Li>
      </Ul>
      <Ul className="*:mx-2 gap-x-2">
        <SearchBar />
        <NavItems />
        <NavItemsAuth renderIf={() => auth} isSeller={auth?.isSeller} />
        <NavItemsUnauth renderIf={() => !auth} />
      </Ul>
    </header>
  );
}

export default GlobalNav;
