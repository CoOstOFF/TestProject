import React from 'react';
import ReactDOM from 'react-dom';
import EditTextForm from './components/edit-text-form';
import MyTable from './components/table';
import HeaderNavigation from './components/app_bar';
require('bootstrap/dist/css/bootstrap.css');

ReactDOM.render(
    <HeaderNavigation />,
    document.getElementById('app_bar'));

ReactDOM.render(
    <EditTextForm onClick={onClick}/>,
    document.getElementById('edit_text_form'));

function onClick(queryText) {
    fetch('/query', {
        method: 'post',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({query: queryText})
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            console.log('request succeeded with JSON response', data);
            ReactDOM.render(
                <MyTable data={data}/>,
                document.getElementById('table'));
        }).catch(function (error) {
        console.log('request failed', error)
    })
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}
