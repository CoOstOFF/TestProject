import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import ReduxPage from './containers/ReduxPage'
import RelayPage from './containers/RelayPage'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={HomePage}/>
            <Route path='redux' component={ReduxPage}/>
            <Route path='relay' component={RelayPage}/>
        </Route>
    </div>
);