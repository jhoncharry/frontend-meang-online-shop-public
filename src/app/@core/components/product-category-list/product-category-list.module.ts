import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryListComponent } from './product-category-list.component';
import { ProductItemModule } from '@mugan86/ng-shop-ui';

@NgModule({
  declarations: [ProductCategoryListComponent],
  exports: [ProductCategoryListComponent],
  imports: [CommonModule, ProductItemModule],
})
export class ProductCategoryListModule {}
