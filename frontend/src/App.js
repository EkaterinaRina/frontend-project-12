import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages/errorPage.jsx';
import LoginPage from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import routes from './utils/routes.js';
import ru from './utils/locales';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.chat} element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
