import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import HomeContainer from './containers/HomeContainer'
import ReduxContainer from './containers/ReduxContainer'
import RelayContainer from './containers/RelayContainer'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={HomeContainer}/>
            <Route path='redux' component={ReduxContainer}/>
            <Route path='relay' component={RelayContainer}/>
        </Route>
    </div>
);