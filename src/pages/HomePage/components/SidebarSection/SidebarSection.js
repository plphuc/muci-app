import classNames from 'classnames';

import ResizableBar from 'common/components/ResizableBar/ResizableBar';
import SearchFeature from './SearchFeature/SearchFeature';
import UpdateFeature from './UpdateFeature/UpdateFeature';
import SettingFeature from './SettingFeature/SettingFeature';
import NewPageFeature from './NewPageFeature/NewPageFeature';
import TeamSpaceFeature from './TeamSpaceFeature/TeamSpaceFeature';
import TemplatesFeature from './TemplatesFeature/TemplatesFeature';
import ImportFeature from './ImportFeature/ImportFeature';
import TrashFeature from './TrashFeature/TrashFeature';

import styles from './SidebarSection.module.css';
import AddPageFeature from './AddPageFeature/AddPageFeature';
import PageBlock from './PageBlock/PageBlock';
import { useGetUserQuery } from 'slices/userSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useEffect } from 'react';

function SidebarSection(props) {
  const accessToken = useSelector(selectAccessToken)
  console.log(accessToken);
  const { data: userInfo, refetch: getUser } = useGetUserQuery(accessToken, {skip: !accessToken}); 
  
  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken])

  return (
    <aside className={styles.wrapper}>
      {/* nickname */}
      <div className={styles.usernameWrapper}>
        <div className={styles.usernameContent}>
          <div className={styles.usernameIcon}>🌱</div>
          <div className={styles.usernameContainer}>
            <div className={styles.username}>{userInfo?.username}</div>
            <span>'s Notion</span>
          </div>
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
          <PageBlock className={styles.navItem} icon="☁" title="Projects" />
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
