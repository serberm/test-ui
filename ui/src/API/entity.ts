import { gql } from "@apollo/client";

export const ALLENTITIES = gql`
    query allEntities(
        $page: Int
        $perPage: Int
        $sortField: String
        $sortOrder: String
        $filter: EntityFilter
    ) {
        allEntities(
            page: $page
            perPage: $perPage
            sortField: $sortField
            sortOrder: $sortOrder
            filter: $filter
        ) {
            id
            entity_id
            name
            entityTypes
            Entity {
                id
                name
            }
            Entities {
                id
                name
            }
            Agreements {
                id
                entity_id
                tranche
                privateItem_id
                maturityDate
                agreementSize
                currency
                type
                Entity {
                    id
                }
                PrivateItem {
                    id
                    private
                    Agreements {
                        id
                    }
                }
            }
        }
    }
`;
