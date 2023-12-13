import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './TeamSpaceFeature.module.css';

function TeamSpaceFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature icon={<FontAwesomeIcon icon={faUserGroup}/>} title='Create a teamspace'/>
    </div>
  );
}

export default TeamSpaceFeature;
