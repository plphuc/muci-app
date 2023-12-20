import React from 'react';
import styles from './MoreOptionsMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'slices/userSlice';
import { resetToken } from 'slices/tokenSlice';

function MoreOptionsMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetToken())
    navigate('/')
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.stylesWrapper}>
        <div className={styles.titleStylesContainer}>Styles</div>
        <div className={styles.stylesContainer}>
          <div className={styles.styleItem}>
            <div
              className={styles.styleDescription}
              style={{ fontFamily: 'var(--default-font)' }}
            >
              Ag
            </div>
            <div className={styles.styleName}>Default - Raleway</div>
          </div>
          <div className={styles.styleItem}>
            <div
              className={styles.styleDescription}
              style={{ fontFamily: 'var(--optional-font)' }}
            >
              Ag
            </div>
            <div className={styles.styleName}>Patrick Hand</div>
          </div>
          <div className={styles.styleItem}>
            <div
              className={styles.styleDescription}
              style={{ fontFamily: 'var(--optional-font-2)' }}
            >
              Ag
            </div>
            <div className={styles.styleName}>IBM Plex Mono</div>
          </div>
        </div>
      </div>
      <div className={styles.separatorLine}></div>
      <div onClick={handleLogout}>Logout</div>
    </div>
  );
}

export default MoreOptionsMenu;
