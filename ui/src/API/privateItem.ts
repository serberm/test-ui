import { gql } from "@apollo/client";

export const ALLPRIVATEITEMS = gql`
    query allPrivateItems(
        $page: Int
        $perPage: Int
        $sortField: String
        $sortOrder: String
        $filter: PrivateItemFilter
    ) {
        allPrivateItems(
            page: $page
            perPage: $perPage
            sortField: $sortField
            sortOrder: $sortOrder
            filter: $filter
        ) {
            id
            private
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
                }
            }
        }
    }
`;

export const getPrivateItem = gql`
    query PrivateItem($id: ID!) {
        PrivateItem(id: $id) {
            id
            private
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
                }
            }
        }
    }
`;

export const UPDATEPRIVATEITEM = gql`
    mutation updatePrivateItem($id: ID!, $private: Boolean) {
        updatePrivateItem(id: $id, private: $private) {
            id
            private
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
                }
            }
        }
    }
`;
