import { RouteObject } from 'react-router-dom';

import { GlobalNavLayout } from '@components/layout/global-nav-layout';

import { HomePage, LoginPage, SignUpPage, GoodsSearchPage, GoodsByCategory, GoodsDetailPage } from '@pages/public';

import { AUTH_ROUTE_PATHS, CONSOLE_ROUTE_PATHS, ROUTE_PATHS } from '@constants/routes';
import { ConsoleLayout, ProtectedAdminLayout, ProtectedLayout } from '@components/layout';
import {
  ConsoleAddProductPage,
  ConsoleMainPage,
  ConsoleOrderManagementPage,
  OrderListPage,
  OrderPage,
} from '@pages/private';

import NotFound from './not-found';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalNavLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTE_PATHS.SIGNUP,
        lazy: async () => {
          const { default: Component } = await SignUpPage();
          return { Component };
        },
      },
      {
        path: ROUTE_PATHS.SEARCH,
        lazy: async () => {
          const { default: Component } = await GoodsSearchPage();
          return { Component };
        },
      },
      {
        path: ROUTE_PATHS.GOODS_LIST,
        lazy: async () => {
          const { default: Component } = await GoodsByCategory();
          return { Component };
        },
      },
      {
        path: ROUTE_PATHS.GOODS_DETAIL(),
        lazy: async () => {
          const { default: Component } = await GoodsDetailPage();
          return { Component };
        },
      },
    ],
  },
  {
    path: ROUTE_PATHS.LOGIN,
    lazy: async () => {
      const { default: Component } = await LoginPage();
      return { Component };
    },
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
        lazy: async () => {
          const { default: Component } = await OrderPage();
          return { Component };
        },
      },
      {
        path: AUTH_ROUTE_PATHS.ORDER_LIST,
        lazy: async () => {
          const { default: Component } = await OrderListPage();
          return { Component };
        },
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
        lazy: async () => {
          const { default: Component } = await ConsoleMainPage();
          return { Component };
        },
      },
      {
        path: CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION(),
        lazy: async () => {
          const { default: Component } = await ConsoleAddProductPage();
          return { Component };
        },
      },
      {
        path: CONSOLE_ROUTE_PATHS.ORDER_MANAGEMENT(),
        lazy: async () => {
          const { default: Component } = await ConsoleOrderManagementPage();
          return { Component };
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
