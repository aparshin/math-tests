import {connect} from 'react-redux'
import axios from 'axios'

import LoginComponent from '../components/login'
import Config from '../config'

const Login = connect(
    (state) => {return {username: state.username}},
    (dispatch) => {
        return {
            onLogin: (username, password) => axios.post(
                    Config.get().baseUrl + 'login',
                    `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).then(result => {
                    var serverUsername = result.data ? result.data.username : null;
                    dispatch({
                        type: 'USER_LOGIN',
                        username: serverUsername
                    })
                }),
            onLogout: () => {
                axios.get(Config.get().baseUrl + 'logout', { withCredentials: true })
                    .then( () => {
                    dispatch({
                        type: 'USER_LOGOUT'
                    })
                })
            }
        }
    }
)(LoginComponent)

export default Login
