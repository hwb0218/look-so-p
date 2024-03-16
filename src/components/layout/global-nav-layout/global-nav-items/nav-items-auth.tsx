import { NavLink } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { authService } from '@src/lib/firebase/AuthService';

import { useAuthContext } from '@providers/auth';
import { queryClient } from '@providers/index';

import { Li } from '@components/common/ui/list';

import { AUTH_ROUTE_PATHS, CONSOLE_ROUTE_PATHS } from '@constants/routes';

const AUTH_NAVIGATION_ITEMS = {
  seller: [
    {
      title: '마이페이지',
      to: AUTH_ROUTE_PATHS.ORDER_LIST,
    },
    {
      title: '판매자 콘솔',
      to: CONSOLE_ROUTE_PATHS.CONSOLE,
    },
  ],
  common: [
    {
      title: '마이페이지',
      to: AUTH_ROUTE_PATHS.ORDER_LIST,
    },
  ],
};

interface Props {
  renderIf: () => boolean;
  isSeller: boolean;
}

function NavItemsAuth({ renderIf, isSeller = false }: Props) {
  const { state, resetAuth } = useAuthContext();
  const { uid } = state.auth;

  if (renderIf && !renderIf()) {
    return null;
  }

  const onClickButton = async () => {
    try {
      await authService.logout();
      queryClient.clear();
      resetAuth();
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {AUTH_NAVIGATION_ITEMS[isSeller ? 'seller' : 'common'].map(({ title, to }) => (
        <Li key={title} className="ml-3">
          <NavLink to={typeof to === 'string' ? to : to(uid)}>{title}</NavLink>
        </Li>
      ))}
      <Li className="ml-3">
        <button onClick={onClickButton}>로그아웃</button>
      </Li>
    </>
  );
}

export default NavItemsAuth;
