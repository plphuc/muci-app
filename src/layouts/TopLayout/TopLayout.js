import LogoSvg from 'assets/LogoSVG';
import styles from './TopLayout.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function TopLayout(props) {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = function () {
    setIsScrolled(document.documentElement.scrollTop > 1)
  };

  return (
    <div className={styles.wrapper}>
      <nav className={classNames(styles.navWrapper, {[`${styles.isScrolled}`]: isScrolled})}>
        <div className={styles.leftWrapper}>
          <div className={styles.logoWrapper}>
            <LogoSvg />
          </div>
          <ul className={styles.navListWrapper}>
            <li className={styles.navItem}>Product</li>
            <li className={styles.navItem}>Download</li>
            <li className={styles.navItem}>Solutions</li>
            <li className={styles.navItem}>Resources</li>
            <li className={styles.navItem}>Pricing</li>
          </ul>
        </div>
        <ul className={styles.actionsWrapper}>
          <li className={styles.actionItem}>Request a demo</li>
          <div className={styles.divider}></div>
          <li className={styles.actionItem}>Log in</li>
          <li className={styles.actionBtnWrapper}>
            <a href="/" className={styles.actionBtn}>
              Get Notion free
            </a>
          </li>
        </ul>
      </nav>
  
      <Outlet />
    </div>
  );
}

export default TopLayout;
