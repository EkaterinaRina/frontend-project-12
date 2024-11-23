import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Provider as ProviderRollbar,
  ErrorBoundary,
} from '@rollbar/react';
import i18next from 'i18next';
import { ToastContainer } from 'react-toastify';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import ErrorPage from './components/pages/ErrorPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import routes from './utils/routes.js';
import ru from './utils/locales';
import SignUp from './components/pages/SignUp.jsx';
import Header from './components/pages/Header.jsx';
import PrivateRoute from './utils/privateRoute.jsx';

const App = () => {
  const resources = {
    ru: {
      translation: ru,
    },
  };

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

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
          </BrowserRouter>
        </ErrorBoundary>
      </ProviderRollbar>
    </div>
  );
};

export default App;
