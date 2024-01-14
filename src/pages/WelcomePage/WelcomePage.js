import WelcomeImage from 'assets/WelcomeImage.js';
import { Link } from 'react-router-dom';

import styles from './WelcomePage.module.css';
import stylesResponsive from './WelcomePageResponsive.module.css';

function WelcomePage(props) {
  return (
    <div className={styles.wrapper}>
      <div className={stylesResponsive.contentWrapper}>
        <div className={styles.welcomeImageWrapper}>
          <WelcomeImage />
        </div>
        <div className={styles.introWrapper}>
          <p className={stylesResponsive.contentContainer}>
            Muci is the multitasking workspace where you can work better, faster
            and use features like: pomodoro timer, CRUD page,...
          </p>
          <div className={styles.actionsWrapper}>
            <Link to="register" className={styles.authenBtnWrapper}>
              <span className={styles.authenBtn}>Register</span>
            </Link>
            <Link to="login" className={styles.authenBtnWrapper}>
              <span className={styles.authenBtn}>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
