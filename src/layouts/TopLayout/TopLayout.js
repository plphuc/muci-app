import LogoSvg from 'assets/LogoSVG';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu';
import {
  productDropdownMenu,
  instructDropdownMenu,
  downloadOptions,
} from 'common/utils/contants';
import { useGetUserQuery } from 'slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveAccessToken,
  selectAccessToken,
} from 'slices/tokenSlice';

import styles from './TopLayout.module.css';

function TopLayout(props) {
  const refreshToken = localStorage.getItem('refreshToken');

  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);
  const { refetch: getUser } = useGetUserQuery(accessToken);

  window.onscroll = function () {
    setIsScrolled(document.documentElement.scrollTop > 1);
  };

  useEffect(() => {
    getUser()
      .unwrap()
      .then((res) => {
        dispatch(saveAccessToken(res.accessToken));
        navigate(`${res.username}`);
      })
      .catch((err) => {});
  }, [accessToken, refreshToken]);

  return (
    <div className={styles.wrapper}>
      <nav
        className={classNames(styles.navWrapper, {
          [styles.isScrolled]: isScrolled,
        })}
      >
        <div className={styles.leftWrapper}>
          <Link to="/" className={styles.logoWrapper}>
            <LogoSvg />
          </Link>
          <ul className={styles.navListWrapper}>
            <li className={styles.navItem}>
              <p>Product</p>
              <div className={styles.dropdownMenuWrapper}>
                <DropdownMenu style={{ minWidth: '425px' }}>
                  <div className={styles.productWrapper}>
                    {productDropdownMenu.map((product, idx) => (
                      <div className={styles.productContainer} key={idx}>
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
                    {instructDropdownMenu.map((product, idx) => (
                      <div className={styles.productContainer} key={idx}>
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
                  {downloadOptions.map((options, idx) => (
                    <div className={styles.downloadOptionWrapper} key={idx}>
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
                  {downloadOptions.map((options, idx) => (
                    <div className={styles.downloadOptionWrapper} key={idx}>
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
                  {downloadOptions.map((options, idx) => (
                    <div className={styles.downloadOptionWrapper} key={idx}>
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
