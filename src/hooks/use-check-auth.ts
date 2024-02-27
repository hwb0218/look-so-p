import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/lib/firebase/config';

import { getLocalStorage } from '@src/utils/local-storage';
import { useAuthContext } from '@providers/auth';
import { authService } from '@src/lib/firebase/AuthService';

import type { User } from '@src/lib/firebase/types';

export default function useCheckAuth() {
  const [accessUid, setAccessUid] = useState(getLocalStorage({ key: 'auth' }));

  const { setAuth } = useAuthContext();
  // user 인증정보 아직 남아있으면 새로고침 시 로그인 상태 유지해줌
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAccessUid('');
      } else {
        setAccessUid(getLocalStorage({ key: 'auth' }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // 나쁜놈이 로컬날리면 다시 복구함
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessUid]);

  return accessUid as User;
}
