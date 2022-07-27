import { ReactNode } from 'react';
import { SignIn } from '../pages';
import { store } from '../services';
import { Spinner } from './spinner';

const withAuth = (component: ReactNode) => {
  const isAuthenticated = store.useState((s) => s.isAuthenticated);

  return isAuthenticated === 'PENDING' ? (
    <div className='absolute top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center text-center text-gray-300'>
      <Spinner />
    </div>
  ) : isAuthenticated === 'ERROR' ? (
    <SignIn />
  ) : isAuthenticated === 'SUCCESS' ? (
    component
  ) : null;
};

export { withAuth };
