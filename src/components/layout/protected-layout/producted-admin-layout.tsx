import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTE_PATHS } from '@constants/routes';
import useCheckAuth from '@hooks/use-check-auth';

function ProtectedAdminLayout({ children }: PropsWithChildren) {
  const ready = useCheckAuth();

  if (!ready) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (!ready.isSeller) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return children;
}

export default ProtectedAdminLayout;
