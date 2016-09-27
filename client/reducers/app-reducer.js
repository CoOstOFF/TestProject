const initialState = {
    data: [],
    error: null
};

export default function appState(state = initialState, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {...state};
        case 'GET_DATA_SUCCESS':
            return {...state, data: action.payload};
        case 'GET_DATA_FAILURE':
            return {...state, error: action.payload};
        default:
            return state;
    }
}