import React, {
  createContext,
  FC,
  useMemo,
  useReducer,
  useContext,
} from 'react';
import { Loader } from '@translate-us/components';

/**
 * The User state property
 */
export interface AppState {
  isLoading: boolean;
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

  return (
    <AppContext.Provider value={providerValue}>
      {children}
      <Loader isLoading={isLoading} />
    </AppContext.Provider>
  );
};

// Custom hook to access the user object
export const useApp = () => useContext(AppContext);
