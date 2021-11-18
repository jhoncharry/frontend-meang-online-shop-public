import { Component, OnDestroy, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICart } from 'src/app/@public/components/shopping-cart/shopping-cart.interface';
import { CartService } from 'src/app/@public/core/services/cart.service';

@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss'],
})
export class CheckoutResumeComponent implements OnInit, OnDestroy {
  cart: ICart;

  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];
  currencyCode = CURRENCY_LIST.EURO;

  changeItemsCart: Subscription;

  constructor(private cartService: CartService) {
    this.changeItemsCart = this.cartService.itemsVar$.subscribe(
      (data: ICart) => {
        if (data) {
          this.cart = data;
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.changeItemsCart.unsubscribe();
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
  }
}
