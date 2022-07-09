import { Route } from '@tanstack/react-location';

const authenticatedRoutes: Route[] = [
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

const unauthenticatedRoutes: Route[] = [];

export { authenticatedRoutes, unauthenticatedRoutes };
