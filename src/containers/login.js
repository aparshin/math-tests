import {connect} from 'react-redux'
import LoginComponent from '../components/login'
import Config from '../config'

import $ from 'jquery'

const Login = connect(
    (state) => {return {username: state.username}},
    (dispatch) => {
        return {
            onLogin: (username, password) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type:'POST',
                        xhrFields: {
                            withCredentials: true
                        },
                        url: Config.get().baseUrl + 'login',
                        data:  {username, password},
                        success:function (result) {
                            var serverUsername = result ? result.username : null;
                            dispatch({
                                type: 'USER_LOGIN',
                                username: serverUsername
                            })
                            resolve();
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            reject();
                        }
                    })
                })
            },
            onLogout: () => {
                $.ajax({
                    url: Config.get().baseUrl + 'logout',
                    xhrFields: {
                        withCredentials: true
                    }
                }).then(() => {
                    dispatch({
                        type: 'USER_LOGOUT'
                    })
                })
            }
        }
    }
)(LoginComponent)

export default Login
