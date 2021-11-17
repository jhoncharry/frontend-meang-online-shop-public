import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { QuantitySelectorModule } from '@mugan86/ng-shop-ui';

@NgModule({
  declarations: [ShoppingCartComponent],
  exports: [ShoppingCartComponent],
  imports: [CommonModule, QuantitySelectorModule],
})
export class ShoppingCartModule {}
