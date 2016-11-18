import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';
import {Router, hashHistory} from 'react-router';
import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import ReduxPage from './containers/ReduxPage'
import RelayPage from './containers/RelayPage'
import 'react-virtualized/styles.css';
import 'react-resizable/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:4000/graphql'));

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={hashHistory}
            routes={
                <div>
                    <Route path='/' component={App}>
                        <IndexRoute component={HomePage}/>
                        <Route path='redux' component={ReduxPage}/>
                        <Route path='relay' component={RelayPage}/>
                    </Route>
                </div>
            }
        />
    </Provider>,
    document.getElementById('container')
);