import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { first, map } from 'rxjs/operators';

import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from 'src/app/@core/services/products.service';
import { ActiveValues } from 'src/app/@core/types/user-active';
import { GAMES_PAGES_INFO, TYPE_OPERATION } from './game.constants';
import { IGamePageInfo } from './games-page-information.interface';
import { closeAlert, loadingData } from '../../shared/alerts/alerts';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  productsList: Array<IProduct> = [];

  page: number;
  pages: number;
  itemsPage: number;
  total: number;

  allowPageItems: number[];
  defaultItemPage: number;

  gamesPageInformation: IGamePageInfo;
  typeData: TYPE_OPERATION;

  loading: boolean;

  constructor(
    private products: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.allowPageItems = [5, 10, 15, 20];
  }

  ngOnInit(): void {
    this.itemsPage = this.itemsPage || 20;
    this.defaultItemPage = this.allowPageItems.includes(this.itemsPage)
      ? this.itemsPage
      : 20;

    this.route.params.subscribe(async (params) => {
      this.loading = true;
      loadingData('Loading', 'Wait while the information is being loaded');

      const keyPage = `${params.type}/${params.filter}`;

      this.gamesPageInformation = GAMES_PAGES_INFO[keyPage];
      this.typeData = params.type;

      await this.resetNavigateValues();
      this.loadData();
    });

    this.route.queryParams.subscribe(async (params) => {
      this.loading = true;
      loadingData('Loading', 'Wait while the information is being loaded');
      
      this.total = this.total || (await this.totalDocumentLoad().toPromise());

      // Page
      const pageParams = +params.page;
      this.page = pageParams;
      if (!this.page) {
        this.page = 1;
      }

      // Items page
      const itemsParams = +params.items;
      if (itemsParams && itemsParams === this.defaultItemPage) {
        this.defaultNavigate();
      }

      // Navegation Item Page (Final)
      if (itemsParams) {
        this.itemsPage = itemsParams;
      } else if (this.itemsPage !== this.defaultItemPage) {
        this.defaultNavigate();
      }

      if (this.allowPageItems.includes(this.itemsPage)) {
        await this.loadData();
      } else {
        this.defaultNavigate();
      }
    });
  }

  // *******************************************************

  defaultNavigate() {
    this.itemsPage = this.defaultItemPage;
    this.router.navigate([]);
  }

  async resetNavigateValues() {
    this.page = 1;
    this.itemsPage = this.defaultItemPage;
    this.total = await this.totalDocumentLoad().toPromise();
  }

  // *******************************************************

  loadData() {
    console.log('1111');
    if (this.typeData === TYPE_OPERATION.PLATFORMS) {
      this.products
        .getByPlatform(
          this.page,
          this.itemsPage,
          ActiveValues.ACTIVE,
          this.gamesPageInformation.platformsIds,
          false,
          true,
          true
        )
        .subscribe((data) => {
          this.asignResult(data);
        });
      return;
    }

    this.products
      .getByLastUnitsOffers(
        this.page,
        this.itemsPage,
        ActiveValues.ACTIVE,
        this.gamesPageInformation.topPrice,
        this.gamesPageInformation.stock,
        false,
        true,
        true
      )
      .subscribe((data) => {
        this.asignResult(data);
      });
  }

  private asignResult(data: any) {
    this.total = data.info.total;
    this.pages = data.info.pages;

    this.productsList = data.result;

    closeAlert();
    this.loading = false;
  }

  totalDocumentLoad() {
    if (this.typeData === TYPE_OPERATION.PLATFORMS) {
      return this.products
        .getByPlatform(
          this.page,
          this.itemsPage,
          ActiveValues.ACTIVE,
          this.gamesPageInformation.platformsIds,
          false,
          true
        )
        .pipe(
          first(),
          map((result) => {
            const data = result.info;
            if (data) {
              const { total } = data;
              if (!total)
                throw new Error(
                  'The number of documents is undefined, please check with support'
                );
              return total;
            }
          })
        );
    }

    return this.products
      .getByLastUnitsOffers(
        this.page,
        this.itemsPage,
        ActiveValues.ACTIVE,
        this.gamesPageInformation.topPrice,
        this.gamesPageInformation.stock,
        false,
        true,
        true
      )
      .pipe(
        first(),
        map((result) => {
          const data = result.info;
          if (data) {
            const { total } = data;
            if (!total)
              throw new Error(
                'The number of documents is undefined, please check with support'
              );
            return total;
          }
        })
      );
  }

  // *******************************************************

  changeItemPage(items: number) {
    if (items === this.defaultItemPage) {
      this.router.navigate([]);
    } else {
      this.router.navigate([], {
        queryParams: { items, page: 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  changePage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
