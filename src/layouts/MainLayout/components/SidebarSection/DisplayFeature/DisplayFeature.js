import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DisplayFeature.module.css';

function DisplayFeature(props) {
  const {  iconName, title } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={iconName} />
      </div>
      <div className={styles.content}>{title}</div>
    </div>
  );
}

export default DisplayFeature;
