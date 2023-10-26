import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

function LoginPage(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginFormWrapper}>
        <div className={styles.loginFormContainer}>
          <h1 className={styles.formTitle}>Login</h1>
          <div className={styles.loginFormContentWrapper}>
            <form className={styles.loginFormContentContainer}>
              <p>
                <input
                  placeholder="Username"
                  id="username"
                  name="username"
                  required
                ></input>
              </p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                ></input>
              </p>
              <p>
                <input type="submit" id="login" value="SUBMIT"></input>
              </p>
            </form>
            <div className={styles.registerWrapper}>
              <p>Don't have an account?&nbsp;
                <Link to='/register'>Create account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
