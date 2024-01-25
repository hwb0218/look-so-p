import { NavLink } from 'react-router-dom';

import { Li } from '@components/common/list';

import { AUTH_ROUTE_PATHS } from '@constants/routes';

const AUTH_NAVIGATION_ITEMS = {
  seller: [
    {
      title: '판매자 콘솔',
      to: AUTH_ROUTE_PATHS.CONSOLE,
    },
  ],
  common: [
    {
      title: '마이 페이지',
      to: AUTH_ROUTE_PATHS.MYPAGE,
    },
  ],
};

interface Props {
  renderIf: () => boolean;
}

function NavItemsAuth({ renderIf }: Props) {
  if (renderIf && !renderIf()) {
    return null;
  }

  return (
    <>
      {AUTH_NAVIGATION_ITEMS['seller'].map(({ title, to }) => (
        <Li key={to} className="ml-2">
          <NavLink to={to}>{title}</NavLink>
        </Li>
      ))}
    </>
  );
}

export default NavItemsAuth;
