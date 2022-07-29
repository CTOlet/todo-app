import { createContext, ReactNode } from 'react';
import {
  _useRefresh,
  _useSignIn,
  _useSignOut,
  _useSignUp,
} from '../hooks/use-auth';
import { AccessTokenPayload } from '../types/access-token';
import { decodeJWT } from '../utils';

// auth provider for useMutation hooks to share state between components

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signUp = _useSignUp();
  const signIn = _useSignIn({
    onMutate: () => {
      refresh.reset();
    },
  });
  const signOut = _useSignOut();
  const refresh = _useRefresh();

  const accessToken =
    signIn.data?.data?.accessToken || refresh.data?.data?.accessToken;

  const user = accessToken
    ? decodeJWT<AccessTokenPayload>(accessToken)
    : undefined;

  const isLoading = signIn.isLoading || refresh.isLoading;
  const isError = signIn.isError || refresh.isError;
  const isSuccess = signIn.isSuccess || refresh.isSuccess;

  console.log(isLoading, isError, isSuccess);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        refresh,
        accessToken,
        user,
        isLoading,
        isError,
        isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthContext = createContext<{
  signUp?: ReturnType<typeof _useSignUp>;
  signIn?: ReturnType<typeof _useSignIn>;
  signOut?: ReturnType<typeof _useSignOut>;
  refresh?: ReturnType<typeof _useRefresh>;
  accessToken?: string;
  user?: AccessTokenPayload;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}>({});

export { AuthContext, AuthProvider };
