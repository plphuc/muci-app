import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './PageBlock.module.css';

function PageBlock(props) {
  const { className, title, icon } = props;
  function handleToggleIcon(e) {
    const toggleIconElement = document.querySelector(`.${styles.toggleIcon}`);
    toggleIconElement.classList.toggle(`${styles.toggleDown}`);
  }
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.toggleIconWrapper} onClick={handleToggleIcon}>
        <div className={styles.toggleIcon}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className={styles.pageInfo}>
        <div className={styles.pageIcon}>{icon}</div>
        <div className={styles.pageName}>{title}</div>
      </div>
    </div>
  );
}

export default PageBlock;
