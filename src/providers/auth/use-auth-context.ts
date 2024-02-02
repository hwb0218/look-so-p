import { useContext } from 'react';
import { AuthContext } from './auth-provider';

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
