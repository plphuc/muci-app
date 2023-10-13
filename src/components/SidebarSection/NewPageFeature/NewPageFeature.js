import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './NewPageFeature.module.css';

function NewPageFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faCirclePlus} title="New page" />
    </div>
  );
}

export default NewPageFeature;
