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
  const signIn = _useSignIn();
  const signOut = _useSignOut();
  const refresh = _useRefresh();

  const accessToken = signIn.data?.data?.accessToken;
  const { id, username } = decodeJWT<AccessTokenPayload>(accessToken!);

  const user = {
    id,
    username,
    accessToken,
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        refresh,
        user,
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
  user?: { id?: string; username?: string; accessToken?: string };
}>({});

export { AuthContext, AuthProvider };
