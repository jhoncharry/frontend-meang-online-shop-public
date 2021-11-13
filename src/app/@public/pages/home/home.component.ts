import { Component, OnInit } from '@angular/core';

import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from 'src/app/@core/services/products.service';
import { ActiveValues } from 'src/app/@core/types/user-active';

import carouselItems from '../../../../assets/@data/carousel.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: ICarouselItem[] = [];
  productsList: any;

  listOne: any;
  listTwo: any;
  listThree: any;

  constructor(private products: ProductsService) {}

  ngOnInit(): void {
    this.products
      .getByPlatform(1, 4, ActiveValues.ACTIVE, 18, true)
      .subscribe((result) => {
        this.listOne = result;
      });

    this.products
      .getByLastUnitsOffers(1, 4, ActiveValues.ACTIVE, 35, 40, true)
      .subscribe((result) => {
        this.listTwo = result;
      });

    this.products
      .getByPlatform(1, 4, ActiveValues.ACTIVE, 4, true)
      .subscribe((result) => {
        this.listThree = result;
      });

    this.products
      .getByLastUnitsOffers(1, 6, ActiveValues.ACTIVE, undefined, 20, false)
      .subscribe((result: IProduct[]) => {
        result.map((item: IProduct) => {
          this.items.push({
            id: item.id,
            title: item.name,
            description: item.description,
            background: item.img,
            url: '',
          });
        });
      });
  }
}
