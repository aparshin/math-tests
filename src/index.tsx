import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import reducer from './reducers'
import App from './containers/app'
import Config from './config'
import axios from 'axios'

import './main.css'
import 'tooltipster/dist/css/tooltipster.bundle.min.css'
import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-light.min.css'
import StatApp from './stat'

interface UserInfo {
    username: string
}

let start = function(userInfo: UserInfo | null) {
    let store = createStore(reducer, {
        mode: 'SELECT_TEST',
        username: userInfo ? userInfo.username : null,
        needSendResults: false
    });

    store.subscribe(() => {
        let state = store.getState()
        if (state.needSendResults) {
            const config = Config.get()

            config && axios.post(config.baseUrl + 'add', state.series, { withCredentials: true })

            store.dispatch({
                type: 'SENT_RESULTS'
            })
        }
    })

    render(
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>
                    <Route exact path="/stat">
                        <StatApp config={Config.get()}/>
                    </Route>
                </Switch>
            </Router>
        </Provider>,
      document.getElementById('root')
    )
}

Config.load().then(() => {
    const config = Config.get()
    config && axios.get<UserInfo>(config.baseUrl + 'login', { withCredentials: true })
    .then(response => start(response.data), () => start(null))
})
