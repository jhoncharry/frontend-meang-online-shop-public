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
  ) {
    storeProductsOffersLast(
      page: $page
      itemsPage: $itemsPage
      active: $active
      topPrice: $topPrice
      lastUnits: $lastUnits
      random: $random
    ) {
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
    $platform: ID!
    $random: Boolean
  ) {
    storeProductsByPlatforms(
      page: $page
      itemsPage: $itemsPage
      active: $active
      platform: $platform
      random: $random
    ) {
      status
      message
      storeProduct {
        ...StoreProductObject
      }
    }
  }
  ${storeProductFragment}
`;
