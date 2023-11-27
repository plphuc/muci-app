import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from 'pages/WelcomePage/WelcomePage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import TopLayout from 'layouts/TopLayout/TopLayout';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import MainLayout from 'layouts/MainLayout/MainLayout';
// import styles from 'App.module.css';

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route element={<TopLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
          <Route path="/:username" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
