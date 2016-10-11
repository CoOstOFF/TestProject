import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';
import {Router, browserHistory} from 'react-router';
import {routes} from './routes'
require('bootstrap/dist/css/bootstrap.css');

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('container')
);