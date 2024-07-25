import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import App from './App.js';
import store from 'slices/store.js';
import './index.css';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }}><App /></ConfigProvider>
    </Provider>
  </React.StrictMode>
);
