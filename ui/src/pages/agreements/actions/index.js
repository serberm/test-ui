import { dispatchApiError } from '../../../actions';

export const AGREEMENT_LOAD_STATUS = 'AGREEMENT_LOAD_STATUS';
export const dispatchLoadedAgreement = (dataLabel, isLoaded) => {
    return {
        type: AGREEMENT_LOAD_STATUS,
        dataLabel,
        isLoaded,
    };
};

export const AGREEMENT_ENTITY_DATA = 'AGREEMENT_ENTITY_DATA';
const dispatchEntityData = (entityData) => {
    return {
        type: AGREEMENT_ENTITY_DATA,
        entityData,
    };
};

export const AGREEMENT_EDIT_VALUE = 'AGREEMENT_EDIT_VALUE';
export const dispatchAgreementEditValue = (key, value) => {
    return {
        type: AGREEMENT_EDIT_VALUE,
        key,
        value,
    };
};

export const AGREEMENT_EDIT_SAVING = 'AGREEMENT_EDIT_SAVING';
export const dispatchAgreementEditSaving = (isSaving) => {
    return {
        type: AGREEMENT_EDIT_SAVING,
        isSaving,
    };
};

export const AGREEMENT_DATA = 'AGREEMENT_DATA';
const dispatchAgreementData = (dataLabel, agreementData) => {
    return {
        type: AGREEMENT_DATA,
        dataLabel,
        agreementData,
    };
};

export const fetchEntityData = (url) => {
    return async (dispatch) => {
        dispatch(dispatchLoadedAgreement('entityData', 'loading'));

        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(r => {
                if (r.status !== 200) {
                    dispatch(dispatchApiError(true));
                    return;
                } else {
                    return r.json();
                }
            })
            .then(json => {
                if (json) {
                    dispatch(dispatchLoadedAgreement('entityData', true));
                    dispatch(dispatchEntityData(json));
                }
            })
            .catch(e => {
                dispatch(dispatchApiError(true));
                console.error(e);
            });
    };
};

export const fetchAgreementData = (url) => {
    return async (dispatch) => {
        dispatch(dispatchLoadedAgreement('agreementData', 'loading'));

        return fetch(url)
            .then((r) => {
                if (r.status !== 200) {
                    dispatch(dispatchApiError(true));
                    return;
                } else {
                    return r.json();
                }
            })
            .then((json) => {
                if (json) {
                    dispatch(dispatchLoadedAgreement('agreementData', true));
                    dispatch(dispatchAgreementData('agreementData', json));
                }
            })
            .catch((e) => {
                dispatch(dispatchApiError(true));
                console.error(e);
            });
    };
};

export const fetchPrivateAccessData = (url) => {
    return async (dispatch) => {
        dispatch(dispatchLoadedAgreement('privateAccessData', 'loading'));

        return fetch(url)
            .then((r) => {
                if (r.status !== 200) {
                    dispatch(dispatchApiError(true));
                    return;
                } else {
                    return r.json();
                }
            })
            .then((json) => {
                if (json) {
                    dispatch(dispatchLoadedAgreement('privateAccessData', true));
                    dispatch(dispatchAgreementData('privateAccessData', json));
                }
            })
            .catch((e) => {
                dispatch(dispatchApiError(true));
                console.error(e);
            });
    };
};

export const sendPrivateAccessRequest = (url, agreementId) => {
    return async (dispatch) => {
        dispatch(dispatchAgreementEditSaving(true));
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({id: agreementId, 'private': true}),
        })
            .then((r) => {
                if (r.status !== 200) {
                    dispatch(dispatchApiError(true));
                }
                if (r.status === 200) {
                    dispatch(dispatchAgreementEditSaving(false));
                    dispatch(dispatchLoadedAgreement('agreementData', false));
                    dispatch(dispatchAgreementEditValue('modalRequest'), false);
                }
            })
            .catch((e) => {
                dispatch(dispatchApiError(true));
                console.error(e);
            });
    };
};
