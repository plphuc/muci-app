import { useState } from 'react';
import DisplayFeature from '../../DisplayFeature/DisplayFeature';
import styles from './SettingOption.module.css';
import classNames from 'classnames';

const SettingOption = (props) => {
  const { id, title, icon, activeTab, handleSetActiveTab } = props;
  const className = classNames(styles.settingOptionItem, {
    [styles.isActive]: activeTab === id,
  });

  return (
    <div id={id} className={className} onClick={() => handleSetActiveTab(id)}>
      <DisplayFeature
        title={title}
        icon={icon}
        contentClassname={styles.contentOptionItem}
        iconClassName={styles.iconOptionItem}
      />
    </div>
  );
};

export default SettingOption;
