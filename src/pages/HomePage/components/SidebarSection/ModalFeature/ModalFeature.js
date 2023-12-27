import classNames from 'classnames';
import styles from './ModalFeature.module.css';

function ModalFeature(props) {
  const { className, children } = props;

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.container, className)}
        onClick={(e) => {e.stopPropagation()}}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalFeature;
