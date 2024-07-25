import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import {
  useAddPageMutation,
  useDeletePageMutation,
} from 'slices/pageApiSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './PageBlock.module.css';
import DisplayListFeature from '../DisplayListFeature/DisplayListFeature';
import { notifyError } from 'common/utils/toastMessage';
import { MetaPageContext } from '../SidebarSection';
import { selectUserInfo } from 'slices/userSlice';

function PageBlock(props) {
  const { parentClass, page: currentPage } = props;
  const allPages = useContext(MetaPageContext)
  const children = allPages?.filter(page => page.parent === currentPage.id)
  const accessToken = useSelector(selectAccessToken);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');
  const userInfo = useSelector(selectUserInfo)

  const [isToggle, setIsToggle] = useState(false);

  const [deletePage] = useDeletePageMutation();
  const [addPage] = useAddPageMutation();

  const handleChoosePage = (e) => {
    e.stopPropagation();
    setIsToggle(!isToggle);

    navigate({
      pathname: `/${userInfo.username}`,
      search: createSearchParams({ id: currentPage.id }).toString(),
    });
  };

  const handleAddPage = (e) => {
    // avoid trigger handleChoosePage
    e.stopPropagation();
    addPage({ accessToken, parentId: currentPage.id })
      .unwrap()
      .catch((err) => {
        if (err.status === 400) {
          notifyError(err.data.message);
        }
      });
  };

  const handleDeletePage = (e) => {
    // avoid trigger handleChoosePage
    e.stopPropagation();

    deletePage({ accessToken, pageId: currentPage.id })
      .unwrap()
      .then(() => {
        if(isToggle) {
          navigate(location.pathname)
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          notifyError(err.data.message);
        }
      });
  };

  return (
    <div className={classNames(styles.wrapper)} onClick={handleChoosePage}>
      <div
        style={{ paddingLeft: `${10 + currentPage.level * 10}px`, backgroundColor: `${pageId === currentPage.id ? '#e6e6e6' : ''}`}}
        className={classNames(styles.pageInfoContainer, parentClass)}
      >
        <div className={styles.iconWrapper}>
          <div
            className={classNames(styles.toggleIcon, {
              [styles.toggleDown]: isToggle,
            })}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className={styles.pageContainer}>
          <div className={styles.pageInfo}>
            <div className={styles.pageIcon}>{currentPage?.icon || '📃'}</div>
            <div className={styles.pageName}>{currentPage?.title}</div>
          </div>
          <div className={styles.actionsPageWrapper}>
            <div
              className={classNames(
                styles.addPageContainer,
                styles.actionPageItem
              )}
              onClick={handleAddPage}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div
              className={classNames(
                styles.trashContainer,
                styles.actionPageItem
              )}
              onClick={handleDeletePage}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
      {children.length > 0 && (
        <div className={styles.childrenContainer}>
          <DisplayListFeature pages={children} />
        </div>
      )}
    </div>
  );
}

export default PageBlock;
