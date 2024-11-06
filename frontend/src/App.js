import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/pages/errorPage.jsx';
import LoginPage from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import routes from './utils/routes.js';
//import { AuthProvider } from './hooks/authProvider.jsx';
import ru from './utils/locales';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from './store/store.js';

const App = () => {
  const resources = {
    ru: {
      translation: ru,
    },
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
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.chat} element={<ChatPage />} />
          </Routes>
        </div>
      </BrowserRouter >
    </Provider>
  );
}

export default App;
