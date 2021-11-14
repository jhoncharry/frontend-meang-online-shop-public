import { Component, OnInit } from '@angular/core';

import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from 'src/app/@core/services/products.service';
import { ActiveValues } from 'src/app/@core/types/user-active';

import carouselItems from '../../../../assets/@data/carousel.json';
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
      console.log(data);
      this.listOne = data.ps4;
      this.listTwo = data.topPrice;
      this.listThree = data.pc;

      this.items = this.manageCarousel(data.carousel.storeProduct);

      closeAlert();
      this.loading = false;
    });
    /*  this.products
      .getByPlatform(1, 4, ActiveValues.ACTIVE, ['18'], true)
      .subscribe((data) => {
        this.listOne = data.result;
      });

    this.products
      .getByLastUnitsOffers(
        1,
        4,
        ActiveValues.ACTIVE,
        35,
        undefined,
        true,
        false,
        true
      )
      .subscribe((data) => {
        this.listTwo = data.result;
      });

    this.products
      .getByPlatform(1, 4, ActiveValues.ACTIVE, ['4'], true)
      .subscribe((data) => {
        this.listThree = data.result;
      });

    this.products
      .getByLastUnitsOffers(1, 6, ActiveValues.ACTIVE, undefined, 20, false)
      .subscribe((data) => {
        data.result.map((item: IProduct) => {
          this.items.push({
            id: item.id,
            title: item.name,
            description: item.description,
            background: item.img,
            url: '',
          });
        });
      }); */
  }

  private manageCarousel(list: any) {
    const itemsValues: Array<ICarouselItem> = [];
    list.map((item: any) => {
      itemsValues.push({
        id: item.id,
        title: item.product.name,
        description: item.platform.name,
        background: item.product.img,
        url: '',
      });
    });
    return itemsValues;
  }
}
