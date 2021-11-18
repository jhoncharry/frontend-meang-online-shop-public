import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Subscription } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/@core/services/products.service';
import { ICart } from 'src/app/@public/components/shopping-cart/shopping-cart.interface';
import { CartService } from 'src/app/@public/core/services/cart.service';
import { closeAlert, loadingData } from 'src/app/@public/shared/alerts/alerts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
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

  changeItemsCart: Subscription;

  constructor(
    private producService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.changeItemsCart.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      loadingData('Loading', 'Wait while the information is being loaded');
      this.loading = true;

      this.resetVideoValues();

      this.loadDataValue(+params.id);
    });

    this.changeItemsCart = this.cartService.itemsVar$.subscribe(
      (data: ICart) => {
        if (data.subtotal === 0) {
          this.product.qty = 1;
          return;
        }
        this.product.qty = this.findProduct(+this.product.id)?.qty || 1;
      }
    );
  }

  findProduct(id: number) {
    return this.cartService.cart.products.find((item) => +item.id === id);
  }

  loadDataValue(id: number) {
    return this.producService.getItem(id).subscribe((result) => {
      this.product = result.product;

      const saveProductInCart = this.findProduct(+this.product.id);
      this.product.qty =
        saveProductInCart !== undefined
          ? saveProductInCart?.qty
          : this.product.qty;

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

  changeValue(qty: number) {
    this.product.qty = qty;
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

  addToCart() {
    this.cartService.manageProduct(this.product);
  }
}
