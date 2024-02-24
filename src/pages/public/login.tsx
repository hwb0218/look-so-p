import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useCheckAuth from '@hooks/use-check-auth';

import { Login } from '@components/login';
import { ROUTE_PATHS } from '@constants/routes';
import { Meta } from '@components/common/meta';

export default function LoginPage() {
  const navigate = useNavigate();
  const ready = useCheckAuth();

  useEffect(() => {
    if (ready) {
      return navigate(ROUTE_PATHS.HOME);
    }
  }, [ready, navigate]);

  return (
    <>
      <Meta title="로그인 - LookSoPrt" url={ROUTE_PATHS.LOGIN} desc="로그인" />
      <Login />
    </>
  );
}
