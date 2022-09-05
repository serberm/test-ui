import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import {
    AGREEMENT_DATA,
    AGREEMENT_EDIT_SAVING,
    AGREEMENT_EDIT_VALUE,
    AGREEMENT_ENTITY_DATA,
    AGREEMENT_LOAD_STATUS,
} from '../actions';

const meta = (state = Map(), action) => {
    switch (action.type) {
    case AGREEMENT_LOAD_STATUS:
        return state.setIn(['loaded', action.dataLabel], action.isLoaded);
    default:
        return state;
    }
};

const entityData = (state = Map(), action) => {
    switch (action.type) {
    case AGREEMENT_ENTITY_DATA:
        return fromJS(action.entityData.reduce((m, o) => {
            m[o.id] = o; return m;
        }, {}));
    default:
        return state;
    }
};

const data = (state = Map(), action) => {
    switch (action.type) {
    case AGREEMENT_DATA:
        return state.set(
            action.dataLabel,
            fromJS(
                action.agreementData.reduce((m, o) => {
                    m[o.id] = o;
                    return m;
                }, {})
            )
        );
    default:
        return state;
    }
};

const agreementEdit = (state = Map(), action) => {
    switch (action.type) {
    case AGREEMENT_EDIT_VALUE:
        return state.set(action.key, fromJS(action.value));
    case AGREEMENT_EDIT_SAVING:
        return state.set('isSaving', action.isSaving);
    default:
        return state;
    }
};

export const rootReducer = combineReducers({
    meta,
    data,
    agreementEdit,
    entityData,
});
