import React, {
  createContext,
  FC,
  useMemo,
  useReducer,
  useContext,
} from 'react';
import { Loader } from '@translate-us/components';
import { log } from '@translate-us/clients';
import uuid from 'react-native-uuid';

/**
 * The User state property
 */
export interface AppState {
  isLoading: boolean;
  sessionId?: string;
  setLoading: (value: boolean) => void;
}

const initialState: AppState = {
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading: (value: boolean) => {
    console.warn('No App provider found');
  },
};

const AppContext = createContext(initialState);

enum DispatchTypes {
  SET_LOADING,
  SET_SESSION_ID,
}

interface DispatchProps {
  type: DispatchTypes;
  payload?: unknown;
}

const reducer = (state: AppState, { type, payload }: DispatchProps) => {
  switch (type) {
    case DispatchTypes.SET_LOADING:
      return {
        ...state,
        isLoading: payload as boolean,
      };
    case DispatchTypes.SET_SESSION_ID:
      return {
        ...state,
        sessionId: payload as string,
      };
    default:
      return state;
  }
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const { isLoading } = appState;

  const providerValue = useMemo(() => {
    const setLoading = (value: boolean) => {
      dispatch({ type: DispatchTypes.SET_LOADING, payload: value });
    };
    return {
      ...appState,
      setLoading,
    };
  }, [appState]);

  React.useEffect(() => {
    const sessionId = uuid.v4();
    log.setContext({ sessionId });
    log.info('Session started');
    log.event('session_started');
    dispatch({
      type: DispatchTypes.SET_SESSION_ID,
      payload: sessionId,
    });
  }, []);

  return (
    <AppContext.Provider value={providerValue}>
      {children}
      <Loader isLoading={isLoading} />
    </AppContext.Provider>
  );
};

// Custom hook to access the user object
export const useApp = () => useContext(AppContext);
