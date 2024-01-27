import { RouteObject } from 'react-router-dom';

import { ProtectedLayout, GlobalLayout, ConsoleLayout } from '@components/layout';

import { ConsoleMain, ConsoleAddProduct, MyPage } from '@pages/private';

import { AUTH_ROUTE_PATHS } from '@constants/routes';

const privateRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedLayout>
        <GlobalLayout />
      </ProtectedLayout>
    ),
    children: [{ path: AUTH_ROUTE_PATHS.MYPAGE, element: <MyPage /> }],
  },
  {
    element: (
      <ProtectedLayout>
        <ConsoleLayout />
      </ProtectedLayout>
    ),
    children: [
      { path: AUTH_ROUTE_PATHS.CONSOLE, element: <ConsoleMain /> },
      {
        path: AUTH_ROUTE_PATHS.CONSOLE_ADD_PRODUCT,
        element: <ConsoleAddProduct />,
      },
    ],
  },
];

export default privateRoutes;
