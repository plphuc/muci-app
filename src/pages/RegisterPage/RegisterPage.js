import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import * as utils from 'common/utils/index.js';
import {
  saveUserInfo,
  useGetUserQuery,
  useRegisterMutation,
} from 'slices/userSlice';
import { selectAccessToken } from 'slices/tokenSlice';
import { saveAccessToken } from 'slices/tokenSlice';

import ErrorField from 'common/components/ErrorField/ErrorField';
import ShowHidePassword from 'common/components/ShowHidePassword/ShowHidePassword';

import { useAddPageMutation } from 'slices/pageApiSlice';

import styles from './RegisterPage.module.css';
import stylesResponsive from './RegisterResponsive.module.css';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);

  const [isShowPw, setIsShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerFail, setRegisterFail] = useState('')

  const [registerUser] = useRegisterMutation();
  const [addPage] = useAddPageMutation();
  const { refetch: getUser } = useGetUserQuery(accessToken, {
    skip: !accessToken,
  });

  const handleOnFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleRequireField = (e) => {
    const nameField = e.target.name;
    if (!e.target.value.trim()) {
      setErrors({
        ...errors,
        [nameField]: 'This field is required',
      });
    }
  };

  const handleOnBlurName = (e) => {
    if (!e.target.value.trim()) {
      setErrors({
        ...errors,
        name: 'Name is required',
      });
    }
  };

  const handleOnBlurEmail = (e) => {
    const value = e.target.value;
    if (!validator.isEmail(value)) {
      setErrors({
        ...errors,
        email: 'Email is invalid',
      });
    }
  };

  const handleOnBlurPw = (e) => {
    const value = e.target.value;
    const passwordErrors = utils.checkPasswordValidation(value);
    setErrors({
      ...errors,
      password: passwordErrors,
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target);

    if (dataForm.get('confirmPassword') !== dataForm.get('password')) {
      setErrors({
        ...errors,
        confirmPassword: 'Confirm password does not match',
      });
      return;
    } else {
      const data = {};
      for (const [name, value] of dataForm) {
        data[name] = value;
      }

      data.password = await utils.digestPassword(data.password);
      const { confirmPassword, ...registerData } = data;

      try {
        const registerResult = await registerUser(registerData).unwrap();

        dispatch(saveAccessToken(registerResult.tokens.accessToken));
        utils.handleSaveToLocalStorage(
          'refreshToken',
          registerResult.tokens.refreshToken
        );

        // auto add 1st page for user
        addPage(registerResult.tokens.accessToken);
      } catch (err) {
        setRegisterFail(err.data.message)
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUser()
        .unwrap()
        .then((res) => {
          dispatch(saveUserInfo(res));
          navigate(`${res.username}`);
        });
    }
  }, [accessToken]);

  return (
    <div className={styles.wrapper}>
      <div className={stylesResponsive.registerFormWrapper}>
        <div className={styles.registerFormContainer}>
          <h1 className={styles.formTitle}>Register</h1>
          <div className={styles.registerFormContentWrapper}>
            <form
              className={styles.registerFormContentContainer}
              onSubmit={handleSubmitRegister}
            >
              <div className={styles.fieldWrapper}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    required
                    onBlur={handleOnBlurName}
                    onFocus={handleOnFocus}
                  ></input>
                </div>
                <div className={styles.errorContainer}>
                  {errors.name && <ErrorField message={errors.name} />}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    required
                    onBlur={handleOnBlurEmail}
                    onFocus={handleOnFocus}
                  ></input>
                </div>
                <div className={styles.errorContainer}>
                  {errors.email && <ErrorField message={errors.email} />}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    required
                    pattern="^[^ ].+[^ ]$\g"
                    onFocus={handleOnFocus}
                    onBlur={handleRequireField}
                  ></input>
                </div>
                <div className={styles.errorContainer}>
                  {errors.username && <ErrorField message={errors.username} />}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <div>
                  <label htmlFor="password">Password</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      type={isShowPw ? 'text' : 'password'}
                      placeholder="Password"
                      id="password"
                      name="password"
                      required
                      onBlur={handleOnBlurPw}
                      onFocus={handleOnFocus}
                    ></input>
                    <div onClick={() => setIsShowPw(!isShowPw)}>
                      <ShowHidePassword isShowPw={isShowPw} />
                    </div>
                  </div>
                </div>
                <div className={styles.errorContainer}>
                  {errors.password &&
                    errors.password.map((message, idx) => (
                      <ErrorField message={message} idx={idx} />
                    ))}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={isShowPw ? 'text' : 'password'}
                    placeholder="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    pattern="^[^ ].+[^ ]$"
                    onFocus={handleOnFocus}
                    onBlur={handleRequireField}
                  ></input>
                  <div onClick={() => setIsShowPw(!isShowPw)}>
                    <ShowHidePassword isShowPw={isShowPw} />
                  </div>
                </div>
                <div className={styles.errorContainer}>
                  {errors.confirmPassword && (
                    <ErrorField message={errors.confirmPassword} />
                  )}
                </div>
              </div>
              <div className='text-red-300 text-left w-full'>{registerFail}</div>
              <div className='w-full'>
                <input type="submit" id="register" value="SUBMIT"></input>
              </div>
            </form>
            <div className={styles.loginWrapper}>
              <div>
                Already have an account?&nbsp;
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
