import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss'],
})
export class DatePickerLegalAgeComponent implements OnInit {
  CURRENT_DAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  minDate: NgbDateStruct = {
    year: this.CURRENT_DAY.year - 100,
    month: this.CURRENT_DAY.month,
    day: this.CURRENT_DAY.day,
  };
  maxDate: NgbDateStruct = {
    year: this.CURRENT_DAY.year - 18,
    month: this.CURRENT_DAY.month,
    day: this.CURRENT_DAY.day,
  };

  model: NgbDateStruct = this.maxDate;

  @Input() datePicker: any; // decorate the property with @Input()
  @Output() newDate = new EventEmitter<NgbDateStruct>();

  constructor() {}

  ngOnInit(): void {}

  selectDateChange() {
    this.newDate.emit(this.model);
  }
}
