import { faClock } from '@fortawesome/free-regular-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './UpdateFeature.module.css';

function UpdateFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faClock} title='Updates'/>
    </div>
  );
}

export default UpdateFeature;
