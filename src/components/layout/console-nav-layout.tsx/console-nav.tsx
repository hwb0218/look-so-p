import { NavLink, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { authService } from '@src/lib/firebase/AuthService';
import { queryClient } from '@src/main';

import { useAuthContext } from '@providers/auth';

import { Li, Ul } from '@components/common/ui/list';

import { CONSOLE_ROUTE_PATHS, ROUTE_PATHS } from '@constants/routes';

const CONSOLE_NAVIGATION_ITEMS = [
  {
    title: '상품 조회',
    to: CONSOLE_ROUTE_PATHS.CONSOLE,
  },
  {
    title: '상품 등록',
    to: CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION,
  },
  {
    title: '주문 관리',
    to: CONSOLE_ROUTE_PATHS.ORDER_MANAGEMENT,
  },
];

function ConsoleNav() {
  const navigate = useNavigate();
  const { state, resetAuth } = useAuthContext();
  const { uid } = state.auth;

  const onClickButton = async () => {
    try {
      await authService.logout();
      queryClient.clear();
      resetAuth();
      navigate('/login');
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 min-h-screen w-60 bg-gray-900 text-gray-100 z-20">
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <div className="h-full flex flex-col">
            <header className="flex items-center px-6 py-2 font-black">
              <span className="w-14 rounded overflow-hidden">
                <NavLink to={ROUTE_PATHS.HOME}>
                  <img src="/logo.svg" alt="logo" className="w-full h-full" />
                </NavLink>
              </span>
              <div>
                <NavLink to={ROUTE_PATHS.HOME} className="pl-6">
                  <span className="text-xl">LookSoPrt</span>
                </NavLink>
              </div>
            </header>
            <div className="p-4 text-xl border-b-2 border-slate-400">
              <strong className="mr-1">{state.auth.nickname}</strong>님
            </div>
            <ul className="px-4 pb-4 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-inherit">
              {CONSOLE_NAVIGATION_ITEMS.map(({ title, to }) => (
                <Li key={title} className="text-base py-6">
                  <NavLink to={to(uid)} className="active:text-slate-400">
                    {title}
                  </NavLink>
                </Li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <Ul className="h-[72px] py-2 px-6 fixed left-0 right-0 top-0 gap-x-2 bg-slate-100 z-10">
        <NavLink to="/" className="ml-auto">
          홈으로
        </NavLink>
        <Li className="ml-3">
          <button onClick={onClickButton}>로그아웃</button>
        </Li>
      </Ul>
    </>
  );
}

export default ConsoleNav;
