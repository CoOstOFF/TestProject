import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';
import {Router, hashHistory} from 'react-router';
import {routes} from './routes'
require('react-virtualized/styles.css');
require('react-resizable/css/styles.css');
require('bootstrap/dist/css/bootstrap.min.css');

const store = configureStore();

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:4000/graphql'));

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>,
    document.getElementById('container')
);