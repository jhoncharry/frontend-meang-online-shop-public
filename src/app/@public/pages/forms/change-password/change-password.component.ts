import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/@core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  private token: string;

  submitted = false;
  loading = false;

  public changePasswordForm = this.fb.group(
    {
      password: ['123456', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    },
    {
      validators: this.confirmPasswordValidator('password', 'confirmPassword'),
    } as AbstractControlOptions
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.changePasswordForm.controls;
  }

  changePassword() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.userService
      .changePassword(this.token, this.changePasswordForm.value.password)
      .subscribe(
        ({ data: { verifyUserResetPasswordEmail }, errors }) => {
          if (verifyUserResetPasswordEmail) {
            Swal.fire(
              'Change password',
              'Password has been changed',
              'success'
            );
            this.router.navigateByUrl('/');
            return;
          }
          Swal.fire('Change password', errors[0].message, 'error');
        },
        () => {
          Swal.fire('Error', 'Something went wrong... Networking!', 'error');
        }
      );
  }

  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }
}
