import { useNavigate, useSearchParams } from 'react-router-dom';

import SidebarSection from './components/SidebarSection/SidebarSection.js';
import MainSection from './components/MainSection/MainSection.js';

import styles from './HomePage.module.css';
import NoSelectedPage from 'pages/NoSelectedPage/NoSelectedPage.js';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAccessToken, selectAccessToken } from 'slices/tokenSlice.js';
import { useGetAccessTokenQuery } from 'slices/tokenApiSlice.js';
import {
  saveUserInfo,
  selectUserInfo,
  useLazyGetUserQuery,
} from 'slices/userSlice.js';

export const collapseSidebarContext = createContext();

function HomePage(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);

  const refreshToken = localStorage.getItem('refreshToken');

  const { refetch: getAccessToken } = useGetAccessTokenQuery(refreshToken);
  const [getUserInfo] = useLazyGetUserQuery();

  useEffect(() => {
    // request new access token when reload
    if (!accessToken && refreshToken) {
      getAccessToken()
        .unwrap()
        .then((res) => {
          dispatch(saveAccessToken(res.accessToken));

          getUserInfo(res.accessToken)
            .unwrap()
            .then((res) => {
              dispatch(saveUserInfo(res));
            });
        });
    }
    if (!refreshToken) {
      navigate('/');
    }
  }, [refreshToken]);

  return (
    userInfo && (
      <collapseSidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
        <div className={styles.wrapper}>
          <nav
            className={classNames(styles.navWrapper, {
              [styles.collapseWrapper]: isCollapsed,
              [styles.noCollapseWrapper]: !isCollapsed,
            })}
          >
            <SidebarSection />
          </nav>
          {pageId ? (
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
      </collapseSidebarContext.Provider>
    )
  );
}

export default HomePage;
