import React from 'react'
import {render} from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { when } from 'mobx'

import App from './components/app'
import {RootStore, StoreContext} from './stores/Root'

import './main.css'
import StatApp from './stat'

const store = new RootStore()

store.configStore.fetchConfig()
store.userStore.fetchCurrentUser()

when(() => store.userStore.hasUserInfo, () => {
    render(
        <StoreContext.Provider value={store}>
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
        </StoreContext.Provider>,
      document.getElementById('root')
    )
})