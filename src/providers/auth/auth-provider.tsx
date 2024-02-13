import { useReducer, createContext, useMemo, PropsWithChildren } from 'react';

import { DocumentData } from 'firebase/firestore';
import { removeLocalStorage, setLocalStorage } from '@src/utils/local-storage';

const enum REDUCER_ACTION_TYPE {
  SET_AUTH,
  RESET_AUTH,
}

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_AUTH; payload: DocumentData }
  | { type: REDUCER_ACTION_TYPE.RESET_AUTH; payload: Record<string, never> };

const initState = {
  auth: {} as DocumentData,
  isLoggedIn: false,
};

type InitState = typeof initState;

const reducer = (state: InitState = initState, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_AUTH: {
      setLocalStorage({ key: 'auth', value: action.payload });

      return {
        ...state,
        auth: action.payload,
      };
    }
    case REDUCER_ACTION_TYPE.RESET_AUTH: {
      removeLocalStorage({ key: 'auth' });
      return initState;
    }
    default: {
      return state;
    }
  }
};

interface IAuthContext {
  state: InitState;
  setAuth: (userData: DocumentData) => void;
  resetAuth: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  state: initState,
  setAuth: () => {},
  resetAuth: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initState);

  const setAuth = (user: DocumentData) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_AUTH,
      payload: user,
    });
  };

  const resetAuth = () => {
    dispatch({
      type: REDUCER_ACTION_TYPE.RESET_AUTH,
      payload: {},
    });
  };

  const contextValue: IAuthContext = useMemo(() => {
    return {
      state,
      setAuth,
      resetAuth,
    };
  }, [state]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
