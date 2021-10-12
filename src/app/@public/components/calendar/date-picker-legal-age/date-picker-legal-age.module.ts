import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerLegalAgeComponent } from './date-picker-legal-age.component';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DatePickerLegalAgeComponent],
  exports: [DatePickerLegalAgeComponent],
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
})
export class DatePickerLegalAgeModule {}
