import SidebarSection from './components/SidebarSection/SidebarSection.js';
import EditorSection from './components/EditorSection/EditorSection.js';
import styles from './MainLayout.module.css';
import { useGetDataQuery, useGetUserQuery } from 'slices/userSlice.js';
import { useEffect } from 'react';

function MainLayout(props) {
  const { data: userInfo, refetch } = useGetUserQuery(localStorage.getItem('refreshToken'));
 console.log(userInfo);
  useEffect(() => {
    if(!userInfo && localStorage.getItem('refreshToken')) {
      refetch()
    }
  }, [userInfo])
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navWrapper}>
        <SidebarSection />
      </nav>
      <main className={styles.editorSectionWrapper}>
        <EditorSection />
      </main>
    </div>
  );
}

export default MainLayout;
