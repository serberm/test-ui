export const API_ERROR = 'API_ERROR';
export const dispatchApiError = (status) => {
    return {
        type: API_ERROR,
        status
    };
};
