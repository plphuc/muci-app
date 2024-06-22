import {
  faDiagramProject,
  faDownload,
  faGear,
  faGears,
  faGlobe,
  faUserGroup,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './SettingFeature.module.css';
import ModalFeature from '../ModalFeature/ModalFeature';
import classNames from 'classnames';
import SettingOption from './SettingOption/SettingOption';
import { useState } from 'react';

function SettingSection(props) {
  const { className } = props;
  const [activeTab, setActiveTab] = useState('my-account');
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={className} onClick={() => setIsModalOpen(true)}>
        <DisplayFeature
          icon={<FontAwesomeIcon icon={faGear} />}
          title="Settings & Members"
        />
      </div>
      <div
        className={classNames(styles.modalWrapper, {
          [styles.visible]: isModalOpen,
        })}
        onClick={() => setIsModalOpen(false)}
      >
        <ModalFeature className={styles.modalContainerHeight}>
          <div className={styles.modalContainer}>
            <div className={styles.sidebarWrapper}>
              <p className={classNames(styles.settingOptionTitle)}>Account</p>
              <div
                className={classNames(
                  styles.userInfoWrapper,
                  styles.settingOptionItem
                )}
              >
                <div className={styles.userAvatarContainer}>
                  <img
                    className={styles.userAvatar}
                    src="https://static.vecteezy.com/system/resources/previews/009/210/264/non_2x/dinosaur-character-cartoon-cute-kawaii-animal-illustration-clipart-free-vector.jpg"
                    alt="user avatar"
                  />
                </div>
                <div className={styles.userInfoContainer}>
                  <div className={styles.userName}>Tran Nhat Minh</div>
                  <div className={styles.userEmail}>nhtmnh@gmail.com</div>
                </div>
              </div>
              <div className={styles.accountSettingOptions}>
                <SettingOption
                  id="my-account"
                  title="My Account"
                  icon={<FontAwesomeIcon icon={faUserTie} />}
                  activeTab={activeTab}
                  handleSetActiveTab={setActiveTab}
                />
                <SettingOption
                  activeTab={activeTab}
                  id="my-settings"
                  title="My Settings"
                  icon={<FontAwesomeIcon icon={faGear} />}
                  handleSetActiveTab={setActiveTab}
                />

                <SettingOption
                  activeTab={activeTab}
                  id="my-notifications"
                  handleSetActiveTab={setActiveTab}
                  title="My Notifications"
                  icon={<FontAwesomeIcon icon={faDiagramProject} />}
                />
                <SettingOption
                  activeTab={activeTab}
                  id="my-language-region"
                  handleSetActiveTab={setActiveTab}
                  title="Language & region"
                  icon={<FontAwesomeIcon icon={faGlobe} />}
                />
              </div>
              <div className={styles.seperator}></div>
              <p className={classNames(styles.settingOptionTitle)}>Workspace</p>
              <div className={styles.workspaceSettingOptions}>
                <SettingOption
                  activeTab={activeTab}
                  id="workspace-settings"
                  title="Settings"
                  handleSetActiveTab={setActiveTab}
                  icon={<FontAwesomeIcon icon={faGears} />}
                />
                <SettingOption
                  activeTab={activeTab}
                  id="workspace-notifications"
                  handleSetActiveTab={setActiveTab}
                  title="People"
                  icon={<FontAwesomeIcon icon={faUserGroup} />}
                />
                <SettingOption
                  activeTab={activeTab}
                  id="workspace-language-region"
                  handleSetActiveTab={setActiveTab}
                  title="Import"
                  icon={<FontAwesomeIcon icon={faDownload} />}
                />
              </div>
            </div>
            <div className={styles.mainContentWrapper}>
              <div>{activeTab}</div>
            </div>
          </div>
        </ModalFeature>
      </div>
    </>
  );
}

export default SettingSection;
