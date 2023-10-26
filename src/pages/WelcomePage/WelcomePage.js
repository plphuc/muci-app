import WelcomeImage from 'assets/WelcomeImage';
import styles from './WelcomePage.module.css';

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
            <div className={styles.authenBtn}>Login/Register</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
