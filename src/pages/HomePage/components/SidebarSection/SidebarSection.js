import classNames from 'classnames';

import ResizableBar from 'common/components/ResizableBar/ResizableBar';
import SearchFeature from './SearchFeature/SearchFeature';
import SettingFeature from './SettingFeature/SettingFeature';
import NewPageFeature from './NewPageFeature/NewPageFeature';
import TeamSpaceFeature from './TeamSpaceFeature/TeamSpaceFeature';
import TemplatesFeature from './TemplatesFeature/TemplatesFeature';
import ImportFeature from './ImportFeature/ImportFeature';
import TrashFeature from './TrashFeature/TrashFeature';
import DisplayFeature from './DisplayFeature/DisplayFeature';

import AddPageFeature from './AddPageFeature/AddPageFeature';
import PageBlock from './PageBlock/PageBlock';
import { useGetTitlePagesQuery } from 'slices/pageApiSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { selectUserInfo } from 'slices/userSlice';

import styles from './SidebarSection.module.css';

function SidebarSection(props) {
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo)

  const { data: allPages } = useGetTitlePagesQuery(accessToken, {skip: !accessToken});

  const displayAllPages = allPages?.map((page) => {
    return (
      <PageBlock
        key={page.id}
        id={page.id}
        parentClass={styles.navItem}
        icon={page.icon ? page.icon : '📃'}
        title={page.title}
      />
    );
  });

  const handleTurnToHomepage = () => {
    window.location.href = `/${userInfo?.username}`;
  };

  return (
    <aside className={styles.wrapper}>
      {/* nickname */}
      <div className={styles.usernameWrapper} onClick={handleTurnToHomepage}>
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
        <SettingFeature className={styles.navItem} />
        <NewPageFeature className={styles.navItem} />
      </div>
      {/* nav pages */}
      <div className={styles.pagesWrapper}>
        <div className={classNames(styles.titlePageContainer, styles.navItem)}>
          <DisplayFeature icon="☁" title="Projects" />
        </div>
        <div className={styles.pagesContainer}>{displayAllPages}</div>
        <AddPageFeature className={styles.navItem} />
      </div>

      <div className={classNames(styles.pageOptions, styles.navList)}>
        <TeamSpaceFeature className={styles.navItem} />
        <TemplatesFeature className={styles.navItem} />
        <ImportFeature className={styles.navItem} />
        <TrashFeature className={styles.navItem} />
      </div>

      {/* close sidebar button absolute with wrapper */}
      <ResizableBar />
    </aside>
  );
}

export default SidebarSection;
