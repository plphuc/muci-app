import SidebarSection from './components/SidebarSection/SidebarSection.js';
import EditorSection from './components/EditorSection/EditorSection.js';
import styles from './MainLayout.module.css';
import { useGetUserQuery } from 'slices/userSlice.js';
import { useEffect } from 'react';

function MainLayout(props) {
  const { data: userInfo, refetch } = useGetUserQuery(
    localStorage.getItem('refreshToken')
  );
  useEffect(() => {
    if (!userInfo) {
      refetch();
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

export default MainLayout;
