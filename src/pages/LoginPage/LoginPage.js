import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as utils from 'common/utils/index.js';
import ShowHidePassword from 'common/components/ShowHidePassword/ShowHidePassword';
import { saveAccessToken, selectAccessToken } from 'slices/tokenSlice';
import { useGetUserQuery, useLoginMutation } from 'slices/userSlice';

import styles from './LoginPage.module.css';

function LoginPage(props) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isShowPw, setIsShowPw] = useState(false);
  const [loginUser] = useLoginMutation();
  const { refetch: getUser } = useGetUserQuery(accessToken, {
    skip: !accessToken,
  });
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const password = await utils.digestPassword(dataForm.get('password'));
    try {
      await loginUser({
        email: dataForm.get('email'),
        password,
      })
        .unwrap()
        .then((res) => {
          setIsValidLogin(true);
          utils.handleSaveToLocalStorage('refreshToken', res.tokens.refreshToken);
          dispatch(saveAccessToken(res.tokens.accessToken));
        });
    } catch (e) {
      setIsValidLogin(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUser()
        .unwrap()
        .then((res) => {
          navigate(`/${res.username}`);
        });
    }
  }, [accessToken])

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginFormWrapper}>
        <div className={styles.loginFormContainer}>
          <h1 className={styles.formTitle}>Login</h1>
          <div className={styles.loginFormContentWrapper}>
            <form
              className={styles.loginFormContentContainer}
              onSubmit={handleSubmitLogin}
            >
              <div>
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                ></input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={isShowPw ? 'text' : 'password'}
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                    pattern="^[^ ].+[^ ]$"
                  ></input>
                  <div onClick={() => setIsShowPw(!isShowPw)}>
                    <ShowHidePassword isShowPw={isShowPw} />
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={classNames(styles.invalidFields, {
                    [styles.isInvalidLogin]: !isValidLogin,
                  })}
                >
                  Incorrect email or password
                </div>
                <input type="submit" id="login" value="SUBMIT"></input>
              </div>
            </form>
            <div className={styles.registerWrapper}>
              <div>
                Don't have an account?&nbsp;
                <Link to="/register">Create account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
