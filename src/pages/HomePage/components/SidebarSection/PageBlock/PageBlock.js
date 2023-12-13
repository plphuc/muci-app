import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './PageBlock.module.css';
import { useLazyGetPageQuery } from 'slices/pageSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from 'slices/userSlice';

function PageBlock(props) {
  const { parentClass, id, title, icon, children } = props;
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken)

  const [getPage, {data: pageInfo, isSuccess}] = useLazyGetPageQuery();
  const { data: userInfo} = useGetUserQuery(accessToken);

  const handleChoosePage = () => {
    setIsToggle(!isToggle);
    getPage({accessToken, pageId: id});
  }

  if (isSuccess) {
    navigate(`/${userInfo.username}/${pageInfo.id}`);
  }

  return (
    <div className={classNames(styles.wrapper)} onClick={handleChoosePage}>
      <div className={classNames(styles.pageInfoContainer, parentClass)} >
        <div className={styles.iconWrapper}>
          <div className={classNames(styles.toggleIcon, {[`${styles.toggleDown}`]: isToggle})}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className={styles.pageInfo}>
          <div className={styles.pageIcon}>{icon}</div>
          <div className={styles.pageName}>{title}</div>
        </div>
      </div>
      {children && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  );
}

export default PageBlock;
