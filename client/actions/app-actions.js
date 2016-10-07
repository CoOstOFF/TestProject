import * as Constants from '../constants';

export default function getData(query, queryType) {
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
                        data: data,
                        error: null,
                        fetching: false
                    }
                })

            })
            .catch(function (error) {
                console.log('request failed', error);
                dispatch({
                    type: Constants.GET_DATA_FAILURE,
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
