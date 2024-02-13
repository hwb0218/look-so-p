import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/lib/firebase/config';

import { getLocalStorage, removeLocalStorage } from '@src/utils/local-storage';
import { useAuthContext } from '@providers/auth';

export default function useCheckAuth() {
  const ready = getLocalStorage({ key: 'auth' });
  const { setAuth } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return removeLocalStorage({ key: 'auth' });
      }
    });
  }, []);

  useEffect(() => {
    const savedUser = getLocalStorage({ key: 'auth' });

    if (savedUser) {
      setAuth(savedUser);
    }
  }, []);

  return ready;
}
