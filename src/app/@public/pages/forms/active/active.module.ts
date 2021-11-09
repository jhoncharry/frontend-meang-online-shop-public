import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';


@NgModule({
  declarations: [
    ActiveComponent
  ],
  imports: [
    CommonModule,
    ActiveRoutingModule
  ]
})
export class ActiveModule { }
