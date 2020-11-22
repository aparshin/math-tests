import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {useConfig} from '../stores/Config'
import { RootState } from '../reducers'

export default function Login() {
    const dispatch = useDispatch()
    const config = useConfig()

    const curUsername = useSelector((state: RootState) => state.username)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (showError) {
                setShowError(false)
            }
        }, 2000)
        return () => clearTimeout(timeoutId)
    }, [showError])

    const onLogin = useCallback(async () => {
        try {
            const response = await axios.post(config.baseUrl + 'login',
                `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                }
            )
            const serverUsername = response.data ? response.data.username : null;

            dispatch({
                type: 'USER_LOGIN',
                username: serverUsername
            })
        } catch (e) {
            setShowError(true)
        }
    }, [dispatch, password, username, config.baseUrl])

    const onLogout = useCallback(() => {
        axios.get(config.baseUrl + 'logout', { withCredentials: true })
            .then( () => {
            dispatch({
                type: 'USER_LOGOUT'
            })
        })
    }, [dispatch, config.baseUrl])

    const onKeyPress = useCallback(e => {
        if (e.key === 'Enter') {
            onLogin()
        }
    }, [onLogin])

    const onUsernameChange = useCallback(e => {
        setUsername(e.target.value)
    }, [])

    const onPasswordChange = useCallback(e => {
        setPassword(e.target.value)
    }, [])

    if (curUsername) {
        return (<div className="login-container">
            <span className="usename-title"> Имя: {curUsername}</span>
            <button className="logout-btn" onClick={onLogout}>Выйти</button>
        </div>)
    } else {
        return (<div className="login-container">
            <span>Залогинься, друг:</span>
            <input
                onKeyPress = {onKeyPress}
                className={clsx('username', showError && 'login-input-error')}
                onChange={onUsernameChange}
            />
            <span className="pass-title">Пароль:</span>
            <input
                onKeyPress = {onKeyPress}
                className={clsx('password', showError && 'login-input-error')}
                type="password"
                onChange={onPasswordChange}
            />
            <button onClick={onLogin} className="login-btn">Войти</button>
        </div>)
    }
}