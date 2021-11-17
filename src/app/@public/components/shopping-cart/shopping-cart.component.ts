import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';
import { ICart } from './shopping-cart.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart;

  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];

  constructor(private cartService: CartService) {
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      console.log(data);
      if (data) {
        this.cart = data;
      }
    });
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
  }

  clear() {
    this.cartService.clear();
  }

  clearItem(product: IProduct) {
    this.manageProductUnitInformation(0, product);
  }

  changeValue(qty: number, product: IProduct) {
    this.manageProductUnitInformation(qty, product);
  }

  manageProductUnitInformation(qty: number, product: IProduct) {
    product.qty = qty;
    this.cartService.manageProduct(product);
  }

  process() {
    console.log('ddddd', this.cart);
  }

  closeNav() {
    this.cartService.close();
  }
}
