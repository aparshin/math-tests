import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { when } from 'mobx'

import reducer from './reducers'
import App from './components/app'
import {Config, ConfigContext} from './stores/Config'
import axios from 'axios'

import './main.css'
import StatApp from './stat'

interface UserInfo {
    username: string
}

const config = new Config()

let start = function(userInfo: UserInfo | null) {
    let store = createStore(reducer, {
        mode: 'SELECT_TEST',
        username: userInfo ? userInfo.username : null,
        needSendResults: false
    });

    store.subscribe(() => {
        let state = store.getState()
        if (state.needSendResults) {

            axios.post(config.baseUrl + 'add', state.series, { withCredentials: true })

            store.dispatch({
                type: 'SENT_RESULTS'
            })
        }
    })

    render(
        <ConfigContext.Provider value={config}>
            <Provider store={store}>
                <Router basename="/multiplication">
                    <Switch>
                        <Route exact path="/">
                            <App />
                        </Route>
                        <Route exact path="/stat">
                            <StatApp/>
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </ConfigContext.Provider>,
      document.getElementById('root')
    )
}

config.fetchConfig()

when(() => config.state === 'received', () => {
    axios.get<UserInfo>(config.baseUrl + 'login', { withCredentials: true })
        .then(response => start(response.data), () => start(null))
})