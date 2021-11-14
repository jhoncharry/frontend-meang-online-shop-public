import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import { homePage } from 'src/app/@graphql/operators/query/home-page.query';
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

  getHomePage() {
    return this.get(homePage, { showPlatform: true }).pipe(
      first(),
      map((result: any) => {
        console.log('HOME PAGE', result);
        return {
          carousel: result.data.carousel,
          ps4: this.manageInformation(result.data.ps4.storeProduct, false),
          topPrice: this.manageInformation(result.data.topPrice35.storeProduct),
          pc: this.manageInformation(result.data.pc.storeProduct, false),
        };
      })
    );
  }

  getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ActiveValues = ActiveValues.ACTIVE,
    platform: string[] = ['-1'],
    random: boolean = false,
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(productsByPlatforms, {
      page,
      itemsPage,
      active,
      platform,
      random,
      showInfo,
      showPlatform,
    }).pipe(
      first(),
      map((result: any) => {
        const data = result.data.storeProductsByPlatforms;
        return {
          info: data.info,
          result: this.manageInformation(data.storeProduct),
        };
      })
    );
  }

  getByLastUnitsOffers(
    page: number = 1,
    itemsPage: number = 10,
    active: ActiveValues = ActiveValues.ACTIVE,
    topPrice: number = -1,
    lastUnits: number = -1,
    random: boolean = false,
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(productsOffersLast, {
      page,
      itemsPage,
      active,
      topPrice,
      lastUnits,
      random,
      showInfo,
      showPlatform,
    }).pipe(
      first(),
      map((result: any) => {
        const data = result.data.storeProductsOffersLast;
        return {
          info: data.info,
          result: this.manageInformation(data.storeProduct),
        };
      })
    );
  }

  private manageInformation(listProducts: any, showPlatform = true) {
    const resultList: Array<IProduct> = [];
    listProducts.map((storeProduct: any) => {
      resultList.push({
        id: storeProduct.id,
        price: storeProduct.price,
        stock: storeProduct.stock,
        img: storeProduct.product.img,
        name: storeProduct.product.name,
        rating: storeProduct.product.rating,
        description:
          storeProduct.platform && showPlatform
            ? storeProduct.platform.name
            : '',
        qty: 1,
      });
    });
    return resultList;
  }
}
