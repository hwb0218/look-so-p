import { RouteObject } from 'react-router-dom';

import { GlobalNavLayout } from '@components/layout/global-nav-layout';

import { HomePage, LoginPage, SignUpPage, GoodsSearchPage, GoodsByCategoryPage, GoodsDetailPage } from '@pages/public';
import {
  ConsoleAddProductPage,
  ConsoleMainPage,
  ConsoleOrderManagementPage,
  OrderListPage,
  OrderPage,
} from '@pages/private';

import { AUTH_ROUTE_PATHS, CONSOLE_ROUTE_PATHS, ROUTE_PATHS } from '@constants/routes';
import { ConsoleLayout, ProtectedAdminLayout, ProtectedLayout } from '@components/layout';

import NotFound from './not-found';

const routes: RouteObject[] = [
  {
    element: <GlobalNavLayout />,
    children: [
      { path: ROUTE_PATHS.HOME, element: <HomePage /> },
      {
        path: ROUTE_PATHS.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: ROUTE_PATHS.SEARCH,
        element: <GoodsSearchPage />,
      },
      {
        path: ROUTE_PATHS.GOODS_LIST,
        element: <GoodsByCategoryPage />,
      },
      {
        path: ROUTE_PATHS.GOODS_DETAIL(),
        element: <GoodsDetailPage />,
      },
    ],
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedLayout>
        <GlobalNavLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: AUTH_ROUTE_PATHS.ORDER,
        element: <OrderPage />,
      },
      {
        path: AUTH_ROUTE_PATHS.ORDER_LIST,
        element: <OrderListPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedAdminLayout>
        <ConsoleLayout />
      </ProtectedAdminLayout>
    ),
    children: [
      {
        path: CONSOLE_ROUTE_PATHS.CONSOLE(),
        element: <ConsoleMainPage />,
      },
      {
        path: CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION(),
        element: <ConsoleAddProductPage />,
      },
      {
        path: CONSOLE_ROUTE_PATHS.ORDER_MANAGEMENT(),
        element: <ConsoleOrderManagementPage />,
      },
    ],
  },
  {
    path: '/',
    element: <NotFound />,
  },
];

export default routes;
