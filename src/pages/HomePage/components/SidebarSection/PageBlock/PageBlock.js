import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import {
  useAddPageMutation,
  useDeletePageMutation,
  useLazyGetMetaPageQuery,
} from 'slices/pageApiSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './PageBlock.module.css';
import DisplayListFeature from '../DisplayListFeature/DisplayListFeature';
import { notifyError } from 'common/utils/toastMessage';

function PageBlock(props) {
  const { parentClass, page } = props;
  const accessToken = useSelector(selectAccessToken);

  const navigate = useNavigate();
  const location = useLocation();

  const [isToggle, setIsToggle] = useState(false);
  const [children, setChildren] = useState([]);

  const [deletePage] = useDeletePageMutation();
  const [addPage] = useAddPageMutation();
  const [getMetaPage] = useLazyGetMetaPageQuery();

  const handleChoosePage = (e) => {
    e.stopPropagation();
    setIsToggle(!isToggle);

    navigate({
      pathname: location.pathname,
      search: createSearchParams({ id: page.id }).toString(),
    });
  };
  const handleAddPage = (e) => {
    // avoid trigger handleChoosePage
    e.stopPropagation();
    addPage({ accessToken, parentId: page.id })
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

    deletePage({ accessToken, pageId: page.id })
      .unwrap()
      .then(() => {
        navigate({
          pathname: location.pathname,
        });
      });
  };

  useEffect(() => {
    const fetchChildren = async () => {
      const childrenPage = [];

      for (const child of page.pageChildren) {
        const metaPage = await getMetaPage({
          accessToken,
          pageId: child,
        }).unwrap();
        childrenPage.push(metaPage);
      }
      return childrenPage;
    };
    if (isToggle && page.pageChildren) {
      fetchChildren().then((res) => {
        setChildren(res);
      });
    } else {
      setChildren([]);
    }
  }, [isToggle, page.pageChildren]);

  return (
    <div className={classNames(styles.wrapper)} onClick={handleChoosePage}>
      <div style={{paddingLeft: `${10 + page.level*10}px`}} className={classNames(styles.pageInfoContainer, parentClass)}>
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
            <div className={styles.pageIcon}>{page?.icon || '📃'}</div>
            <div className={styles.pageName}>{page?.title}</div>
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
