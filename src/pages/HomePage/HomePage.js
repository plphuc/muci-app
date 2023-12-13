import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SidebarSection from './components/SidebarSection/SidebarSection.js';
import { useGetUserQuery } from 'slices/userSlice.js';
import {
  selectAccessToken,
} from 'slices/tokenSlice.js';
import MainSection from './components/MainSection/MainSection.js';

import styles from './HomePage.module.css';

function HomePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);
  const { data: userInfo, refetch: getUser } = useGetUserQuery(accessToken);

  useEffect(() => {
    getUser();
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
 