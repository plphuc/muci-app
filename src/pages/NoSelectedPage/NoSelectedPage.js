import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { resetToken } from 'slices/tokenSlice'
import { logoutUser } from 'slices/userSlice'
import styles from './NoSelectedPage.module.css'
import { useContext, useMemo } from 'react'
import { collapseSidebarContext } from 'pages/HomePage/HomePage'
import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader'

function NoSelectedPage(props) {
    const { isCollapsed, setIsCollapsed } = useContext(collapseSidebarContext)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(resetToken())
        dispatch(logoutUser())
        navigate('/')
    }

    const headerOptions = useMemo(() => {
        return [
            {
                key: '1',
                label: (
                    <p
                        className="min-w-28 font-semibold text-2xl"
                        onClick={handleLogout}
                    >
                        Logout
                    </p>
                ),
            },
        ]
    }, [])
    
    const handleCollapseBar = (e) => {
        e.stopPropagation()
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            {isCollapsed && (
                <div className={styles.expandBtn} onClick={handleCollapseBar}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            )}
            <div
                className={classNames(
                    styles.btnContainer,
                    styles.moreActionsWrapper
                )}
            >
                <div className={styles.moreActionsContainer}>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        width="18px"
                        height="18px"
                    />
                    <div className=" flex justify-end mr-8 mt-8">
                        <div>
                            <OptionsHeader items={headerOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <img
                    src="https://i.ibb.co/Xkjr69x/background.png"
                    alt="no selected page"
                />
            </div>
        </>
    )
}

export default NoSelectedPage
