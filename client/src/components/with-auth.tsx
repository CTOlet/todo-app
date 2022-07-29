import { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth/use-auth';
import { SignIn } from '../pages';
import { Spinner } from './spinner';

const withAuth = (component: ReactNode) => {
  const { isLoading, isError, isSuccess } = useAuth();

  return isLoading ? (
    <div className='absolute top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center text-center text-gray-300'>
      <Spinner />
    </div>
  ) : isError ? (
    <SignIn />
  ) : isSuccess ? (
    component
  ) : null;
};

export { withAuth };
