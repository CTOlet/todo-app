import { ReactNode, useEffect } from 'react';
import { useAuth } from '../hooks/use-auth/use-auth';
import { SignIn } from '../pages';
import { Spinner } from './spinner';

const withAuth = (component: ReactNode) => {
  const { signIn } = useAuth();

  useEffect(() => {
    signIn?.mutate();
  }, []);

  console.log(signIn?.error);

  return signIn?.isLoading ? (
    <div className='absolute top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center text-center text-gray-300'>
      <Spinner />
    </div>
  ) : signIn?.isError ? (
    <SignIn />
  ) : signIn?.isSuccess ? (
    component
  ) : null;
};

export { withAuth };
