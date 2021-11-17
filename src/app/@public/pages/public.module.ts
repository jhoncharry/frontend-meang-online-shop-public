import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ForgotModule } from './forms/forgot/forgot.module';
import { ChangePasswordModule } from './forms/change-password/change-password.module';
import { HomeModule } from './home/home.module';
import { GamesModule } from './games/games.module';
import { DetailsModule } from './games/details/details.module';
import { ShoppingCartModule } from '../components/shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HomeModule,
    GamesModule,
    DetailsModule,
    ShoppingCartModule,
    ForgotModule,
    ChangePasswordModule,
  ],
})
export class PublicModule {}
