const initialState = {
    data: [],
    error: null,
    fetching: false
};

export default function appState(state = initialState, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                fetching: action.payload.fetching
            };
        case 'GET_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                error: action.payload.error,
                fetching: action.payload.fetching
            };
        case 'GET_DATA_FAILURE':
            return {
                ...state,
                data: action.payload.data,
                error: action.payload.error,
                fetching: action.payload.fetching
            };
        default:
            return state;
    }
}