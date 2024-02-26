import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useCheckAuth from '@hooks/use-check-auth';

import { Login as LoginComponent } from '@components/login';
import { ROUTE_PATHS } from '@constants/routes';
import { Meta } from '@components/common/meta';
import Spinner from '@components/common/spinner/spinner';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';

function Login() {
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
      <LoginComponent />
    </>
  );
}

const LoginPage = WithQueryAsyncBoundary(Login, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default LoginPage;
