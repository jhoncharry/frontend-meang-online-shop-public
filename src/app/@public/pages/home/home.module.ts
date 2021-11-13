import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselItemsModule, ProductItemModule } from '@mugan86/ng-shop-ui';
import { ProductCategoryListModule } from 'src/app/@core/components/product-category-list/product-category-list.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselItemsModule,
    ProductCategoryListModule,
  ],
})
export class HomeModule {}
