import { IAgreement } from "./";
export interface IPrivateItem {
    id: string
    private: boolean
    Agreements: Array<IAgreement>
}

