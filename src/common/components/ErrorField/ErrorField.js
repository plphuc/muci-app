import styles from './ErrorField.module.css'

function ErrorField(props) {
  const {message} = props
  return (
    <li className={styles.wrapper}>
      {message}
    </li>
  );
}

export default ErrorField;