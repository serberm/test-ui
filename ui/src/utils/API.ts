export const entitiesDataUrl = (apiRoot: string) => {
    return apiRoot + '/entities';
};

export const agreementDataUrl = (apiRoot: string) => {
    return  apiRoot + '/agreements';
};

export const privateAccessItemsUrl = (apiRoot: string) => {
    return  apiRoot + '/privateItems';
};

export const privateAccessRequestUrl = (apiRoot: string, id: string) => {
    return  apiRoot + '/privateItems/' + id;
};
