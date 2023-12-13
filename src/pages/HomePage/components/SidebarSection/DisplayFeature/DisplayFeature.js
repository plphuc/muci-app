import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DisplayFeature.module.css';

function DisplayFeature(props) {
  const { icon, title } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.content}>{title}</div>
    </div>
  );
}

export default DisplayFeature;
