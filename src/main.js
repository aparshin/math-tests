import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

import reducer from './reducers'
import App from './containers/app'
import Config from './config'

import $ from 'jquery'

let start = function(userInfo) {
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
            <App />
        </Provider>,
      document.getElementById('example')
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
