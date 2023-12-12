import WelcomeImage from 'assets/WelcomeImage.js';
import styles from './WelcomePage.module.css';
import { Link } from 'react-router-dom';

function WelcomePage(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.welcomeImageWrapper}>
          <WelcomeImage />
        </div>
        <div className={styles.introWrapper}>
          <p className={styles.contentContainer}>
            Muci is the multitasking workspace where you can work better, faster
            and use features like: pomodoro timer, CRUD page,...
          </p>
          <div className={styles.actionsWrapper}>
            <Link to="register" className={styles.authenBtnWrapper}>
              <div className={styles.authenBtn}>Register</div>
            </Link>
            <Link to="login" className={styles.authenBtnWrapper}>
              <div className={styles.authenBtn}>Login</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
