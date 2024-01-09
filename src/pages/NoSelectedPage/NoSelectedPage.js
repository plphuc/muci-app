import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';
import { resetToken } from 'slices/tokenSlice';
import { logoutUser } from 'slices/userSlice';
import styles from './NoSelectedPage.module.css';

function NoSelectedPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(logoutUser());
    navigate('/');
  };
  return (
    <>
      <div
        className={classNames(styles.btnContainer, styles.moreActionsWrapper)}
      >
        <div className={styles.moreActionsContainer}>
          <FontAwesomeIcon icon={faEllipsis} width="18px" height="18px" />
          <div className={styles.dropdownMenuWrapper} >
            <DropdownMenu>
              <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <img
          src="https://i.ibb.co/Xkjr69x/background.png"
          alt="no selected page"
        />
      </div>
    </>
  );
}

export default NoSelectedPage;
