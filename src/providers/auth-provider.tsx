import { useReducer, createContext, useMemo, PropsWithChildren, useEffect } from 'react';

import { UserCredential, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@firebase/config';

const enum REDUCER_ACTION_TYPE {
  SET_USER_DATA,
  RESET_USER_DATA,
}

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_USER_DATA; payload: { user: UserCredential['user'] } }
  | { type: REDUCER_ACTION_TYPE.RESET_USER_DATA; payload: Record<string, never> };

const initState = {
  auth: {} as UserCredential['user'],
};

type InitState = typeof initState;

const reducer = (state: InitState = initState, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_USER_DATA: {
      return {
        ...state,
        auth: action.payload.user,
      };
    }
    case REDUCER_ACTION_TYPE.RESET_USER_DATA: {
      return {
        ...state,
        auth: initState.auth,
      };
    }
    default: {
      return state;
    }
  }
};

interface IAuthContext {
  state: InitState;
  setUserData: (userData: UserCredential['user']) => void;
  resetUserData: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  state: initState,
  setUserData: () => {},
  resetUserData: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const setUserData = (userCredential: UserCredential['user']) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_USER_DATA,
      payload: { user: userCredential },
    });
  };

  const resetUserData = () => {
    dispatch({
      type: REDUCER_ACTION_TYPE.RESET_USER_DATA,
      payload: {},
    });
  };

  const contextValue: IAuthContext = useMemo(() => {
    return {
      state,
      setUserData,
      resetUserData,
    };
  }, [state]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
