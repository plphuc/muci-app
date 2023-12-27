import styles from './DisplayFeature.module.css';
import classNames from 'classnames';

function DisplayFeature(props) {
  const { icon, title, contentClassname, iconClassName } = props;
  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.icon, iconClassName)}>
        {icon}
      </div>
      <div className={classNames(styles.content, contentClassname)}>{title}</div>
    </div>
  );
}

export default DisplayFeature;
