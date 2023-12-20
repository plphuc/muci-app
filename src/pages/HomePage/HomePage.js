import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SidebarSection from './components/SidebarSection/SidebarSection.js';
import { logoutUser, useGetUserQuery } from 'slices/userSlice.js';
import { resetToken, selectAccessToken } from 'slices/tokenSlice.js';
import MainSection from './components/MainSection/MainSection.js';

import styles from './HomePage.module.css';
import NoPage from 'pages/NoPage/NoPage.js';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu.js';
import MoreOptionsMenu from './components/MainSection/TopbarSection/MoreOptionsMenu/MoreOptionsMenu.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

function HomePage(props) {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { refetch: getUser } = useGetUserQuery(accessToken);
  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken || refreshToken) {
      getUser();
    } else {
      navigate('/');
    }
  }, [accessToken]);

  return (
    <div className={styles.wrapper}>
      <nav
        className={classNames(styles.navWrapper, {
          [`${styles.backgroundSidebar}`]: !searchParams.get('id'),
        })}
      >
        <SidebarSection />
      </nav>
      {searchParams.get('id') ? (
        <main className={styles.editorSectionWrapper}>
          <MainSection />
        </main>
      ) : (
        <>
          <div
            className={classNames(
              styles.btnContainer,
              styles.moreActionsWrapper
            )}
          >
            <div className={styles.moreActionsContainer}>
              <FontAwesomeIcon icon={faEllipsis} width="18px" height="18px" />
              <div
                className={styles.dropdownMenuWrapper}
                onClick={handleLogout}
              >
                <DropdownMenu>
                  <div className={styles.dropdownItem}>Logout</div>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <NoPage />
        </>
      )}
      <div className={styles.toastContainer}>
        <ToastContainer />
      </div>
    </div>
  );
}

export default HomePage;
