import React, { useCallback, useState, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
import clsx from 'clsx'
import {useStore} from '../stores/Root'

export default observer(function Login() {
    const {userStore} = useStore()

    const curUsername = userStore.username

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (userStore.lastLoginState === 'error') {
            setShowError(true)

            const timeoutId = setTimeout(() => {
                setShowError(false)
            }, 2000)

            return () => clearTimeout(timeoutId)
        }
    }, [userStore.lastLoginState])

    const onLogin = useCallback(async () => {
        await userStore.login(username, password)
    }, [password, username, userStore])

    const onLogout = useCallback(async () => {
        await userStore.logout()
    }, [userStore])

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
})