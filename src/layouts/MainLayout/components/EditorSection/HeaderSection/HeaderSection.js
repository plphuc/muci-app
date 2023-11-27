import { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';

import styles from './HeaderSection.module.css';
import MoreOptionsMenu from './MoreOptionsMenu/MoreOptionsMenu';

const samplePage = {
  title: 'My Links',
  icon: '💚',
  isFavPage: false,
};
function HeaderSection(props) {
  const [isFavPage, setIsFavPage] = useState(samplePage.isFavPage);
  function handleToggleFav() {
    console.log(1);
    setIsFavPage(!isFavPage);
  }

  return (
    <header className={styles.wrapper}>
      <div className={classNames(styles.titleWrapper, styles.btnContainer)}>
        <div className={styles.iconPage}>{samplePage.icon}</div>
        <div className={styles.titlePage}>{samplePage.title}</div>
      </div>
      <div className={styles.actionsWrapper}>
        <div className={classNames(styles.btnContainer)}>
          <div className={styles.shareContainer}>Share</div>
        </div>
        <div
          className={classNames(styles.btnContainer)}
          onClick={handleToggleFav}
        >
          {isFavPage ? (
            <div
              className={classNames(
                styles.toggleFavContainer,
                styles.offFavBtn
              )}
            >
              <FontAwesomeIcon icon={faStar} width="20px" height="20px" />
            </div>
          ) : (
            <div
              className={classNames(styles.toggleFavContainer, styles.onFavBtn)}
            >
              <FontAwesomeIcon icon={faStar} width="20px" height="20px" />
            </div>
          )}
        </div>
        <div className={classNames(styles.btnContainer, styles.moreActionsWrapper)}>
          <div className={styles.moreActionsContainer}>
            <FontAwesomeIcon icon={faEllipsis} width="18px" height="18px" />
            <div className={styles.dropdownMenuWrapper}>
              <DropdownMenu>
                <MoreOptionsMenu />
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderSection;
