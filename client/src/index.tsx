import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, Router } from '@tanstack/react-location';
import { configureAxios } from './config/axios';
import { configureI18n } from './config/i18n';
import { routes, location } from './config/react-location';
import { toastOptions } from './config/react-hot-toast';
import { queryClient } from './config/react-query';
import { Error } from './pages';

configureAxios();
configureI18n();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={toastOptions} />
        <Router location={location} routes={routes}>
          <Outlet />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
