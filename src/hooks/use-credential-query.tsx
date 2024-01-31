import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { authService } from '@src/lib/firebase/AuthService';

import { QUERY_KEYS } from '@constants/query-keys';

function useCredentialFirebaseQuery(email: string, password: string) {
  const signInUser = useSuspenseQuery({
    queryKey: QUERY_KEYS.AUTH.USER(),
    queryFn: () => authService.login(email, password),
  });

  const signUpUser = useMutation({ mutationFn: () => authService.signUp(email, password) });

  return { signInUser, signUpUser };
}

export default useCredentialFirebaseQuery;
