import classNames from 'classnames'

import ResizableBar from 'common/components/ResizableBar/ResizableBar'
import SearchFeature from './SearchFeature/SearchFeature'
import SettingFeature from './SettingFeature/SettingFeature'
import NewPageFeature from './NewPageFeature/NewPageFeature'
import TeamSpaceFeature from './TeamSpaceFeature/TeamSpaceFeature'
import TemplatesFeature from './TemplatesFeature/TemplatesFeature'
import ImportFeature from './ImportFeature/ImportFeature'
import TrashFeature from './TrashFeature/TrashFeature'
import DisplayFeature from './DisplayFeature/DisplayFeature'

import AddPageFeature from './AddPageFeature/AddPageFeature'
import { useGetMetaAllPagesQuery } from 'slices/pageApiSlice'
import { useSelector } from 'react-redux'
import { selectAccessToken } from 'slices/tokenSlice'
import { selectUserInfo } from 'slices/userSlice'

import styles from './SidebarSection.module.css'
import DisplayListFeature from './DisplayListFeature/DisplayListFeature'
import { createContext, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faClock } from '@fortawesome/free-solid-svg-icons'
import { collapseSidebarContext } from 'pages/HomePage/HomePage'
import { useNavigate } from 'react-router-dom'

export const MetaPageContext = createContext()

function SidebarSection(props) {
    const navigate = useNavigate()
    const { isCollapsed, setIsCollapsed } = useContext(collapseSidebarContext)
    const userInfo = useSelector(selectUserInfo)
    const accessToken = useSelector(selectAccessToken)
    const { data: allPages } = useGetMetaAllPagesQuery(accessToken, {
        skip: !accessToken,
    })

    const handleTurnToHomepage = () => {
        window.location.href = `/${userInfo?.username}`
    }

    const handleCollapseBar = (e) => {
        e.stopPropagation()
        setIsCollapsed(!isCollapsed)
    }

    return (
        <MetaPageContext.Provider value={allPages}>
            <aside className={styles.wrapper}>
                {/* nickname */}
                <div
                    className={styles.usernameWrapper}
                    onClick={handleTurnToHomepage}
                >
                    <div className={styles.collapseBarWrapper}>
                        {!isCollapsed && (
                            <div
                                className={styles.collapseBtn}
                                onClick={handleCollapseBar}
                            >
                                <FontAwesomeIcon icon={faBackward} />
                            </div>
                        )}
                    </div>
                    <div className={styles.usernameContent}>
                        <div className={styles.usernameIcon}>🌱</div>
                        <div className={styles.usernameContainer}>
                            <div className={styles.username}>
                                {userInfo?.username}
                            </div>
                            <span>'s Notion</span>
                        </div>
                    </div>
                </div>
                {/* nav items */}
                <div className={styles.navList}>
                    <SearchFeature className={styles.navItem} />
                    <SettingFeature className={styles.navItem} />
                    <NewPageFeature className={styles.navItem} />
                    <div
                        className={styles.navItem}
                        onClick={() => navigate('timer')}
                    >
                        <DisplayFeature
                            icon={<FontAwesomeIcon icon={faClock} />}
                            title="Timer"
                        />
                    </div>
                </div>
                {/* nav pages */}
                <div className={styles.pagesWrapper}>
                    <div
                        className={classNames(
                            styles.titlePageContainer,
                            styles.navItem
                        )}
                    >
                        <DisplayFeature icon="☁" title="Projects" />
                    </div>
                    <div className={styles.pagesContainer}>
                        <DisplayListFeature
                            pages={allPages?.filter((page) => page.level === 0)}
                        />
                    </div>
                    <AddPageFeature className={styles.navItem} />
                </div>

                <div className={classNames(styles.pageOptions, styles.navList)}>
                    <TeamSpaceFeature className={styles.navItem} />
                    <TemplatesFeature className={styles.navItem} />
                    <ImportFeature className={styles.navItem} />
                    <TrashFeature className={styles.navItem} />
                </div>

                {/* close sidebar button absolute with wrapper */}
                <ResizableBar />
            </aside>
        </MetaPageContext.Provider>
    )
}

export default SidebarSection
