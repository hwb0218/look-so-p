import { RouteObject } from 'react-router-dom';

import { GlobalLayout } from '@components/layout/nav-layout';

import { Home, Login, SignUp, ProductAll } from '@pages/public';

import { ROUTE_PATHS } from '@constants/routes';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTE_PATHS.SIGNUP, element: <SignUp /> },
      { path: ROUTE_PATHS.PRODUCT_ALL, element: <ProductAll /> },
      { path: ROUTE_PATHS.LOGIN, element: <Login /> },
    ],
  },
];

export default publicRoutes;
