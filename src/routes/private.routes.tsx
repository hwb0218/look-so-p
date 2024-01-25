import { RouteObject } from 'react-router-dom';

import { GlobalLayout, ConsoleLayout } from '@components/layout';

import { ConsoleMain, ConsoleAddProduct, MyPage } from '@pages/private';

import { AUTH_ROUTE_PATHS } from '@constants/routes';

const privateRoutes: RouteObject[] = [
  {
    element: <GlobalLayout />,
    children: [{ path: AUTH_ROUTE_PATHS.MYPAGE, element: <MyPage /> }],
  },
  {
    element: <ConsoleLayout />,
    children: [
      { path: AUTH_ROUTE_PATHS.CONSOLE, element: <ConsoleMain /> },
      {
        path: AUTH_ROUTE_PATHS.CONSOLE_ADD_PRODUCT,
        element: <ConsoleAddProduct />,
      },
    ],
  },
  // { path: '*', element: <Navigate to={ROUTE_PATHS.LOGIN} replace /> },
];

export default privateRoutes;
