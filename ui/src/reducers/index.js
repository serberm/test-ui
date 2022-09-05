import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import { API_ERROR, APP_CONFIG } from '../actions';
import { rootReducer as agreements } from '../pages/agreements/reducers';

const apiError = (state = false, action) => {
    switch (action.type) {
    case API_ERROR:
        return action.status;
    default:
        return state;
    }
};

const appConfig = (state = Map(), action) => {
    switch (action.type) {
    case APP_CONFIG:
        return fromJS(action.appConfig);
    default:
        return state;
    }
};

export default combineReducers({
    apiError,
    appConfig,
    agreements,
});
