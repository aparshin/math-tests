import React from 'react'
import $ from 'jquery'

class Login extends React.Component{
    onLogin() {
        this.props.onLogin(this._username.value, this._password.value).catch(function() {
            let inputs = $([this._username, this._password]);
            inputs.addClass('login-input-error');
            setTimeout(function() {
                inputs.removeClass('login-input-error');
            }, 2000)
        }.bind(this))
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.onLogin()
        }
    }

    render() {
        if (this.props.username) {
            return (<div className="login-container">
                <span className="usename-title"> Имя: {this.props.username}</span>
                <button className="logout-btn" onClick={this.props.onLogout}>Выйти</button>
            </div>)
        } else {
            return (<div className="login-container">
                <span>Залогинься, друг:</span>
                <input
                    onKeyPress = {this.onKeyPress.bind(this)}
                    ref={(c) => this._username = c}
                    className = "username"
                />
                <span className="pass-title">Пароль:</span>
                <input
                    onKeyPress = {this.onKeyPress.bind(this)}
                    ref={(c) => this._password = c}
                    className = "password"
                    type="password"
                />
                <button onClick={this.onLogin.bind(this)} className="login-btn">Войти</button>
            </div>)
        }
    }
}

export default Login
