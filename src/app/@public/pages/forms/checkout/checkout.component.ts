import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { StripePaymentService } from '@mugan86/stripe-payment-form';
import { Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MailService } from 'src/app/@core/services/mail.service';
import { REDIRECTS_ROUTES } from 'src/app/@core/types/redirects-routes';
import { CartService } from 'src/app/@public/core/services/cart.service';
import { ChargeService } from 'src/app/@public/core/services/stripe/charge.service';
import { CustomerService } from 'src/app/@public/core/services/stripe/customer.service';
import { loadingData } from 'src/app/@public/shared/alerts/alerts';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  currentUser: User | null;
  userLabel: string;

  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];
  currencyCode = CURRENCY_LIST.EURO;

  block: boolean = false;
  checkComplete: boolean = false;

  key = environment.stripe_public_key;
  stripeSubscription: Subscription;

  changeItemsCart: Subscription;

  submitted = false;
  public checkoutForm = this.fb.group({
    address: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private stripePayment: StripePaymentService,
    private cartService: CartService,
    private customerService: CustomerService,
    private chargeService: ChargeService,
    private mailService: MailService
  ) {
    this.stripeSubscription = this.stripePayment.cardTokenVar$
      .pipe(first())
      .subscribe((token: string) => {
        if (token.indexOf('tok_') > -1) {
          // Almacenar la informacion para enviar
          const payment = {
            token,
            amount: this.cartService.cart.total.toString(),
            description: this.cartService.orderDescription(),
            customer: this.currentUser?.stripeCustomer,
            currency: this.currencyCode,
          };

          const stockManage: Array<any> = [];
          this.cartService.cart.products.map((item) => {
            stockManage.push({
              id: +item.id,
              increment: item.qty! * -1,
            });
          });

          this.block = true;

          loadingData('Charge', 'Payment is in progress....');

          //  Enviar informacion y procesar el pago
          this.chargeService
            .pay(payment, stockManage)
            .pipe(first())
            .subscribe(
              async ({ data: { chargeOrder }, errors }) => {
                if (chargeOrder) {
                  this.checkComplete = true;
                  await Swal.fire('Charge', 'Successful charge', 'success');
                  await this.sendEmail(chargeOrder.charge);

                  this.cartService.clear();
                } else if (errors) {
                  Swal.fire('Charge', errors[0].message, 'error');
                }
                this.block = false;
              },
              () => {
                Swal.fire(
                  'Error',
                  'Something went wrong... Networking!',
                  'error'
                );
              }
            );
        }
      });

    this.changeItemsCart = this.cartService.itemsVar$.subscribe(
      (result: any) => {
        if (this.checkComplete && this.cartService.cart.total === 0) {
          this.cartService.close();
          this.router.navigateByUrl('/orders');
        } else if (this.cartService.cart.total === 0) {
          this.cartService.close();
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.stripeSubscription.unsubscribe();
    this.changeItemsCart.unsubscribe();
  }

  ngOnInit(): void {
    this.cartService.initialize();
    this.block = false;

    const address = localStorage.getItem('address');
    if (address) {
      this.checkoutForm.setValue({ address });
      localStorage.removeItem('address');
    }

    this.auth.currentUser$.pipe(first()).subscribe((x: User | null) => {
      this.currentUser = x;
      // this.userLabel = `${this.currentUser?.name} ${this.currentUser?.lastname}`;
    });

    this.checkComplete = false;
  }

  //Add user form actions
  get getControl() {
    return this.checkoutForm.controls;
  }

  async sendData() {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    if (!this.currentUser?.stripeCustomer) {
      await Swal.fire('Customer', "The customer doesn't exit", 'warning');
      loadingData('Customer', 'Creating customer....');

      const stripeName = `${this.currentUser?.name} ${this.currentUser?.lastname}`;

      this.customerService
        .addCustomer(stripeName, this.currentUser?.email!)
        .pipe(first())
        .subscribe(async ({ data: { createCustomer }, errors }) => {
          if (createCustomer) {
            await Swal.fire('Customer', 'The customer was added', 'success');

            localStorage.setItem('address', this.getControl.address.value);
            this.logout();
            return;
          }
          Swal.fire('Customer', errors[0].message, 'error');
        });

      return;
    } else {
      this.stripePayment.takeCardToken(true);
    }
  }

  async sendEmail(charge: any) {
    const mail = {
      to: charge.receiptEmail,
      subject: 'Confirmacion del pedido',
      html: `
      El pedido se ha realizado correctamente.
      Puedes consultarlo en <a href="${charge.receiptUrl}" target="_blank">Esta Url</a>
      `,
    };

    await this.mailService
      .send(mail)
      .pipe(
        first(),
        map(
          async ({ data: { sendEmail }, errors }) => {
            if (sendEmail) {
              await Swal.fire(
                'Email',
                'The email has been sent successfully',
                'success'
              );
              // this.router.navigateByUrl('/');
              return;
            }
            Swal.fire('Email', errors[0].message, 'error');
          },
          () => {
            Swal.fire('Error', 'Something went wrong... Networking!', 'error');
          }
        )
      )
      .toPromise();
  }

  logout() {
    let previousRoute = this.router.url;

    this.auth.logout().subscribe(
      ({ data: { logout }, loading, errors }) => {
        if (logout) {
          Swal.fire('Logout', 'Successful Logout', 'success');
          if (REDIRECTS_ROUTES.includes(previousRoute)) {
            localStorage.setItem('route_after_login', previousRoute);
          }
          this.router.navigateByUrl('/login');
          return;
        }
        Swal.fire('Logout', 'Something went wrong...', 'error');
      },
      (error) => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
      }
    );
  }
}
