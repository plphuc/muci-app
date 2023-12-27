import React from 'react';
import styles from './MoreOptionsMenu.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'slices/userSlice';
import { resetToken, selectAccessToken } from 'slices/tokenSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowRightFromBracket,
  faClockRotateLeft,
  faCopy,
  faLink,
  faLock,
  faSliders,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useDeletePageMutation } from 'slices/pageApiSlice';

function MoreOptionsMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const accessToken = useSelector(selectAccessToken);

  const [deletePage] = useDeletePageMutation();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetToken());
    navigate('/');
  };

  const handleDeletePage = () => {
    deletePage({ accessToken, pageId: params.get('id') }).unwrap().then(() => {
      params.delete('id');
      setParams(params);
    })
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
      <div className={styles.optionsContainer}>
        <div className={styles.optionItem} onClick={handleDeletePage}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div className={styles.titleContainer}>Delete</div>
        </div>
        <div className={styles.optionItem} onClick={handleLogout}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
          <div className={styles.titleContainer}>Log out</div>
        </div>
      </div>
      <div className={styles.separatorLine}></div>
      <div
        className={styles.optionsContainer}
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.optionItem}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faSliders} />
          </div>
          <div className={styles.titleContainer}>Customize Page</div>
        </div>
        <div className={styles.optionItem}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className={styles.titleContainer}>Lock Page</div>
        </div>
      </div>
      <div className={styles.separatorLine}></div>
      <div
        className={styles.optionsContainer}
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.optionItem}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
          <div className={styles.titleContainer}>Duplicate</div>
        </div>
        <div className={styles.optionItem}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faLink} />
          </div>
          <div className={styles.titleContainer}>Copy Link</div>
        </div>
        <div className={styles.optionItem}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <div className={styles.titleContainer}>Move to</div>
        </div>
        <div className={styles.optionItem}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </div>
          <div className={styles.titleContainer}>Undo</div>
        </div>
      </div>
    </div>
  );
}

export default MoreOptionsMenu;
