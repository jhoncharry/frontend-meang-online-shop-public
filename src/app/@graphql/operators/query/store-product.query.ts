import { gql } from 'apollo-angular';
import { storeProductFragment } from '../fragment/store-product.fragment';

export const productsOffersLast = gql`
  query productsOffersLast(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $topPrice: Float
    $lastUnits: Int
    $random: Boolean
    $showInfo: Boolean = false
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
    $showClips: Boolean = false
  ) {
    storeProductsOffersLast(
      page: $page
      itemsPage: $itemsPage
      active: $active
      topPrice: $topPrice
      lastUnits: $lastUnits
      random: $random
    ) {
      info @include(if: $showInfo) {
        page
        pages
        itemsPage
        total
      }
      status
      message
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;

/* export interface IProduct {
  id: string; //Identificador del product de la tienda
  name: string; // Nombre
  img: string; // Imagen del producto
  stock: number; // Cantidad de unidades en el stock
  price: number; // Precio real
  description: string; // Descripción del producto
  qty?: number; // Cantidad de unidades que se van a adquirir
  rating?: IRatingItem; // Información sobre las reseñas
} */

export const productsByPlatforms = gql`
  query storeProductsByPlatforms(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $platform: [ID!]!
    $random: Boolean
    $showInfo: Boolean = false
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
    $showClips: Boolean = false
  ) {
    storeProductsByPlatforms(
      page: $page
      itemsPage: $itemsPage
      active: $active
      platform: $platform
      random: $random
    ) {
      info @include(if: $showInfo) {
        page
        pages
        itemsPage
        total
      }
      status
      message
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;

export const storeProductDetails = gql`
  query storeProductDetails(
    $id: Int!
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
  ) {
    storeProductDetails(id: $id) {
      status
      message
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;

export const storeRandomProducts = gql`
  query randomItems(
    $showPlatform: Boolean = true
    $relationScreens: Boolean = false
  ) {
    randomItems: storeProductsOffersLast(itemsPage: 6, random: true) {
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;
