import { gql } from 'apollo-angular';

export const subscriptionStoreProductSelectStock = gql`
  subscription getUpdateDetails($id: Int!) {
    selectProductStockUpdate(id: $id) {
      id
      stock
    }
  }
`;
