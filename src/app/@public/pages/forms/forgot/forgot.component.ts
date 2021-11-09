import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/@core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  submitted = false;
  loading = false;

  public forgotForm = this.fb.group({
    email: [
      'test1@gmail.com',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.forgotForm.controls;
  }

  forgot() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }

    this.userService.forgot(this.forgotForm.value.email).subscribe(
      ({ data: { sendUserResetPasswordEmail }, errors }) => {
        if (sendUserResetPasswordEmail) {
          Swal.fire(
            'Reset password',
            'Email for reset user password has been sent. Check your email',
            'success'
          );
          this.router.navigateByUrl('/');
          return;
        }
        Swal.fire('Reset password', errors[0].message, 'error');
      },
      () => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
      }
    );
  }
}
