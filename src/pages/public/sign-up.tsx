import { Meta } from '@components/common/meta';
import Spinner from '@components/common/spinner/spinner';
import { SignUp as SignUpComponent } from '@components/sign-up';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';

import { ROUTE_PATHS } from '@constants/routes';

function SignUp() {
  return (
    <>
      <Meta title="회원가입 - LookSoPrt" url={ROUTE_PATHS.SIGNUP} desc="회원가입" />
      <SignUpComponent />
    </>
  );
}

const SignUpPage = WithQueryAsyncBoundary(SignUp, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default SignUpPage;
