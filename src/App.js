import { RouterProvider } from 'react-router-dom'
import routers from 'routes'

// import styles from 'App.module.css';

function App() {
    // return (
    //     <>
    //         <BrowserRouter>
    //             <Routes path="/" element={<TopLayout />}>
    //                 <Route index element={<WelcomePage />} />
    //                 <Route path="login" element={<LoginPage />} />
    //                 <Route path="register" element={<RegisterPage />} />
    //                 <Route path="/:username" element={<HomePage />}>
    //                     <Route index element={<MainSection />}/>
    //                     <Route
    //                         path="/:username/timer"
    //                         element={<TimerFeature />}
    //                     ></Route>
    //                 </Route>
    //                 <Route path="/*" element={<NotFoundPage />} />
    //             </Routes>
    //         </BrowserRouter>
    //     </>
    // )
    return <RouterProvider router={routers}></RouterProvider>
}

export default App
