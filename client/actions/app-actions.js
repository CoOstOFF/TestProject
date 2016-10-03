import {GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE, SQL_QUERY, GRAPHQL_QUERY} from '../constants';

export default function getData(query, queryType) {
    return (dispatch) => {
        dispatch({
            type: GET_DATA,
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
                console.log('request succeeded with JSON response', data);
                for (var key in data['data']) {
                    if (data['data'].hasOwnProperty(key)) {
                        if (key == 'employees') {
                            data = data['data'][key];
                        }
                    }
                }
                dispatch({
                    type: GET_DATA_SUCCESS,
                    payload: {
                        data: data,
                        error: null,
                        fetching: false
                    }
                })

            })
            .catch(function (error) {
                console.log('request failed', error);
                dispatch({
                    type: GET_DATA_FAILURE,
                    payload: {
                        data: [],
                        error: error,
                        fetching: false
                    }
                })
            })
    }
}

function fetchUrl(queryType) {
    switch (queryType) {
        case SQL_QUERY:
        default:
            return '/query';
        case GRAPHQL_QUERY:
            return 'http://localhost:4000/graphql/';
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
