import classNames from 'classnames';
import { useState, useEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { useEditPageMutation, useLazyGetPageQuery } from 'slices/pageSlice';
import styles from './AddIcon.module.css';
import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useSearchParams } from 'react-router-dom';

function AddIcon(props) {
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [getPage, { data: pageInfo }] = useLazyGetPageQuery();
  const [editPage] = useEditPageMutation();

  const handleAddIcon = (e) => {
    e.stopPropagation();
    setIsShowEmojiPicker(true);

    const handleOnShowEmojiPicker = () => {
      setIsShowEmojiPicker(false);
      document.removeEventListener('click', handleOnShowEmojiPicker);
    };
    document.addEventListener('click', handleOnShowEmojiPicker);
  };

  const handleChooseEmoji = (emojiData) => {
    editPage({accessToken, pageId, content: {icon: emojiData.native}});
  };

  useEffect(() => {
    if (pageId && accessToken) {
      getPage({ accessToken, pageId });
    }
  }, [pageId, accessToken]);

  return (
    <div className={styles.wrapper}>
      {pageInfo?.icon ? (
        <div className={styles.iconContainer} >
          {pageInfo?.icon}
          <div className={styles.emojiOptionsMenuWrapper}>
            <DropdownMenu>
              <div
                className={styles.emojiOptionContainer}
                onClick={handleAddIcon}
              >
                Change
              </div>
              <div
                className={styles.emojiOptionContainer}
                onClick={() => editPage({icon: '', accessToken, pageId})}
              >
                Remove
              </div>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className={styles.noIconContainer} onClick={handleAddIcon}>
          <div>🎄</div>
          <button className={classNames('no-border-button', styles.container)}>
            Add icon
          </button>
        </div>
      )}

      {isShowEmojiPicker && (
        <div className={styles.emojiPickerContainer}>
          <Picker data={data} onEmojiSelect={handleChooseEmoji} />
        </div>
      )}
    </div>
  );
}

export default AddIcon;
