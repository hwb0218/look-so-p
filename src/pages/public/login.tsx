import { useNavigate } from 'react-router-dom';

import useCheckAuth from '@hooks/use-check-auth';

import { Login } from '@components/login';
import { ROUTE_PATHS } from '@constants/routes';
import { useEffect } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const ready = useCheckAuth();

  useEffect(() => {
    if (ready) {
      return navigate(ROUTE_PATHS.HOME);
    }
  }, [ready, navigate]);

  return <Login />;
}
