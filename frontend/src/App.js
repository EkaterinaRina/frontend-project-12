import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Provider as ProviderRollbar,
  ErrorBoundary,
} from '@rollbar/react';
import ErrorPage from './components/pages/ErrorPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import routes from './utils/routes.js';
import { ToastContainer } from 'react-toastify';
//import { AuthProvider } from './hooks/authProvider.jsx';
import ru from './utils/locales';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import SignUp from './components/pages/SignUp.jsx';
import { useSelector } from 'react-redux';
import Header from './components/pages/Header.jsx';

const App = () => {
  const resources = {
    ru: {
      translation: ru,
    },
  };

  const rollbarConfig = {
    accessToken: 'f8f6a5585c304eb5b5e96dc3bd470e36',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };


  const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
      return <Navigate to='/login' />
    }
    return children;
  }

  i18next.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <ProviderRollbar config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path={routes.chat} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
              <Route path="*" element={<ErrorPage />} />
              <Route path={routes.login} element={<LoginPage />} />
              <Route path={routes.signup} element={<SignUp />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter >
        </ErrorBoundary>
      </ProviderRollbar >
    </div>
  );
}

export default App;
