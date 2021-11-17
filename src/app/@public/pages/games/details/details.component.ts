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

  selectImage: string;

  previewVideo: string;
  clipVideo: string;
  isVideoSelected: boolean = false;
  isplayVideo: boolean = false;

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

      this.resetVideoValues();

      this.loadDataValue(+params.id);
    });
  }

  loadDataValue(id: number) {
    return this.producService.getItem(id).subscribe((result) => {
      this.product = result.product;

      this.selectImage = this.product.img;
      this.screens = result.screens;

      this.previewVideo = result.clip?.preview || '';
      this.clipVideo = result.clip?.clips.full || '';

      this.relationalProducts = result.relational;

      this.randomItems = result.random;

      closeAlert();
      this.loading = false;
    });
  }

  changeValue($event: any) {
    console.log('VALORR', $event);
  }

  screensHover(index: any) {
    this.resetVideoValues();
    this.selectImage = this.screens[index];
  }

  videoHover() {
    this.isVideoSelected = true;
  }

  playVideo() {
    this.isplayVideo = true;
  }

  selectOtherPlatform($event: any) {
    this.loadDataValue(+$event.target.value);
  }

  resetVideoValues() {
    this.isVideoSelected = false;
    this.isplayVideo = false;
  }
}
