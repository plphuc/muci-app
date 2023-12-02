import { useEffect } from 'react';
import SidebarSection from './components/SidebarSection/SidebarSection.js';
import EditorSection from './components/EditorSection/EditorSection.js';
import {
  useGetUserQuery,
  useGetDataQuery
} from 'slices/userSlice.js';
import styles from './HomePage.module.css';

function HomePage(props) {
  const storedRefreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const { data: userInfo, refetch: refetchUser } = useGetUserQuery(storedRefreshToken);
  const {data: content, refetch: refetchData} = useGetDataQuery(storedRefreshToken);
  
  useEffect(() => {
    if (!userInfo) {
      refetchUser();
      refetchData();
    }
  }, [userInfo]);

  return userInfo ? (
    <div className={styles.wrapper}>
      <nav className={styles.navWrapper}>
        <SidebarSection />
      </nav>
      <main className={styles.editorSectionWrapper}>
        <EditorSection />
      </main>
    </div>
  ) : (
    <></>
  );
}

export default HomePage;
