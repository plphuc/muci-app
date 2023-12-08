import classNames from 'classnames';
import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import styles from './AddIcon.module.css';
import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';

function AddIcon(props) {
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState('');

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
    setEmoji(emojiData.native);
  };

  return (
    <div className={styles.wrapper}>
      {emoji ? (
        <div className={styles.iconContainer} >
          {emoji}
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
                onClick={() =>setEmoji('')}
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
