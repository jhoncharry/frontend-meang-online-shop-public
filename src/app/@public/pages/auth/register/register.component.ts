import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/@core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  datePickerValidation: any = false;
  submitted = false;

  public registerForm = this.fb.group({
    name: ['Test', [Validators.required, Validators.minLength(3)]],
    lastname: ['Serrato', [Validators.required, Validators.minLength(3)]],
    email: [
      'test1@gmail.com',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
    birthday: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private user: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const defaultDate = `${year}-${this.formatNumbers(
      month
    )}-${this.formatNumbers(day)}`;
    this.getControl.birthday.setValue(defaultDate);
  }

  private formatNumbers(number: number | string) {
    return +number < 10 ? `0${number}` : number;
  }

  dataAsign($event: any) {
    const date = `${$event.year}-${this.formatNumbers(
      $event.month
    )}-${this.formatNumbers($event.day)}`;
    this.getControl.birthday.setValue(date);
    this.datePickerValidation = false;
  }

  //Add user form actions
  get getControl() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    this.getControl.birthday.errors
      ? (this.datePickerValidation = true)
      : (this.datePickerValidation = false);

    if (this.registerForm.invalid) {
      return;
    }

    this.user.register(this.registerForm.value).subscribe(
      ({ data: { register }, errors }) => {
        if (register) {
          Swal.fire('Register', 'Successful register', 'success');
          this.router.navigateByUrl('/login');
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
