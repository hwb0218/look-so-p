import { RouteObject } from 'react-router-dom';

import { ProtectedLayout, GlobalNavLayout, ConsoleLayout } from '@components/layout';

import { ConsoleMainPage, ConsoleAddProductPage, MyPage, OrderPage, OrderListPage } from '@pages/private';

import { AUTH_ROUTE_PATHS, CONSOLE_ROUTE_PATHS } from '@constants/routes';

const privateRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedLayout>
        <GlobalNavLayout />
      </ProtectedLayout>
    ),
    children: [
      { path: AUTH_ROUTE_PATHS.MYPAGE(), element: <MyPage /> },
      { path: AUTH_ROUTE_PATHS.ORDER, element: <OrderPage /> },
      { path: AUTH_ROUTE_PATHS.ORDER_LIST, element: <OrderListPage /> },
    ],
  },
  {
    element: (
      <ProtectedLayout>
        <ConsoleLayout />
      </ProtectedLayout>
    ),
    children: [
      { path: CONSOLE_ROUTE_PATHS.CONSOLE(), element: <ConsoleMainPage /> },
      {
        path: CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION(),
        element: <ConsoleAddProductPage />,
      },
    ],
  },
];

export default privateRoutes;
