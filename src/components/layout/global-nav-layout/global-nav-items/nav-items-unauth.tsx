import { NavLink } from 'react-router-dom';

import { Li } from '@components/common/ui/list';

import { ROUTE_PATHS } from '@constants/routes';

const UNAUTH_NAVIGATION_ITEMS = [
  {
    title: '회원가입',
    to: ROUTE_PATHS.SIGNUP,
  },
  {
    title: '로그인',
    to: ROUTE_PATHS.LOGIN,
  },
];

interface Props {
  renderIf: () => boolean;
}

function NavItemsUnauth({ renderIf }: Props) {
  if (renderIf && !renderIf()) {
    return null;
  }

  return (
    <Li className="hidden md:flex">
      {UNAUTH_NAVIGATION_ITEMS.map(({ title, to }) => (
        <Li key={to} className="ml-3">
          <NavLink to={to}>{title}</NavLink>
        </Li>
      ))}
    </Li>
  );
}

export default NavItemsUnauth;
