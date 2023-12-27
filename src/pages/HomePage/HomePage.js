import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SidebarSection from './components/SidebarSection/SidebarSection.js';
import { logoutUser, useGetUserQuery } from 'slices/userSlice.js';
import { resetToken, selectAccessToken } from 'slices/tokenSlice.js';
import MainSection from './components/MainSection/MainSection.js';

import styles from './HomePage.module.css';
import NoSelectedPage from 'pages/NoSelectedPage/NoSelectedPage.js';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

function HomePage(props) {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { refetch: getUser } = useGetUserQuery(accessToken);

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
          [styles.backgroundSidebar]: !searchParams.get('id'),
        })}
      >
        <SidebarSection />
      </nav>
      {searchParams.get('id') ? (
        <main className={styles.editorSectionWrapper}>
          <MainSection />
        </main>
      ) : (
          <NoSelectedPage />
      )}
      <div className={styles.toastContainer}>
        <ToastContainer />
      </div>
    </div>
  );
}

export default HomePage;
