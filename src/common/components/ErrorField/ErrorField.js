import styles from './ErrorField.module.css';

function ErrorField(props) {
  const { message, idx } = props;
  return (
    <li key={idx} className={styles.wrapper}>
      {message}
    </li>
  );
}

export default ErrorField;
