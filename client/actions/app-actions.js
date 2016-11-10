import * as Constants from '../constants';

export function addForm(form) {
    return {
        type: Constants.ADD_FORM,
        payload: form,
        fetching: false
    }
}

export function deleteForm(form) {
    return {
        type: Constants.DELETE_FORM,
        payload: form
    }
}

export function turnForm(form) {
    return {
        type: Constants.TURN_FORM,
        payload: form
    }
}

export function updateFormsLayout(layout) {
    return {
        type: Constants.UPDATE_FORMS_LAYOUT,
        payload: layout
    }
}

export function removeError(key) {
    return {
        type: Constants.REMOVE_ERROR,
        payload: key
    }
}

export function getData(key, query, queryType) {
    return (dispatch) => {
        dispatch({
            type: Constants.GET_DATA,
            payload: {fetching: true}
        });
        fetch(fetchUrl(queryType), {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({query: query})
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                let parsedData = data['data'];
                for (let key in parsedData) {
                    if (parsedData.hasOwnProperty(key)) {
                        data = parsedData[key];
                    }
                }
                dispatch({
                    type: Constants.GET_DATA_SUCCESS,
                    payload: {
                        key: key,
                        data: data,
                        query: query,
                        queryType: queryType,
                        fetching: false
                    }
                })

            })
            .catch(function (error) {
                console.log('request failed', error);
                dispatch({
                    type: Constants.GET_DATA_FAILURE,
                    payload: {
                        key: key,
                        error: error,
                        query: query,
                        queryType: queryType,
                        fetching: false
                    }
                })
            })
    }
}

export function deleteTable(tableName) {
    return (dispatch) => {
        dispatch({
            type: Constants.DELETE_TABLE_SERVER,
            payload: tableName
        });
        fetch('/', {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({query: "drop table " + tableName})
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                console.log("action delete table");
                console.log(data);
            })
    }
}

function fetchUrl(queryType) {
    switch (queryType) {
        case Constants.SQL_QUERY:
        default:
            return '/query';
        case Constants.GRAPHQL_QUERY:
            return 'http://192.168.0.53:4000/graphql/';
    }
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
