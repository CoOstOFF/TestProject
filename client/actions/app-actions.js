export default function getData(query) {
    return (dispatch) => {
        dispatch({
            type: 'GET_DATA'
        });

        fetch('/query', {
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
                dispatch({
                    type: 'GET_DATA_SUCCESS',
                    payload: data
                })
            })
            .catch(function (error) {
                console.log('request failed', error);
                dispatch({
                    type: 'GET_DATA_FAILURE',
                    payload: error
                })
            })
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
