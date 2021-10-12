import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { User } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: User | null;
  userLabel: string;

  currentUser$: Observable<User | null>;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe((x: User | null) => {
      this.currentUser = x;
      this.userLabel = `${this.currentUser?.name} ${this.currentUser?.lastname}`;
    });
  }

  logout() {
    this.auth.logout().subscribe(
      ({ data: { logout }, loading, errors }) => {
        if (logout) {
          Swal.fire('Logout', 'Successful Logout', 'success');
          this.router.navigateByUrl('/login');
          return;
        }
        Swal.fire('Logout', 'Something went wrong...', 'error');
      },
      (error) => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
      }
    );
  }
}
