import { RouteObject } from 'react-router-dom';

import { GlobalNavLayout } from '@components/layout/global-nav-layout';

import { HomePage, LoginPage, SignUpPage, ProductAllPage } from '@pages/public';

import { ROUTE_PATHS } from '@constants/routes';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalNavLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTE_PATHS.SIGNUP, element: <SignUpPage /> },
      { path: ROUTE_PATHS.PRODUCT_ALL, element: <ProductAllPage /> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
    ],
  },
];

export default publicRoutes;
