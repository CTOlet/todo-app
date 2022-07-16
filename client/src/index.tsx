import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, Router } from '@tanstack/react-location';
import { configureAxios } from './config/axios';
import { configureI18n } from './config/i18n';
import {
  location,
  publicRoutes,
  protectedRoutes,
} from './config/react-location';
import { toastOptions } from './config/react-hot-toast';
import { queryClient } from './config/react-query';
import { Error } from './pages';
import { store } from './services';
import { Container, Dialog } from './components';

configureAxios();
configureI18n();

const App = () => {
  const isHydrated = store.useState((s) => s.isHydrated);
  const isAuthenticated = store.useState((s) => s.isAuthenticated);

  return isHydrated ? (
    <Router
      location={location}
      routes={
        isAuthenticated
          ? [...publicRoutes, ...protectedRoutes]
          : [...publicRoutes]
      }
    >
      <Outlet />
    </Router>
  ) : null;
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={toastOptions} />
        <Dialog />
        <Container width='2xl'>
          <App />
        </Container>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
