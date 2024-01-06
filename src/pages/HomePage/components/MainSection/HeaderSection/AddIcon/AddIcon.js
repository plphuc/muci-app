import classNames from 'classnames';
import { useState, useEffect, useContext } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { useEditPageMutation, useLazyGetPageQuery } from 'slices/pageApiSlice';
import styles from './AddIcon.module.css';
import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useSearchParams } from 'react-router-dom';
import { OwnerContext, PageContext } from '../../MainSection';

function AddIcon(props) {
  const isOwner = useContext(OwnerContext);
  const pageInfo = useContext(PageContext);

  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

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
    if (isOwner)
      editPage({ accessToken, pageId, content: { icon: emojiData.native } });
  };

  return (
    <div className={styles.wrapper}>
      {pageInfo?.icon ? (
        <div className={styles.iconContainer}>
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
                onClick={() => {
                  if (isOwner) {
                    editPage({ icon: '', accessToken, pageId });
                  }
                }}
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
