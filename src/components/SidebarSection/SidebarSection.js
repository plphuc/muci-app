import ResizableBar from 'components/ResizableBar/ResizableBar';
import styles from './SidebarSection.module.css';
import SearchFeature from './SearchFeature/SearchFeature';
import UpdateSection from './UpdateSection/UpdateSection';

function SidebarSection(props) {
  return (
    <aside className={styles.wrapper}>
      {/* nickname */}
      <div className={styles.usernameWrapper}>
        <div className={styles.usernameContent}>
          <div className={styles.usernameIcon}>🌱</div>
          <div className={styles.usernameText}>Shoko's Notion</div>
        </div>
      </div>
      {/* nav items */}
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <SearchFeature />
        </li>
        <li className={styles.navItem}>
          <UpdateSection />
        </li>
      </ul>
      {/* nav pages */}
      {/* close sidebar button absolute with wrapper */}
      <ResizableBar />
    </aside>
  );
}

export default SidebarSection;
