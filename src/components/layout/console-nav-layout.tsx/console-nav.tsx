import { NavLink } from 'react-router-dom';

import useAuthContext from '@providers/use-auth-context';

import { Li } from '@components/common/list';

import { CONSOLE_ROUTE_PATHS } from '@constants/routes';

const CONSOLE_NAVIGATION_ITEMS = [
  {
    title: '전체 상품 조회',
    to: CONSOLE_ROUTE_PATHS.CONSOLE,
  },
  {
    title: '상품 등록',
    to: CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION,
  },
];

function ConsoleNav() {
  const { state } = useAuthContext();
  const { uid } = state.auth;

  return (
    <>
      <nav className="fixed top-0 left-0 min-h-screen w-60 bg-gray-900 text-gray-100 z-20">
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <div className="h-full flex flex-col">
            <header className="flex items-center px-4 pt-2 font-black">
              <span className="overflow-hidden">
                <img src="/logo.svg" alt="logo" className="w-16 rounded" />
              </span>
              <div>
                <span className="p-8 text-xl">LookSoPrt</span>
              </div>
            </header>
            <div className="p-4 mt-2 text-xl border-b-2 border-slate-400">
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
      <div className="fixed left-0 right-0 top-0 h-[80px] py-2 px-4 flex flex-row items-center justify-between bg-slate-50 z-10">
        <NavLink to="/" className="ml-auto">
          홈으로
        </NavLink>
      </div>
    </>
  );
}

export default ConsoleNav;

// className="absolute top-0 left-0 bottom-0 w-full px-4 py-3 overflow-y-scroll"
