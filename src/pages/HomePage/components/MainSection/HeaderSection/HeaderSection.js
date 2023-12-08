import { useState } from 'react';

import AddCover from './AddCover/AddCover';
import AddIcon from './AddIcon/AddIcon';

import styles from './HeaderSection.module.css';
import classNames from 'classnames';

function HeaderSection(props) {
  const [cover, setCover] = useState(null);

  const handleInputTitle = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div className={styles.wrapper}>
      {cover && (
        <div className={styles.coverContainer}>
          <img
            src="http://localhost:8080/page/img"
            style={{ width: '100%', height: '100%' }}
          ></img>
          <button
            className={classNames(styles.removeCoverBtn, 'no-border-button')}
            onClick={() => setCover(null)}
          >
            x
          </button>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.addItemsContainer}>
          <div className={styles.addItemContainer}>
            <AddIcon />
          </div>
          {!cover && (
            <div className={styles.addItemContainer}>
              <AddCover handleSetCover={setCover} />
            </div>
          )}
        </div>
        <div className={styles.titleContainer}>
          <h1
            placeholder="Untitled"
            contentEditable
            onKeyDown={handleInputTitle}
          ></h1>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
