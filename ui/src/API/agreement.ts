import { gql } from "@apollo/client";

export const ALLAGREEMENTS = gql`
    query allAgreements(
        $page: Int
        $perPage: Int
        $sortField: String
        $sortOrder: String
        $filter: AgreementFilter
    ) {
        allAgreements(
            page: $page
            perPage: $perPage
            sortField: $sortField
            sortOrder: $sortOrder
            filter: $filter
        ) {
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
                entity_id
                name
                entityTypes
                Entity {
                    id
                }
                Entities {
                    id
                }
                Agreements {
                    id
                }
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
`;
