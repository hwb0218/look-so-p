import { Navigate, RouteObject } from 'react-router-dom';

import { GlobalLayout } from '@components/layout/global-nav-layout';

import { Private } from '@pages/index';

import { ROUTE_PATHS } from '@constants/routes';

const privateRoutes: RouteObject = {
  path: '/auth',
  element: <GlobalLayout />,
  children: [
    { index: true, element: <Private /> },
    { path: '*', element: <Navigate to={ROUTE_PATHS.LOGIN} replace /> },
  ],
};

export default privateRoutes;
