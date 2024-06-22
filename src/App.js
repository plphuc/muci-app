import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WelcomePage from 'pages/WelcomePage/WelcomePage'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import TopLayout from 'layouts/TopLayout/TopLayout'
import LoginPage from 'pages/LoginPage/LoginPage'
import RegisterPage from 'pages/RegisterPage/RegisterPage'
import HomePage from 'pages/HomePage/HomePage'
import TimerFeature from 'pages/HomePage/components/SidebarSection/TimerFeature/TimerFeature'
import MainSection from 'pages/HomePage/components/MainSection/MainSection'

// import styles from 'App.module.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes path="/">
                    <Route element={<TopLayout />}>
                        <Route index element={<WelcomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                    </Route>
                    <Route path="/:username" element={<HomePage />}>
                        <Route path="" element={<MainSection />}></Route>
                        <Route
                            path="/:username/timer"
                            element={<TimerFeature />}
                        ></Route>
                    </Route>


                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
