import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from 'pages/WelcomePage/WelcomePage';
import AuthenticationPage from 'pages/AuthenticationPage/AuthenticationPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import TopLayout from 'layouts/TopLayout/TopLayout';

import styles from 'App.module.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TopLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="authen" element={<AuthenticationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
