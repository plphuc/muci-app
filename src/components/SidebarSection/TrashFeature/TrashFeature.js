import { faTrash } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './TrashFeature.module.css';

function TrashFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faTrash} title='Trash'/>
    </div>
  );
}

export default TrashFeature;
