import { gql } from 'apollo-angular';
import { storeProductFragment } from '../fragment/store-product.fragment';

export const homePage = gql`
  query homePageInformation(
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
    $showClips: Boolean = false
  ) {
    carousel: storeProductsOffersLast(itemsPage: 6, lastUnits: 20) {
      storeProduct {
        ...StoreProductObject
      }
    }

    ps4: storeProductsByPlatforms(
      itemsPage: 4
      platform: ["18"]
      random: true
    ) {
      storeProduct {
        ...StoreProductObject
      }
    }

    topPrice35: storeProductsOffersLast(
      itemsPage: 4
      topPrice: 35
      random: true
    ) {
      storeProduct {
        ...StoreProductObject
      }
    }

    pc: storeProductsByPlatforms(itemsPage: 4, platform: ["4"], random: true) {
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;
