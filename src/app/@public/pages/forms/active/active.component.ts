import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/@core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  private token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {}

  activateUser() {
    this.userService.activate(this.token).subscribe(
      ({ data: { verifyUserActivateEmail }, errors }) => {
        if (verifyUserActivateEmail) {
          Swal.fire('Activation', 'Successful user activation', 'success');
          this.router.navigateByUrl('/login');
          return;
        }
        Swal.fire('Activation', errors[0].message, 'error');
        this.router.navigateByUrl('/');
      },
      () => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
        this.router.navigateByUrl('/');
      }
    );
  }
}
