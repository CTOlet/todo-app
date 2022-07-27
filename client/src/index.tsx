import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { configureAxios } from './config/axios';
import { configureI18n } from './config/i18n';
import { toastOptions } from './config/react-hot-toast';
import { queryClient } from './config/react-query';
import { Error, NotFound, Todos } from './pages';
import { store } from './services';
import { Container, Dialog, withAuth } from './components';
import { configureTokenRefresh } from './config/token-refresh';
import {
  useRoutes,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { SignIn, SignUp } from './pages';

configureTokenRefresh();
configureAxios();
configureI18n();

const App = () => {
  const isAuthenticated = store.useState((s) => s.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/todos' />} />
        <Route path='/todos' element={withAuth(<Todos />)} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
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
