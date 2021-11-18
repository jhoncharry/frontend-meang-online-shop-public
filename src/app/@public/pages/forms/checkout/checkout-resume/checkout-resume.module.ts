import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutResumeComponent } from './checkout-resume.component';

@NgModule({
  declarations: [CheckoutResumeComponent],
  exports: [CheckoutResumeComponent],
  imports: [CommonModule],
})
export class CheckoutResumeModule {}
