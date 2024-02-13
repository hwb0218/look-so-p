import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/lib/firebase/config';

import { getLocalStorage, removeLocalStorage } from '@src/utils/local-storage';
import { useAuthContext } from '@providers/auth';

export default function useCheckAuth() {
  const [ready, setReady] = useState(false);

  const { setAuth } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setReady(false);
        return removeLocalStorage({ key: 'auth' });
      } else {
        setReady(true);
      }
    });
  }, []);

  useEffect(() => {
    const savedUser = getLocalStorage({ key: 'auth' });

    if (savedUser) {
      setAuth(savedUser);
      setReady(true);
    }
  }, []);

  return ready;
}
