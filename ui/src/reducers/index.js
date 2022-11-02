import { combineReducers } from 'redux-immutable';
import { API_ERROR } from '../actions';
import { rootReducer as agreements } from '../pages/agreements/reducers';

const apiError = (state = false, action) => {
    switch (action.type) {
    case API_ERROR:
        return action.status;
    default:
        return state;
    }
};

export default combineReducers({
    apiError,
    agreements,
});
