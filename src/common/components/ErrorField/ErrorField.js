import styles from './ErrorField.module.css';

function ErrorField(props) {
  const { message, idx } = props;
  return (
    <p key={idx} className={styles.wrapper}>
      {message}
    </p>
  );
}

export default ErrorField;
