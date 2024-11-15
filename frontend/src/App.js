import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Provider as ProviderRollbar,
  ErrorBoundary,
} from '@rollbar/react';
import ErrorPage from './components/pages/errorPage.jsx';
import LoginPage from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import routes from './utils/routes.js';
import { ToastContainer } from 'react-toastify';
//import { AuthProvider } from './hooks/authProvider.jsx';
import ru from './utils/locales';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const App = () => {
  const resources = {
    ru: {
      translation: ru,
    },
  };

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_TOKEN_ACCESS,
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
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.chat} element={<ChatPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter >
      </ProviderRollbar >
    </div>
  );
}

export default App;
