import classNames from 'classnames';
import styles from './AddCover.module.css'

function AddCover(props) {
  const {handleSetCover} = props;

  return (
    <div className={styles.wrapper} onClick={() => handleSetCover(true)}>
      <div>📃</div>
      <button className={classNames('no-border-button', styles.container)}>Add cover</button>
    </div>
  );
}

export default AddCover;