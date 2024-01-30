import { NavLink } from 'react-router-dom';

import { Li } from '@components/common/list';

import useAuthContext from '@providers/use-auth-context';

import { authService } from '@firebase/AuthService';

import { AUTH_ROUTE_PATHS, CONSOLE_ROUTE_PATHS } from '@constants/routes';

const AUTH_NAVIGATION_ITEMS = {
  seller: [
    {
      title: '판매자 콘솔',
      to: CONSOLE_ROUTE_PATHS.CONSOLE,
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
  isSeller: boolean;
}

function NavItemsAuth({ renderIf, isSeller = false }: Props) {
  const { resetAuth, setIsLoggedIn } = useAuthContext();

  if (renderIf && !renderIf()) {
    return null;
  }

  const onClickButton = async () => {
    await authService.logout();
    resetAuth();
    setIsLoggedIn(false);
  };

  return (
    <>
      {AUTH_NAVIGATION_ITEMS[isSeller ? 'seller' : 'common'].map(({ title, to }) => (
        <Li key={to} className="ml-2">
          <NavLink to={to}>{title}</NavLink>
        </Li>
      ))}
      <Li className="ml-2">
        <button onClick={onClickButton}>로그아웃</button>
      </Li>
    </>
  );
}

export default NavItemsAuth;
