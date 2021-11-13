import gql from 'graphql-tag';

export const storeProductFragment = gql`
  fragment StoreProductObject on StoreProduct {
    id
    price
    stock
    product {
      name
      img
      rating {
        value
        count
      }
    }
  }
`;
