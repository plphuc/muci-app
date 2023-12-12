import { useEffect } from 'react';
import SidebarSection from './components/SidebarSection/SidebarSection.js';
import { useGetUserQuery } from 'slices/userSlice.js';
import styles from './HomePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetToken,
  saveToken,
  selectAccessToken,
  useGetAccessTokenQuery,
} from 'slices/tokenSlice.js';
import { useNavigate } from 'react-router-dom';
import MainSection from './components/MainSection/MainSection.js';

function HomePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);
  const { data: userInfo, refetch: getUser } = useGetUserQuery(accessToken);

  useEffect(() => {
    getUser()
      .unwrap()
      .then()
      .catch((err) => {
        dispatch(resetToken());
        console.log(err);
        navigate('/');
      });
  }, [accessToken]);

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
    <>Hi</>
  );
}

export default HomePage;
