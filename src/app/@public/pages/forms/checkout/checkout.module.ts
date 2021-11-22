import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutResumeModule } from './checkout-resume/checkout-resume.module';
import { StripePaymentFormModule } from '@mugan86/stripe-payment-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutResumeModule,
    StripePaymentFormModule,
  ],
})
export class CheckoutModule {}
