import { useEffect } from 'react';
import SidebarSection from './components/SidebarSection/SidebarSection.js';
import EditorSection from './components/EditorSection/EditorSection.js';
import {
  useGetUserQuery,
  useGetDataQuery
} from 'slices/userSlice.js';
import styles from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice.js';

function HomePage(props) {
  const accessToken = useSelector(selectAccessToken)
  const { data: userInfo, refetch: getUser } = useGetUserQuery(accessToken, {
    skip: !accessToken
  });

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

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
