import { IAgreement } from "./";

export interface IEntity {
    id: string
    entity_id: string
    name: string
    entityTypes: Array<string>
    Entity: IEntity
    Entities: Array<IEntity>
    Agreements: Array<IAgreement>
}
export interface EntityData {
    allEntities: IEntity[];
}
