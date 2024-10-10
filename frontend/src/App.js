import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages.errorPage.jsx';
import LoginPage from '.components/pages/loginPage.jsx';
import ChatPage from '.components/pages/ChatPage.jsx';
import routes from './components/utils/routes.js';

function App() {
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
