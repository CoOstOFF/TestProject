import * as Constants from '../constants';

const initialState = {
    forms: {},
    fetching: false
};

export default function appState(state = initialState, action) {
    let {forms} = state;
    switch (action.type) {
        case Constants.ADD_FORM:
            let forms_af = {...forms};
            forms_af[action.payload.key.toString()] = action.payload;
            return {
                ...state,
                forms: forms_af
            };
        case Constants.DELETE_FORM:
            let forms_df = {...forms};
            delete forms_df[action.payload.key.toString()];
            return {
                ...state,
                forms: forms_df
            };
        case Constants.TURN_FORM:
            let forms_tf = {...forms};
            delete  forms_tf[action.payload.key.toString()];
            forms_tf[action.payload.key.toString()] = action.payload;
            return {
                ...state,
                forms: forms_tf
            };
        case Constants.GET_DATA:
            return {
                ...state,
                fetching: action.payload.fetching
            };
        case Constants.GET_DATA_SUCCESS:
            let forms_gds = {...forms};
            delete  forms_gds[action.payload.form.key.toString()];
            forms_gds[action.payload.form.key.toString()] = action.payload.form;
            return {
                ...state,
                forms: forms_gds,
                fetching: action.payload.fetching
            };
        case Constants.GET_DATA_FAILURE:
            let forms_gdf = {...forms};
            delete forms_gdf[action.payload.form.key.toString()];
            forms_gdf[action.payload.form.key.toString()] = action.payload.form;
            return {
                ...state,
                forms: forms_gdf,
                fetching: action.payload.fetching
            };
        default:
            return state;
    }
}