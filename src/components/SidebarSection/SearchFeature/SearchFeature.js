import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchFeature.module.css'

function SearchFeature(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
      <div className={styles.content}>Search</div>
    </div>
  );
}

export default SearchFeature;