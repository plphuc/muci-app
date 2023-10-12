import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from './UpdateSection.module.css';

function UpdateSection(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
      <FontAwesomeIcon icon={faClock} />
      </div>
      <div className={styles.content}>Updates</div>
    </div>
  );
}

export default UpdateSection;
