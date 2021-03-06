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
      screenshoot @include(if: $relationScreens)
      clip @include(if: $showClips) {
        preview
        clips {
          full
        }
      }
    }
    platform @include(if: $showPlatform) {
      id
      name
      slug
    }
    relationalProducts @include(if: $relationScreens) {
      id
      platform {
        name
      }
    }
  }
`;
