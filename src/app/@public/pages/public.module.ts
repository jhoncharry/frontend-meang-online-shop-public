import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/components/shared.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class PublicModule {}
