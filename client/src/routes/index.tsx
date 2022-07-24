import { Route } from '@tanstack/react-location';

const publicRoutes: Route[] = [
  {
    path: '/',
    element: () =>
      import('@tanstack/react-location').then(({ Navigate }) => (
        <Navigate to='/sign-in' />
      )),
  },
  {
    path: '/sign-in',
    element: () => import('../pages/sign-in').then(({ SignIn }) => <SignIn />),
  },
  {
    path: '/sign-up',
    element: () => import('../pages/sign-up').then(({ SignUp }) => <SignUp />),
  },
  {
    path: '*',
    element: () =>
      import('../pages/not-found').then(({ NotFound }) => <NotFound />),
  },
];

const protectedRoutes: Route[] = [
  {
    path: '/',
    element: () =>
      import('@tanstack/react-location').then(({ Navigate }) => (
        <Navigate to='/todos' />
      )),
  },
  {
    path: '/todos',
    element: () => import('../pages/todos').then(({ Todos }) => <Todos />),
  },
  {
    path: '*',
    element: () =>
      import('../pages/not-found').then(({ NotFound }) => <NotFound />),
  },
];

export { publicRoutes, protectedRoutes };
