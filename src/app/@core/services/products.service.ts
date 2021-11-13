import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import {
  productsByPlatforms,
  productsOffersLast,
} from 'src/app/@graphql/operators/query/store-product.query';
import { ApiService } from 'src/app/@graphql/service/api.service';
import { ActiveValues } from '../types/user-active';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ActiveValues = ActiveValues.ACTIVE,
    platform: number = -1,
    random: boolean = false
  ) {
    return this.get(productsByPlatforms, {
      page,
      itemsPage,
      active,
      platform,
      random,
    }).pipe(
      first(),
      map((result: any) => {
        const productList = result.data.storeProductsByPlatforms.storeProduct;
        return this.manageInformation(productList);
      })
    );
  }

  getByLastUnitsOffers(
    page: number = 1,
    itemsPage: number = 10,
    active: ActiveValues = ActiveValues.ACTIVE,
    topPrice: number = -1,
    lastUnits: number = -1,
    random: boolean = false
  ) {
    return this.get(productsOffersLast, {
      page,
      itemsPage,
      active,
      topPrice,
      lastUnits,
      random,
    }).pipe(
      first(),
      map((result: any) => {
        const productList = result.data.storeProductsOffersLast.storeProduct;
        return this.manageInformation(productList);
      })
    );
  }

  private manageInformation(listProducts: any) {
    const resultList: Array<IProduct> = [];
    listProducts.map((storeProduct: any) => {
      resultList.push({
        id: storeProduct.id,
        price: storeProduct.price,
        stock: storeProduct.stock,
        img: storeProduct.product.img,
        name: storeProduct.product.name,
        rating: storeProduct.product.rating,
        description: '',
        qty: 1,
      });
    });
    return resultList;
  }
}
