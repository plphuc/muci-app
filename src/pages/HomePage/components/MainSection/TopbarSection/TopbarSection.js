import { useContext } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularFaStar } from '@fortawesome/free-regular-svg-icons'

import styles from './TopbarSection.module.css'
import { useSelector } from 'react-redux'
import { selectAccessToken } from 'slices/tokenSlice'
import { useEditPageMutation, useGetPathPageQuery } from 'slices/pageApiSlice'
import { OwnerContext, PageContext } from '../MainSection'
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom'
import { collapseSidebarContext } from 'pages/HomePage/HomePage'
import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader'

function TopbarSection(props) {
    const pageInfo = useContext(PageContext)
    const isOwner = useContext(OwnerContext)
    const { isCollapsed, setIsCollapsed } = useContext(collapseSidebarContext)

    const accessToken = useSelector(selectAccessToken)
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const pageId = searchParams.get('id')

    const [editPage] = useEditPageMutation()
    const { data: path } = useGetPathPageQuery(pageId, { skip: !pageId })

    function handleToggleFav() {
        if (isOwner) {
            editPage({
                accessToken,
                pageId,
                content: { isFavPage: !pageInfo?.isFavPage },
            })
        }
    }

    const handleChoosePage = (e, pageId) => {
        e.stopPropagation()

        navigate({
            pathname: location.pathname,
            search: createSearchParams({ id: pageId }).toString(),
        })
    }

    const handleCollapseBar = (e) => {
        e.stopPropagation()
        setIsCollapsed(!isCollapsed)
    }

    return (
        <header className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                {isCollapsed && (
                    <div
                        className={styles.expandBtn}
                        onClick={handleCollapseBar}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                )}
                {path &&
                    path
                        .slice()
                        .reverse()
                        .map((page, idx) => (
                            <div className={styles.pathWrapper} key={idx}>
                                {idx !== 0 && (
                                    <div className={styles.divider}>/</div>
                                )}
                                <div
                                    className={classNames(
                                        styles.pathContainer,
                                        styles.btnContainer
                                    )}
                                    onClick={(e) =>
                                        handleChoosePage(e, page.id)
                                    }
                                >
                                    <div className={styles.pathIcon}>
                                        {page.icon || '📃'}
                                    </div>
                                    <div className={styles.pathTitle}>
                                        {page.title}
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
            <div className={styles.actionsWrapper}>
                <div className={classNames(styles.btnContainer)}>
                    <div className={styles.shareContainer}>Share</div>
                </div>
                <div
                    className={classNames(styles.btnContainer)}
                    onClick={handleToggleFav}
                >
                    {pageInfo?.isFavPage ? (
                        <div
                            className={classNames(
                                styles.toggleFavContainer,
                                styles.onFavBtn
                            )}
                        >
                            <FontAwesomeIcon
                                icon={faStar}
                                width="20px"
                                height="20px"
                            />
                        </div>
                    ) : (
                        <div
                            className={classNames(
                                styles.toggleFavContainer,
                                styles.offFavBtn
                            )}
                        >
                            <FontAwesomeIcon
                                icon={regularFaStar}
                                width="20px"
                                height="20px"
                            />
                        </div>
                    )}
                </div>
                <div
                    className={classNames(
                        styles.btnContainer,
                        styles.moreActionsWrapper
                    )}
                >
                    <div className=" flex justify-end mr-8 mt-8">
                        <div>
                            <OptionsHeader />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopbarSection
