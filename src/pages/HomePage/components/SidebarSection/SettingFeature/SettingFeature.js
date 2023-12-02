import { faGear } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './SettingFeature.module.css';

function SettingSection(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faGear} title="Settings & Members" />
    </div>
  );
}

export default SettingSection;
