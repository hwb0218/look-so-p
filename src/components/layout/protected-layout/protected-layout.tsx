import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '@providers/auth';

import { ROUTE_PATHS } from '@constants/routes';

function ProtectedLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const { state } = useAuthContext();

  if (!state.auth?.uid) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedLayout;
