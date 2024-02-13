import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from '@constants/routes';
import useCheckAuth from '@hooks/use-check-auth';

function ProtectedLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const ready = useCheckAuth();

  if (!ready) {
    <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedLayout;
