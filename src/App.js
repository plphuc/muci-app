import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from 'pages/WelcomePage/WelcomePage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import TopLayout from 'layouts/TopLayout/TopLayout';
import LoginPage from 'pages/LoginPage/LoginPage';

import styles from 'App.module.css';
import RegisterPage from 'pages/RegisterPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TopLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
