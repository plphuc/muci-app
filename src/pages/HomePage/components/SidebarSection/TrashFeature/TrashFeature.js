import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './TrashFeature.module.css';

function TrashFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature icon={<FontAwesomeIcon icon={faTrash}/>} title='Trash'/>
    </div>
  );
}

export default TrashFeature;
