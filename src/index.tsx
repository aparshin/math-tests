import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {toJS} from 'mobx'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { when } from 'mobx'

import reducer from './reducers'
import App from './components/app'
import {RootStore, StoreContext} from './stores/Root'
import axios from 'axios'

import './main.css'
import StatApp from './stat'

const store = new RootStore()

store.configStore.fetchConfig()
store.userStore.fetchCurrentUser()

when(() => store.userStore.hasUserInfo, () => {
    let reduxStore = createStore(reducer, {
        mode: 'SELECT_TEST',
        needSendResults: false
    });

    reduxStore.subscribe(() => {
        let state = reduxStore.getState()
        if (state.needSendResults) {

            axios.post(store.configStore.baseUrl + 'add', toJS(store.seriesStore), { withCredentials: true })

            reduxStore.dispatch({
                type: 'SENT_RESULTS'
            })
        }
    })

    render(
        <StoreContext.Provider value={store}>
            <Provider store={reduxStore}>
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
        </StoreContext.Provider>,
      document.getElementById('root')
    )
})