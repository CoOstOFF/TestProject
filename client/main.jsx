import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';
import {Router, hashHistory, Route, IndexRedirect} from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import ReduxPage from './containers/ReduxPage'
import RelayPage from './containers/RelayPage'
import Auth from './Auth'
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
                    <Route path='login' component={LoginPage}/>
                    <Route path='/' component={App} onEnter={(nextState, replace) => {
                        if (!Auth.isAuthSkipped())
                            replace('/login')
                    }}>
                        <IndexRedirect to="/home"/>
                        <Route path='home' component={HomePage}/>
                        <Route path='redux' component={ReduxPage}/>
                        <Route path='relay' component={RelayPage}/>
                    </Route>
                </div>
            }
        />
    </Provider>,
    document.getElementById('container')
);