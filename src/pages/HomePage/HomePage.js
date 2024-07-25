import { Outlet, useNavigate, useParams } from 'react-router-dom'

import SidebarSection from './components/SidebarSection/SidebarSection.js'

import styles from './HomePage.module.css'
import classNames from 'classnames'
import { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAccessToken, selectAccessToken } from 'slices/tokenSlice.js'
import { useGetAccessTokenQuery } from 'slices/tokenApiSlice.js'
import {
    saveUserInfo,
    selectUserInfo,
    useLazyGetUserQuery,
} from 'slices/userSlice.js'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward } from '@fortawesome/free-solid-svg-icons'

export const collapseSidebarContext = createContext()

function HomePage(props) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const userInfo = useSelector(selectUserInfo)
    const { username } = useParams()

    const refreshToken = localStorage.getItem('refreshToken')

    const { refetch: getAccessToken } = useGetAccessTokenQuery(refreshToken)
    const [getUserInfo] = useLazyGetUserQuery()

    const handleCollapseBar = (e) => {
        e.stopPropagation()
        setIsCollapsed(!isCollapsed)
    }

    useEffect(() => {
        // request new access token when reload
        if (!accessToken && refreshToken) {
            getAccessToken()
                .unwrap()
                .then((res) => {
                    dispatch(saveAccessToken(res.accessToken))

                    getUserInfo(res.accessToken)
                        .unwrap()
                        .then((res) => {
                            dispatch(saveUserInfo(res))
                        })
                })
        }
        if (!refreshToken) {
            navigate('/')
        }
    }, [refreshToken])

    return (
        <collapseSidebarContext.Provider
            value={{ isCollapsed, setIsCollapsed }}
        >
            <div className={styles.wrapper}>
                {isCollapsed ? (
                    <FontAwesomeIcon
                        className={classNames(
                            styles.noCollapseWrapper,
                            'p-4 text-[#37352f73] cursor-pointer hover:bg-[#0000001a] rounded-md'
                        )}
                        icon={faForward}
                        onClick={handleCollapseBar}
                    />
                ) : (
                    <nav
                        className={classNames(styles.navWrapper, {
                            [styles.collapseWrapper]: isCollapsed,
                            [styles.noCollapseWrapper]: !isCollapsed,
                        })}
                    >
                        <SidebarSection />
                    </nav>
                )}
                <main className="w-full flex flex-col">
                    {username === userInfo?.username ? (
                        <Outlet />
                    ) : (
                        <NotFoundPage />
                    )}
                </main>
            </div>
        </collapseSidebarContext.Provider>
    )
}

export default HomePage
