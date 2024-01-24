import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { GlobalLayout } from '@components/layout/global-nav-layout';

import { Main, Login } from '@pages/index';

import { ROUTE_PATHS } from '@constants/routes';

const publicRoutes: RouteObject = {
  path: '/',
  element: <GlobalLayout />,
  children: [
    { index: true, element: <Main /> },
    { path: ROUTE_PATHS.LOGIN, element: <Login /> },
    { path: '*', element: <Navigate to={ROUTE_PATHS.LOGIN} replace /> },
  ],
};

export default publicRoutes;
