import { useNavigate, useSearchParams } from 'react-router-dom';

import SidebarSection from './components/SidebarSection/SidebarSection.js';
import MainSection from './components/MainSection/MainSection.js';

import styles from './HomePage.module.css';
import NoSelectedPage from 'pages/NoSelectedPage/NoSelectedPage.js';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAccessToken, selectAccessToken } from 'slices/tokenSlice.js';
import { useGetAccessTokenQuery } from 'slices/tokenApiSlice.js';

function HomePage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = localStorage.getItem('refreshToken');

  const { refetch: getAccessToken } = useGetAccessTokenQuery(refreshToken);

  useEffect(() => {
    // request new access token when reload
    if (!accessToken && refreshToken) {
      getAccessToken().unwrap().then(res => {
        dispatch(saveAccessToken(res.accessToken))
      })
    }
    if (!refreshToken) {
      navigate('/');
    }
  }, [refreshToken]);

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
