import { NavLink } from 'react-router-dom';

import { Ul, Li } from '@components/common/ui/list';

import { NavItemsHamberger, NavItems, NavItemsAuth, NavItemsUnauth } from './global-nav-items';
import { SearchBar } from './goods-search-bar';

import { ROUTE_PATHS } from '@constants/routes';

import { getLocalStorage } from '@src/utils/local-storage';

function GlobalNav() {
  const auth = getLocalStorage({ key: 'auth' });

  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-2 flex justify-between z-10 bg-gradient-to-b from-muted">
      <Ul className="flex items-center font-black">
        <Li>
          <NavItemsHamberger />
        </Li>
        <Li className="hidden w-14 rounded overflow-hidden md:block">
          <NavLink to={ROUTE_PATHS.HOME}>
            <img src="/logo.svg" alt="logo" className="w-full h-full" />
          </NavLink>
        </Li>
        <Li>
          <NavLink
            to={ROUTE_PATHS.HOME}
            className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 md:static md:pl-6"
          >
            <span className="text-xl">LookSoPrt</span>
          </NavLink>
        </Li>
      </Ul>
      <Ul className="gap-x-2">
        <SearchBar />
        <NavItems />
        <NavItemsAuth renderIf={() => auth} isSeller={auth?.isSeller} />
        <NavItemsUnauth renderIf={() => !auth} />
      </Ul>
    </header>
  );
}

export default GlobalNav;
