import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './TeamSpaceFeature.module.css';

function TeamSpaceFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faUserGroup} title='Create a teamspace'/>
    </div>
  );
}

export default TeamSpaceFeature;
