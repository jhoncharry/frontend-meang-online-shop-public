import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { QuantitySelectorModule, RatingModule } from '@mugan86/ng-shop-ui';
import { ProductCategoryListModule } from 'src/app/@core/components/product-category-list/product-category-list.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    RatingModule,
    QuantitySelectorModule,
    ProductCategoryListModule,
  ],
})
export class DetailsModule {}
