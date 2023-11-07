import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import validator from 'validator';

import ErrorField from 'common/components/ErrorField/ErrorField';
import * as utils from 'common/utils/index.js'

import styles from './RegisterPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'states/userSlice';
function RegisterPage(props) {
  const [errors, setErrors] = useState({});
  const userData = useSelector(state => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

    if (!dataForm.get('confirmPassword') === dataForm.get('password')) {
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
        dispatch(registerUser(registerData))
        console.log(userData);
        // const response = await axiosInstance.post('/auth/register',registerData);
        if (userData.status === 'succeeded') {
          utils.handleSaveTokens(userData.tokens)
          navigate(`/${userData.user.username}`)
        }
        if (userData.error) {
          console.log(userData.error);
        }
        // await axiosInstance.post('/auth/login', response.data?.tokens)
      } catch {
        console.error();
        // handle annouce not valid data
        
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.registerFormWrapper}>
        <div className={styles.registerFormContainer}>
          <h1 className={styles.formTitle}>Register</h1>
          <div className={styles.registerFormContentWrapper}>
            <form
              className={styles.registerFormContentContainer}
              onSubmit={handleSubmitRegister}
            >
              <div className={styles.fieldWrapper}>
                <p>
                  <label htmlFor="name">Name</label>
                  <input
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    required
                    onBlur={handleOnBlurName}
                    onFocus={handleOnFocus}
                  ></input>
                </p>
                <div className={styles.errorContainer}>
                  {errors.name && <ErrorField message={errors.name} />}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <p>
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
                </p>
                <div className={styles.errorContainer}>
                  {errors.email && <ErrorField message={errors.email} />}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <p>
                  <label htmlFor="username">Username</label>
                  <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    required
                    pattern="^[^ ].+[^ ]$"
                    onFocus={handleOnFocus}
                    onBlur={handleRequireField}
                  ></input>
                </p>
                <div className={styles.errorContainer}>
                  {errors.username && <ErrorField message={errors.username} />}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                    onBlur={handleOnBlurPw}
                    onFocus={handleOnFocus}
                  ></input>
                </p>
                <div className={styles.errorContainer}>
                  {errors.password &&
                    errors.password.map((message) => (
                      <ErrorField message={message} />
                    ))}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <p>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    pattern="^[^ ].+[^ ]$"
                    onFocus={handleOnFocus}
                    onBlur={handleRequireField}
                  ></input>
                </p>
                <div className={styles.errorContainer}>
                  {errors.confirmPassword && (
                    <ErrorField message={errors.confirmPassword} />
                  )}
                </div>
              </div>
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