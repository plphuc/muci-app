import LogoSvg from 'assets/LogoSVG';
import styles from './TopLayout.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import DropdownMenu from 'components/DropdownMenu/DropdownMenu';
import {
  productDropdownMenu,
  instructDropdownMenu,
  downloadOptions,
} from 'utils/contants';
function TopLayout(props) {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = function () {
    setIsScrolled(document.documentElement.scrollTop > 1);
  };

  return (
    <div className={styles.wrapper}>
      <nav
        className={classNames(styles.navWrapper, {
          [`${styles.isScrolled}`]: isScrolled,
        })}
      >
        <div className={styles.leftWrapper}>
          <div className={styles.logoWrapper}>
            <LogoSvg />
          </div>
          <ul className={styles.navListWrapper}>
            <li className={styles.navItem}>
              <p>Product</p>
              <div className={styles.dropdownMenuWrapper}>
                <DropdownMenu style={{ minWidth: '425px' }}>
                  <div className={styles.productWrapper}>
                    {productDropdownMenu.map((product) => (
                      <div className={styles.productContainer}>
                        {product.icon}
                        <div className={styles.productContent}>
                          <p className={styles.productName}>{product.name}</p>
                          <p className={styles.productDescription}>
                            {product.des}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.productWrapper}>
                    {instructDropdownMenu.map((product) => (
                      <div className={styles.productContainer}>
                        <div className={styles.productContent}>
                          <p className={styles.productName}>{product.name}</p>
                          <p className={styles.productDescription}>
                            {product.des}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DropdownMenu>
              </div>
            </li>
            <li className={styles.navItem}>
              <p>Download</p>
              <div className={styles.dropdownMenuWrapper}>
                <DropdownMenu
                  style={{ flexDirection: 'column', minWidth: '180px' }}
                >
                  {downloadOptions.map((options) => (
                    <div className={styles.downloadOptionWrapper}>
                      {options}
                    </div>
                  ))}
                </DropdownMenu>
              </div>
            </li>
            <li className={styles.navItem}>
              <p>Solutions</p>
              <div className={styles.dropdownMenuWrapper}>
                <DropdownMenu
                  style={{ flexDirection: 'column', minWidth: '180px' }}
                >
                  {downloadOptions.map((options) => (
                    <div className={styles.downloadOptionWrapper}>
                      {options}
                    </div>
                  ))}
                </DropdownMenu>
              </div>
            </li>
            <li className={styles.navItem}>
              <p>Resources</p>
              <div className={styles.dropdownMenuWrapper}>
                <DropdownMenu
                  style={{ flexDirection: 'column', minWidth: '180px' }}
                >
                  {downloadOptions.map((options) => (
                    <div className={styles.downloadOptionWrapper}>
                      {options}
                    </div>
                  ))}
                </DropdownMenu>
              </div>
            </li>
            <li className={styles.navItem}>Pricing</li>
          </ul>
        </div>
        <ul className={styles.actionsWrapper}>
          <li className={styles.actionItem}>Request a demo</li>
          <div className={styles.divider}></div>
          <Link to="/authen">
            <li className={styles.actionItem}>Log in</li>
          </Link>
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
