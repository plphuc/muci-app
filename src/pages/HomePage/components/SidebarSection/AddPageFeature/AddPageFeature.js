import { faPlus } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './AddPageFeature.module.css';

function AddPageFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faPlus} title='Add a page'/>
    </div>
  );
}

export default AddPageFeature;
