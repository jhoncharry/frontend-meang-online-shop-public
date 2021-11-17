import { gql } from 'apollo-angular';
import { storeProductFragment } from '../fragment/store-product.fragment';

export const detailsPage = gql`
  query detailsPageInformation(
    $id: Int!
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
    $showClips: Boolean = true
  ) {
    randomItems: storeProductsOffersLast(itemsPage: 10, random: true) {
      storeProduct {
        ...StoreProductObject
      }
    }

    details: storeProductDetails(id: $id) {
      status
      message
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;
