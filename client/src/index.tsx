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
import { withAuth, Container, Dialog } from './components';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { SignIn, SignUp } from './pages';
import { AuthProvider } from './context';

configureAxios();
configureI18n();

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Toaster toastOptions={toastOptions} />
      <Dialog />
      <Container width='2xl'>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/todos' />} />
            <Route path='/todos' element={withAuth(<Todos />)} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </ErrorBoundary>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
