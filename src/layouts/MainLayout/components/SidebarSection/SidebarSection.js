import ResizableBar from 'components/ResizableBar/ResizableBar';
import SearchFeature from './SearchFeature/SearchFeature';
import UpdateFeature from './UpdateFeature/UpdateFeature';
import SettingFeature from './SettingFeature/SettingFeature';
import NewPageFeature from './NewPageFeature/NewPageFeature';
import classNames from 'classnames';
import TeamSpaceFeature from './TeamSpaceFeature/TeamSpaceFeature';
import TemplatesFeature from './TemplatesFeature/TemplatesFeature';
import ImportFeature from './ImportFeature/ImportFeature';
import TrashFeature from './TrashFeature/TrashFeature';

import styles from './SidebarSection.module.css';
import AddPageFeature from './AddPageFeature/AddPageFeature';
import PageBlock from './PageBlock/PageBlock';

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
      <div className={styles.navList}>
        <SearchFeature className={styles.navItem} />
        <UpdateFeature className={styles.navItem} />
        <SettingFeature className={styles.navItem} />
        <NewPageFeature className={styles.navItem} />
      </div>
      {/* nav pages */}
      <div className={styles.pagesWrapper}>
        <div className={styles.pageContainer}>
          <PageBlock className={styles.navItem} icon='☁' title='Projects'/>
          <AddPageFeature className={styles.navItem} />
        </div>

        <div className={classNames(styles.pageOptions, styles.navList)}>
          <TeamSpaceFeature className={styles.navItem} />
          <TemplatesFeature className={styles.navItem} />
          <ImportFeature className={styles.navItem} />
          <TrashFeature className={styles.navItem} />
        </div>
      </div>

      {/* close sidebar button absolute with wrapper */}
      <ResizableBar />
    </aside>
  );
}

export default SidebarSection;
