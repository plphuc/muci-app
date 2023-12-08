import { useEffect } from 'react';
import SidebarSection from './components/SidebarSection/SidebarSection.js';
import { useGetUserQuery } from 'slices/userSlice.js';
import styles from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import {
  resetToken,
  saveToken,
  useGetAccessTokenQuery,
} from 'slices/tokenSlice.js';
import { useNavigate } from 'react-router-dom';
import MainSection from './components/MainSection/MainSection.js';

function HomePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshToken = localStorage.getItem('refreshToken');
  const { data: accessToken, refetch: getAccessToken} = useGetAccessTokenQuery(refreshToken, { skip: !refreshToken });

  const { data: userInfo, refetch: getUser } = useGetUserQuery(accessToken?.accessToken,
    { skip: !accessToken }
  );

  useEffect(() => {
    if (accessToken) {
      getUser();
    } else {
      if (refreshToken) {
        getAccessToken().unwrap()
          .then((res) => {
            dispatch(saveToken(res.accessToken));
          })
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (!refreshToken) {
      dispatch(resetToken())
      navigate('/');
    }
  }, [refreshToken]) 

  return userInfo ? (
    <div className={styles.wrapper}>
      <nav className={styles.navWrapper}>
        <SidebarSection />
      </nav>
      <main className={styles.editorSectionWrapper}>
        <MainSection />
      </main>
    </div>
  ) : (
    <></>
  );
}

export default HomePage;
