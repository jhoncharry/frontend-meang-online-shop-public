import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotComponent],
  exports: [ForgotComponent],
  imports: [
    CommonModule,
    ForgotRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ForgotModule {}
