import { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAccessToken } from 'slices/tokenSlice';
import { useEditPageMutation } from 'slices/pageApiSlice';
import AddCover from './AddCover/AddCover';
import AddIcon from './AddIcon/AddIcon';

import styles from './HeaderSection.module.css';
import classNames from 'classnames';
import {
  useLazyGetCoverQuery,
  useRemoveCoverMutation,
} from 'slices/coverSlice';
import { OwnerContext, PageContext } from '../MainSection';

function HeaderSection(props) {
  const isOwner = useContext(OwnerContext);
  const pageInfo = useContext(PageContext);

  const accessToken = useSelector(selectAccessToken);
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [removeCover] = useRemoveCoverMutation();

  const [getCover, { data: coverInfo }] = useLazyGetCoverQuery();
  const [editPage] = useEditPageMutation();

  const handleRemoveCover = () => {
    if (isOwner) {
      removeCover({ pageId, coverId: pageInfo?.cover, accessToken });
    }
  };

  const handleInputTitle = (e) => {
    if (e.code === 'Enter') {
      if (isOwner) {
        editPage({
          accessToken,
          pageId,
          content: { title: e.target.innerText },
        });
      }
      e.target.blur();
      return;
    }
  };

  const handleBlurTitle = (e) => {
    if (isOwner) {
      editPage({ accessToken, pageId, content: { title: e.target.innerText } });
    }
  };

  useEffect(() => {
    if (pageInfo?.cover) {
      getCover({ pageId, coverId: pageInfo?.cover, accessToken });
    }
  }, [pageInfo?.cover]);

  return (
    <div className={styles.wrapper}>
      {pageInfo?.cover && coverInfo && (
        <div className={styles.coverContainer}>
          <img
            src={coverInfo}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          ></img>
          <button
            className={classNames(styles.removeCoverBtn, 'no-border-button')}
            onClick={handleRemoveCover}
          >
            x
          </button>
        </div>
      )}

      <div className={styles.container}>
        <div
          className={styles.addItemsContainer}
          style={{ fontFamily: 'var(--default-font)' }}
        >
          <div className={styles.addItemContainer}>
            <AddIcon />
          </div>
          <div className={styles.addItemContainer}>
            <AddCover />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1
            placeholder="Untitled"
            contentEditable
            suppressContentEditableWarning={true}
            onKeyDown={handleInputTitle}
            onBlur={handleBlurTitle}
          >
            {pageInfo?.title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
