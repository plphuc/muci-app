import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';
import { resetToken } from 'slices/tokenSlice';
import { logoutUser } from 'slices/userSlice';
import styles from './NoSelectedPage.module.css';
import { useContext } from 'react';
import { collapseSidebarContext } from 'pages/HomePage/HomePage';

function NoSelectedPage(props) {
  const { isCollapsed, setIsCollapsed } = useContext(collapseSidebarContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(logoutUser());
    navigate('/');
  };

  const handleCollapseBar = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {isCollapsed && (
        <div className={styles.expandBtn} onClick={handleCollapseBar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <div
        className={classNames(styles.btnContainer, styles.moreActionsWrapper)}
      >
        <div className={styles.moreActionsContainer}>
          <FontAwesomeIcon icon={faEllipsis} width="18px" height="18px" />
          <div className={styles.dropdownMenuWrapper}>
            <DropdownMenu>
              <div className={styles.dropdownItem} onClick={handleLogout}>
                Log out
              </div>
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
