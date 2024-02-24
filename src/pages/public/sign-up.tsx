import { Meta } from '@components/common/meta';
import { SignUp } from '@components/sign-up';

import { ROUTE_PATHS } from '@constants/routes';

export default function SignUpPage() {
  return (
    <>
      <Meta title="회원가입 - LookSoPrt" url={ROUTE_PATHS.SIGNUP} desc="회원가입" />
      <SignUp />
    </>
  );
}
