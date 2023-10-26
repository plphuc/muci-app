import WelcomeImage from 'assets/WelcomeImage';
import styles from './WelcomePage.module.css';
import { Link } from 'react-router-dom';

function WelcomePage(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <WelcomeImage />
        <div className={styles.introWrapper}>
          <p className={styles.contentContainer}>
            Muci is the multitasking workspace where you can work better, faster
            and use features like: pomodoro timer, CRUD page,...
          </p>
          <div className={styles.authenBtnWrapper}>
            <Link to="authen"><div className={styles.authenBtn}>Login/Register</div></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
