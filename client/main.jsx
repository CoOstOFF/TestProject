import React from 'react';
import ReactDOM from 'react-dom';
import MyEditTextForm from './components/EditTextForm';
import MyTable from './components/Table';
import MyAppBar from './components/AppBar';
import MyAlert from './components/Alert';
import MyProgressBar from './components/ProgressBar'
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';
require('bootstrap/dist/css/bootstrap.css');

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <MyAppBar />
            <MyAlert />
            <MyTable />
            <MyProgressBar/>
            <MyEditTextForm />
        </div>
    </Provider>,
    document.getElementById('app'));