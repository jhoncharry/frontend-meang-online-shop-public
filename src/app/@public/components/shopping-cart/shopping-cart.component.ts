import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private cartService: CartService) {
    this.cartService.itemsVar$.subscribe((data: ICart) => {
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
    this.router.navigateByUrl('/checkout');
    this.closeNav();
  }

  closeNav() {
    this.cartService.close();
  }
}
