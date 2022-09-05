export const API_ERROR = 'API_ERROR';
export const dispatchApiError = (status) => {
    return {
        type: API_ERROR,
        status
    };
};

export const APP_CONFIG = 'APP_CONFIG';
const dispatchAppConfig = (appConfig) => {
    return {
        type: APP_CONFIG,
        appConfig
    };
};

export const fetchAppConfig = () => {
    return async (dispatch) => {
        return fetch('/config.json')
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
                    dispatch(dispatchAppConfig(json));
                }
            })
            .catch(e => {
                dispatch(dispatchApiError(true));
                console.error(e);
            });
    };
};
