import { useReducer, createContext, useMemo, PropsWithChildren } from 'react';

import { DocumentData } from 'firebase/firestore';

const enum REDUCER_ACTION_TYPE {
  SET_AUTH,
  RESET_AUTH,
  SET_IS_LOGGED_IN,
}

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_AUTH; payload: DocumentData }
  | { type: REDUCER_ACTION_TYPE.RESET_AUTH; payload: Record<string, never> }
  | { type: REDUCER_ACTION_TYPE.SET_IS_LOGGED_IN; payload: boolean };

const initState = {
  auth: {} as DocumentData,
  isLoggedIn: false,
};

type InitState = typeof initState;

const reducer = (state: InitState = initState, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_AUTH: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case REDUCER_ACTION_TYPE.RESET_AUTH: {
      return initState;
    }
    case REDUCER_ACTION_TYPE.SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
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
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  state: initState,
  setAuth: () => {},
  resetAuth: () => {},
  setIsLoggedIn: () => {},
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

  const setIsLoggedIn = (isLoggedIn: boolean) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_IS_LOGGED_IN,
      payload: isLoggedIn,
    });
  };

  const contextValue: IAuthContext = useMemo(() => {
    return {
      state,
      setAuth,
      resetAuth,
      setIsLoggedIn,
    };
  }, [state]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
