import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { first } from 'rxjs/operators';
import { User } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth.service';
import Swal from 'sweetalert2';
import { ChargeService } from '../../core/services/stripe/charge.service';
import { closeAlert, loadingData } from '../../shared/alerts/alerts';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  currentUser: User | null;

  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];
  currencyCode = CURRENCY_LIST.EURO;

  startingAfter = '';
  hasMore = false;

  charges: Array<any> = [];

  loading: boolean = true;
  loadMoreBtn: boolean = false;

  constructor(private auth: AuthService, private chargeService: ChargeService) {
    this.auth.currentUser$.pipe(first()).subscribe((x: User | null) => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
    if (this.currentUser?.stripeCustomer) {
      this.loadChargesData();
    }
  }

  loadChargesData() {
    loadingData('Charge', 'Loading charges....');

    this.chargeService
      .getChargesByCustomer(
        this.currentUser?.stripeCustomer!,
        10,
        this.startingAfter,
        ''
      )
      .pipe(first())
      .subscribe(
        ({ data: { chargesByCustomer }, errors }) => {
          if (chargesByCustomer) {
            chargesByCustomer.charges.map((item: any) =>
              this.charges.push(item)
            );
            this.hasMore = chargesByCustomer.hasMore;

            if (this.hasMore) {
              this.startingAfter =
                chargesByCustomer.charges[
                  chargesByCustomer.charges.length - 1
                ].id;
              this.loadMoreBtn = true;
            } else {
              this.loadMoreBtn = false;
              this.startingAfter = '';
            }

            closeAlert();
            this.loading = false;
            return;
          }
          Swal.fire('Register', errors[0].message, 'error');
        },
        () => {
          Swal.fire('Error', 'Something went wrong... Networking!', 'error');
        }
      );
  }
}
