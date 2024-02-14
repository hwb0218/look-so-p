import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/lib/firebase/config';

import { getLocalStorage } from '@src/utils/local-storage';
import { useAuthContext } from '@providers/auth';
import { authService } from '@src/lib/firebase/AuthService';

export default function useCheckAuth() {
  const [accessUid, setAccessUid] = useState(getLocalStorage({ key: 'auth' }));

  const { setAuth } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAccessUid('');
      } else {
        setAccessUid(getLocalStorage({ key: 'auth' }));
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getUser();

        if (user) {
          setAuth(user);
        }
      } catch (error) {
        setAccessUid('');
      }
    };

    if (accessUid) {
      fetchUser();
    }
  }, [accessUid]);

  return accessUid;
}
