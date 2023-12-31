import auth from '@react-native-firebase/auth';
import React, {
  createContext,
  FC,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { authService, userService } from '@translate-us/services';
import { notifications, AppEvents } from '@translate-us/clients';
import { log } from '@translate-us/clients';

export interface AuthUser {
  uid: string;
  email: string;
  isAnonymous: boolean;
  metadata: {
    creationTime: string;
  };
}

export enum AuthErrorCodes {
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  EMAIL_ALREADY_USED = 'auth/email-already-in-use',
}

export interface AuthError {
  code: AuthErrorCodes;
}

/**
 * The Auth state property been injected to a component using withAuth HOC.
 * @example
 * interface Props {
 *  authState: AuthState;
 * }
 */
export interface AuthState {
  isLoading: boolean;
  error?: Error;
  authUser?: AuthUser;
  signIn: (username: string, password: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getAccessToken: () => Promise<string>;
}

const initialState: AuthState = {
  isLoading: true,
  signIn: async () => {
    console.log('AuthProvider was not setup');
  },
  signInAsGuest: async () => {
    console.log('AuthProvider was not setup');
  },
  signUp: async () => {
    console.log('AuthProvider was not setup');
  },
  signOut: async () => {
    console.log('AuthProvider was not setup');
  },
  resetPassword: async () => {
    console.log('AuthProvider was not setup');
  },
  getAccessToken: async () => {
    console.log('AuthProvider was not setup');
    return '';
  },
};

const AuthContext = createContext(initialState);

enum DispatchTypes {
  SET_ERROR,
  SET_LOADING,
  SET_AUTH_USER,
}

interface DispatchProps {
  type: DispatchTypes;
  payload: unknown;
}

const reducer = (state: AuthState, { type, payload }: DispatchProps) => {
  switch (type) {
    case DispatchTypes.SET_LOADING:
      return {
        ...state,
        isLoading: payload as boolean,
      };
    case DispatchTypes.SET_ERROR:
      return {
        ...state,
        error: payload as Error,
      };
    case DispatchTypes.SET_AUTH_USER:
      return {
        ...state,
        isLoading: false,
        authUser: payload as AuthUser,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Context Provider
 * @returns JSX.Element
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const signIn = async (username: string, password: string) => {
    const userCredential = await authService.signIn(username, password);
    if (userCredential?.user) {
      dispatch({
        type: DispatchTypes.SET_AUTH_USER,
        payload: userCredential.user,
      });
    }
  };

  const signInAsGuest = async () => {
    const userCredential = await authService.signInAsGuest();
    if (userCredential?.user) {
      await userService.createUser(
        userCredential.user.uid,
        userCredential.user.email || '',
      );
      dispatch({
        type: DispatchTypes.SET_AUTH_USER,
        payload: userCredential.user,
      });
    }
  };

  const signUp = async (username: string, password: string) => {
    const userCredential = await authService.signUp(username, password);
    if (userCredential?.user) {
      await userService.createUser(
        userCredential.user.uid,
        userCredential.user.email || '',
      );
      dispatch({
        type: DispatchTypes.SET_AUTH_USER,
        payload: userCredential.user,
      });
    }
  };

  const signOut = async () => {
    await authService.signOut();
    notifications.emit(AppEvents.AUTH_SIGN_OUT);
  };

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email);
  };

  const getAccessToken = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const accessToken = await user.getIdToken(true);
        return accessToken;
      }
    } catch (error) {
      log.error('Error getting access token: ', error);
    }
    return '';
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          log.setContext({
            uid: user.uid,
          });
          log.event('auth_sign_in');
          dispatch({
            type: DispatchTypes.SET_AUTH_USER,
            payload: user,
          });
        } else {
          await signInAsGuest();
        }
      } catch (error) {
        log.error('Error getting user: ', error);
      }
    });

    return subscriber;
  }, []);

  const providerValue = useMemo(
    () => ({
      ...authState,
      signIn,
      signInAsGuest,
      signUp,
      signOut,
      resetPassword,
      getAccessToken,
    }),
    [authState],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  authState: AuthState;
}

/**
 * HOC to consume a Auth Context. Injects authState property into component's properties.
 * Use it with any component under the component level where withAuthProvider was used.
 * @returns JSX.Element
 * @example export default withAuth(MyComponent);
 */
export const withAuth =
  <P extends AuthContextProps>(condition: (authState: AuthState) => boolean) =>
  (Component: FC<P>) =>
  (props: P) => {
    return (
      <AuthContext.Consumer>
        {context =>
          condition(context) ? (
            <Component {...props} authState={context} />
          ) : null
        }
      </AuthContext.Consumer>
    );
  };

/**
 * HOC condition to return nested component when user is authenticated
 * @returns JSX.Element
 * @example export default withUser(isLoaded)(MyComponent);
 */
export const isAuthenticated = (authState: AuthState) => !!authState.authUser;

/**
 * HOC condition to return nested component when user is not authenticated
 * @returns JSX.Element
 * @example export default withUser(isLoaded)(MyComponent);
 */
export const isNotAuthenticated = (authState: AuthState) => !authState.authUser;

// Custom hook to access the auth
export const useAuth = () => useContext(AuthContext);
