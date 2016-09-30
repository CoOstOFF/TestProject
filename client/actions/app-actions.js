import {GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE, SQL_QUERY, GRAPHQL_QUERY} from '../contants';

export default function getData(query, queryType) {
    return (dispatch) => {
        dispatch({
            type: GET_DATA,
            payload: {fetching: true}
        });
        makeFetch(query, queryType)
            .then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                console.log('request succeeded with JSON response', data);
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

function makeFetch(query, queryType) {
    switch (queryType) {
        case SQL_QUERY:
            return fetch('/query', {
                method: 'post',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({query: query})
            });
        case GRAPHQL_QUERY:
            break;
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
