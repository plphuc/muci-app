import TopLayout from 'layouts/TopLayout/TopLayout'
import TimerFeature from 'pages/HomePage/components/SidebarSection/TimerFeature/TimerFeature'
import HomePage from 'pages/HomePage/HomePage'
import LoginPage from 'pages/LoginPage/LoginPage'
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
                path: '/:username',
                element: <HomePage />,
                children: [
                    {
                        path: '/:username/timer',
                        element: <TimerFeature />,
                    },
                ],
            },
            {
                path: '/*',
                element: <NotFoundPage />,
            },
        ],
    },
])

export default routers
