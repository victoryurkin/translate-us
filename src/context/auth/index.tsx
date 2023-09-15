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

export interface AuthUser {
  uid: string;
  email: string;
  isAnonymous: boolean;
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
  accessToken?: string;
  signIn: (username: string, password: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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
};

const AuthContext = createContext(initialState);

enum DispatchTypes {
  SET_ERROR,
  SET_LOADING,
  SET_AUTH_USER,
  SET_ACCESS_TOKEN,
  SET_AUTH_USER_ACCESS_TOKEN,
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
        authUser: payload as AuthUser,
      };
    case DispatchTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload as string,
      };
    case DispatchTypes.SET_AUTH_USER_ACCESS_TOKEN:
      return {
        ...state,
        authUser: (
          payload as {
            authUser: AuthUser;
            accessToken: string;
          }
        ).authUser,
        accessToken: (
          payload as {
            authUser: AuthUser;
            accessToken: string;
          }
        ).accessToken,
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
      const accessToken = await userCredential.user.getIdToken();
      if (accessToken) {
        dispatch({
          type: DispatchTypes.SET_ACCESS_TOKEN,
          payload: accessToken,
        });
      }
    }
  };

  const signInAsGuest = async () => {
    const userCredential = await authService.signInAsGuest();
    if (userCredential?.user) {
      const accessToken = await userCredential.user.getIdToken();
      await userService.createUser(
        userCredential.user.uid,
        userCredential.user.email || '',
      );
      dispatch({
        type: DispatchTypes.SET_AUTH_USER_ACCESS_TOKEN,
        payload: {
          authUser: userCredential.user,
          accessToken: accessToken,
        },
      });
    }
  };

  const signUp = async (username: string, password: string) => {
    const userCredential = await authService.signUp(username, password);
    if (userCredential?.user) {
      const accessToken = await userCredential.user.getIdToken();
      await userService.createUser(
        userCredential.user.uid,
        userCredential.user.email || '',
      );
      dispatch({
        type: DispatchTypes.SET_AUTH_USER_ACCESS_TOKEN,
        payload: {
          authUser: userCredential.user,
          accessToken: accessToken,
        },
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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          const accessToken = await user.getIdToken();
          dispatch({
            type: DispatchTypes.SET_AUTH_USER_ACCESS_TOKEN,
            payload: {
              authUser: user,
              accessToken: accessToken,
            },
          });
        } else {
          // dispatch({
          //   type: DispatchTypes.SET_AUTH_USER_ACCESS_TOKEN,
          //   payload: {
          //     authUser: undefined,
          //     accessToken: undefined,
          //   },
          // });
          signInAsGuest();
        }
      } catch (error) {
        console.log('Error getting user: ', error);
      } finally {
        dispatch({
          type: DispatchTypes.SET_LOADING,
          payload: false,
        });
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
