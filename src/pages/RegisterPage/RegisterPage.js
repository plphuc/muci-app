import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

function RegisterPage(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.registerFormWrapper}>
        <div className={styles.registerFormContainer}>
          <h1 className={styles.formTitle}>Register</h1>
          <div className={styles.registerFormContentWrapper}>
            <form className={styles.registerFormContentContainer}>
              <p>
                <label for="name">Name</label>
                <input
                  placeholder="Enter your name"
                  id="name"
                  name="name"
                  required
                ></input>
              </p>
              <p>
              <label for="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  required
                ></input>
              </p>
              <p>
              <label for="username">Username</label>
                <input
                  placeholder="Username"
                  id="username"
                  name="username"
                  required
                ></input>
              </p>
              <p>
              <label for="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                ></input>
              </p>
              <p>
              <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                ></input>
              </p>
              <p>
                <input type="submit" id="register" value="SUBMIT"></input>
              </p>
            </form>
            <div className={styles.loginWrapper}>
              <p>
                Already have an account?&nbsp;
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
