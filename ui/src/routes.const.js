export const AGREEMENT_ROUTE = '/agreements';
export const AGREEMENT_VIEW_ROUTE_FACTORY = (id = ':id') => `${AGREEMENT_ROUTE}/show/${id.toLowerCase()}`;
