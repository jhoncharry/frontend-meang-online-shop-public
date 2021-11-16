import { Component, OnInit } from '@angular/core';

import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { ProductsService } from 'src/app/@core/services/products.service';

import { closeAlert, loadingData } from '../../shared/alerts/alerts';

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

  loading: boolean;

  constructor(private products: ProductsService) {}

  ngOnInit(): void {
    this.loading = true;
    loadingData('Loading', 'Wait while the information is being loaded');

    this.products.getHomePage().subscribe((data) => {
      this.listOne = data.ps4;
      this.listTwo = data.topPrice;
      this.listThree = data.pc;

      this.items = this.manageCarousel(data.carousel.storeProduct);

      closeAlert();
      this.loading = false;
    });
  }

  private manageCarousel(list: any) {
    const itemsValues: Array<ICarouselItem> = [];
    list.map((item: any) => {
      itemsValues.push({
        id: item.id,
        title: item.product.name,
        description: item.platform.name,
        background: item.product.img,
        url: '/games/details/'.concat(item.id),
      });
    });
    return itemsValues;
  }
}
