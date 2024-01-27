import { PropsWithChildren, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '@providers/auth-provider';

import { ROUTE_PATHS } from '@constants/routes';

function ProtectedLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const {
    state: { auth },
  } = useContext(AuthContext);

  if (!auth?.uid) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedLayout;
