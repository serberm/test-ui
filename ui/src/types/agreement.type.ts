import { IEntity, IPrivateItem } from "./";
export interface IAgreement {
    id: string;
    entity_id: string;
    tranche: string;
    privateItem_id: string;
    maturityDate: string;
    agreementSize: string;
    currency: string;
    type: string;
    Entity: IEntity;
    PrivateItem: IPrivateItem;
}
export interface AgreementData {
    allAgreements: IAgreement[];
}