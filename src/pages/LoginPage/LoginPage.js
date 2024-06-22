import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as utils from 'common/utils/index.js'
import { saveAccessToken, selectAccessToken } from 'slices/tokenSlice'
import {
    saveUserInfo,
    useGetUserQuery,
    useLoginMutation,
} from 'slices/userSlice'

import stylesResponsive from './LoginPageResponsive.module.css'
import styles from './LoginPage.module.css'
import { Button, Form, Input } from 'antd'
import { REQUIRE_FIELD, REQUIRED_VALID_EMAIL } from 'common/message.constant'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

function LoginPage(props) {
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const [isShowPw, setIsShowPw] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loginUser] = useLoginMutation()
    const { refetch: getUser } = useGetUserQuery(accessToken, {
        skip: !accessToken,
    })
    const navigate = useNavigate()

    const handleSubmitLogin = async (e) => {
        const password = await utils.digestPassword(e.password)
        setErrorMessage('')
        try {
            const loginResult = await loginUser({
                email: e.email,
                password,
            }).unwrap()
            utils.handleSaveToLocalStorage(
                'refreshToken',
                loginResult.tokens.refreshToken
            )
            dispatch(saveAccessToken(loginResult.tokens.accessToken))
        } catch (e) {
            setErrorMessage(e.data.message)
        }
    }

    useEffect(() => {
        if (accessToken) {
            getUser()
                .unwrap()
                .then((res) => {
                    dispatch(saveUserInfo(res))
                    navigate(`/${res.username}`)
                })
        }
    }, [accessToken])

    return (
        <div className={styles.wrapper}>
            <div className={stylesResponsive.loginFormWrapper}>
                <div className={styles.loginFormContainer}>
                    <h1 className={styles.formTitle}>Login</h1>
                    <div className={styles.loginFormContentWrapper}>
                        <Form
                            className={styles.loginFormContentContainer}
                            onFinish={handleSubmitLogin}
                            layout="vertical"
                        >
                            <Form.Item
                                className="m-0"
                                label="Email"
                                name="email"
                                rules={[
                                    { type: 'email', message: REQUIRED_VALID_EMAIL },
                                    {
                                        required: true,
                                        message: REQUIRE_FIELD('Email'),
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                className="m-0"
                                label="Password"
                                name="password"
                            >
                                <div className="relative">
                                    <Input
                                        type={isShowPw ? 'text' : 'password'}
                                        placeholder="Password"
                                    />
                                    <div
                                        className="absolute bottom-0 -translate-y-1/2 right-3"
                                        onClick={() => setIsShowPw(!isShowPw)}
                                    >
                                        {isShowPw ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </div>
                                </div>
                            </Form.Item>
                            <div className="text-red-400">{errorMessage}</div>
                            <div>
                                <Form.Item className="w-full">
                                    <Button
                                        style={{
                                            width: '100%',
                                            background: 'black',
                                            fontWeight: 600,
                                        }}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
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
    )
}

export default LoginPage
