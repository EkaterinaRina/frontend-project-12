import React from 'react';
import ReactDOM from 'react-dom/client';
import filter from 'leo-profanity';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.js';
import store from './store/store.js';

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

