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

import $ from 'jquery'

import './main.css'
import 'tooltipster/dist/css/tooltipster.bundle.min.css'
import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-light.min.css'
import StatApp from './stat'

let start = function(userInfo: any) {
    let store = createStore(reducer, {
        mode: 'SELECT_TEST',
        username: userInfo ? userInfo.username : null
    });

    store.subscribe(() => {
        let state = store.getState()
        if (state.needSendResults) {
            $.ajax(Config.get().baseUrl + 'add', {
                xhrFields: {
                    withCredentials: true
                },
                data : JSON.stringify(state.series),
                contentType : 'application/json',
                type : 'POST'
            })

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
    $.ajax({
        url: Config.get().baseUrl + 'login',
        xhrFields: {
            withCredentials: true
        }
    }).then(start, start.bind(null, null))
})
