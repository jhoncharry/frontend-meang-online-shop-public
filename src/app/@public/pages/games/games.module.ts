import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { ProductCategoryListModule } from 'src/app/@core/components/product-category-list/product-category-list.module';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    FormsModule,
    NgbPaginationModule,
    ProductCategoryListModule,
  ],
})
export class GamesModule {}
