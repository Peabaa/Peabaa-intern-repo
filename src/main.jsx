/* eslint-disable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css'; // This loads your Tailwind CSS globally!
import './i18n'; // This initializes your translations
import store from './store';

// This finds the <div id="root"> in your HTML and renders the React App inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
