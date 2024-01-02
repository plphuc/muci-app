import { useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularFaStar } from '@fortawesome/free-regular-svg-icons';

import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';

import styles from './TopbarSection.module.css';
import MoreOptionsMenu from './MoreOptionsMenu/MoreOptionsMenu';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useEditPageMutation, useGetPageQuery } from 'slices/pageApiSlice';
import { OwnerContext } from '../MainSection';
import { useSearchParams } from 'react-router-dom';

function TopbarSection(props) {
  const isOwner = useContext(OwnerContext);
  const accessToken = useSelector(selectAccessToken);
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [editPage] = useEditPageMutation();
  const { data: pageInfo } = useGetPageQuery(
    {
      accessToken,
      pageId,
    },
    { skip: !accessToken }
  );

  function handleToggleFav() {
    if (isOwner) {
      editPage({
        accessToken,
        pageId,
        content: { isFavPage: !pageInfo?.isFavPage },
      });
    }
  }

  return (
    <header className={styles.wrapper}>
      <div className={classNames(styles.titleWrapper, styles.btnContainer)}>
        <div className={styles.iconPage}>{pageInfo?.icon}</div>
        <div className={styles.titlePage}>{pageInfo?.title}</div>
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
              <FontAwesomeIcon icon={faStar} width="20px" height="20px" />
            </div>
          ) : (
            <div
              className={classNames(styles.toggleFavContainer, styles.offFavBtn)}
            >
              <FontAwesomeIcon icon={regularFaStar} width="20px" height="20px" />
            </div>
          )}
        </div>
        <div
          className={classNames(styles.btnContainer, styles.moreActionsWrapper)}
        >
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

export default TopbarSection;
