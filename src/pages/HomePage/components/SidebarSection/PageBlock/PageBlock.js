import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';

import styles from './PageBlock.module.css';
import { useDeletePageMutation, useLazyGetPageQuery } from 'slices/pageApiSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function PageBlock(props) {
  const { parentClass, id, title, icon, children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isToggle, setIsToggle] = useState(false);
  const accessToken = useSelector(selectAccessToken);

  const [getPage] = useLazyGetPageQuery();
  const [deletePage] = useDeletePageMutation();

  const handleChoosePage = () => {
    setIsToggle(!isToggle);
    getPage({ accessToken, pageId: id })
      .unwrap()
      .then((res) => {
        navigate({
          pathname: location.pathname,
          search: createSearchParams({
            id: `${res.id}`,
          }).toString(),
        });
      });
  };

  const handleDeletePage = (e) => {
    // avoid trigger handleChoosePage
    e.stopPropagation();
    deletePage({ accessToken, pageId: id })
      .unwrap()
      .then(() => {
        navigate({
          pathname: location.pathname,
        })
      });
  };

  return (
    <div className={classNames(styles.wrapper)} onClick={handleChoosePage}>
      <div className={classNames(styles.pageInfoContainer, parentClass)}>
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
            <div className={styles.pageIcon}>{icon}</div>
            <div className={styles.pageName}>{title}</div>
          </div>
          <div className={styles.trashContainer} onClick={handleDeletePage}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
      {children && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  );
}

export default PageBlock;
