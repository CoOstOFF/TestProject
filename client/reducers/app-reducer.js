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
        case Constants.UPDATE_FORMS_LAYOUT:
            let forms_ufl = {...forms};
            action.payload.forEach((item, i, arr) => {
                if (item.i != "toolbar") {
                    let form = {...forms_ufl[item.i]};
                    delete form.layoutParams;
                    form.layoutParams = item;
                    delete forms_ufl[item.i];
                    forms_ufl[item.i] = form;
                }
            });
            return {
                ...state,
                forms: forms_ufl
            };
        case Constants.GET_DATA:
            return {
                ...state,
                fetching: action.payload.fetching
            };
        case Constants.GET_DATA_SUCCESS:
            let forms_gds = {...forms};
            let form_gds = {...forms_gds[action.payload.key.toString()]};
            delete form_gds.data;
            delete form_gds.query;
            delete form_gds.queryType;
            form_gds.data = action.payload.data;
            form_gds.query = action.payload.query;
            form_gds.queryType = action.payload.queryType;
            delete forms_gds[action.payload.key.toString()];
            forms_gds[action.payload.key.toString()] = form_gds;
            return {
                ...state,
                forms: forms_gds,
                fetching: action.payload.fetching
            };
        case Constants.GET_DATA_FAILURE:
            return {
                ...state,
                forms: {...forms, ...{...forms[action.payload.key.toString()], ...action.payload}},
                fetching: action.payload.fetching
            };
        default:
            return state;
    }
}