import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { mergeMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/@core/services/products.service';
import { closeAlert, loadingData } from 'src/app/@public/shared/alerts/alerts';

import products from '../../../../../assets/@data/products.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product: IProduct;
  // products[Math.floor(Math.random() * products.length)];
  selectImage: string;

  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];
  screens = [];

  relationalProducts: Array<any> = [];
  randomItems: Array<IProduct> = [];

  loading: boolean;

  constructor(
    private producService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      loadingData('Loading', 'Wait while the information is being loaded');
      this.loading = true;

      this.loadDataValue(+params.id);
    });
  }

  loadDataValue(id: number) {
    return this.producService.getItem(id).subscribe((result) => {
      this.product = result.product;

      this.selectImage = this.product.img;
      this.screens = result.screens;

      this.relationalProducts = result.relational;

      this.randomItems = result.random;

      closeAlert();
      this.loading = false;
    });
  }

  changeValue($event: any) {
    console.log('VALORR', $event);
  }

  selectImgMain(index: any) {
    this.selectImage = this.screens[index];
  }

  selectOtherPlatform($event: any) {
    this.loadDataValue(+$event.target.value);
  }
}
