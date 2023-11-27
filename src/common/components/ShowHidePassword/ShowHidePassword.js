import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './ShowHidePassword.module.css';

function ShowHidePassword(props) {
  const { isShowPw } = props;

  return (
    <div className={styles.wrapper}>
      {isShowPw ? (
        <FontAwesomeIcon icon={faEye} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} />
      )}
    </div>
  );
}

export default ShowHidePassword;
