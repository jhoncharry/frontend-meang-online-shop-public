import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/@core/services/auth.service';
import { REDIRECTS_ROUTES } from 'src/app/@core/types/redirects-routes';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  submitted = false;
  loading = false;

  public loginForm = this.fb.group({
    email: [
      'test1@gmail.com',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let checkPreviousRoute = localStorage.getItem('route_after_login') || '';

    this.auth.login(this.loginForm.value).subscribe(
      ({ data: { login }, errors }) => {
        if (login) {
          Swal.fire('Login', 'Successful login', 'success');

          if (REDIRECTS_ROUTES.includes(checkPreviousRoute)) {
            this.router.navigateByUrl(checkPreviousRoute);
            localStorage.removeItem('route_after_login');
            return;
          }

          this.router.navigateByUrl('/');
          return;
        }
        Swal.fire('Login', errors[0].message, 'error');
      },
      () => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
      }
    );
  }
}
