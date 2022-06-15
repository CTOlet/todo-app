import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './config/i18n';
import { Router, Outlet } from '@tanstack/react-location';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { Location, Toast, QueryClient } from './config';
import { Routes } from './routes';
import { Error } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <QueryClientProvider client={QueryClient}>
        <Toaster toastOptions={Toast.options} />
        <Router location={Location} routes={Routes}>
          <Outlet />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
