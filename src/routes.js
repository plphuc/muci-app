import TopLayout from 'layouts/TopLayout/TopLayout'
import MainSection from 'pages/HomePage/components/MainSection/MainSection'
import TimerFeature from 'pages/HomePage/components/SidebarSection/TimerFeature/TimerFeature'
import HomePage from 'pages/HomePage/HomePage'
import LoginPage from 'pages/LoginPage/LoginPage'
import NoSelectedPage from 'pages/NoSelectedPage/NoSelectedPage'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import RegisterPage from 'pages/RegisterPage/RegisterPage'
import WelcomePage from 'pages/WelcomePage/WelcomePage'
import { createBrowserRouter } from 'react-router-dom'

const routers = createBrowserRouter([
    {
        path: '/',
        element: <TopLayout />,
        children: [
            {
                path: '',
                element: <WelcomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
    {
        path: '/:username',
        element: <HomePage />,
        children: [
            {
                path: '/:username/timer',
                element: <TimerFeature />,
            },
            {
                path: '/:username/',
                element: <MainSection />,
            },
        ],
    },
])

export default routers
