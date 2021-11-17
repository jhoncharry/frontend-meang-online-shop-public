import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { User } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth.service';
import showMenuItems from '../../../../assets/@data/menus/store.json';
import Swal from 'sweetalert2';
import { IMenuItem } from 'src/app/@core/interfaces/menu-item.interface';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuItems: Array<IMenuItem> = showMenuItems;

  currentUser: User | null;
  userLabel: string;

  currentUser$: Observable<User | null>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe((x: User | null) => {
      this.currentUser = x;
      this.userLabel = `${this.currentUser?.name} ${this.currentUser?.lastname}`;
    });
  }

  open() {
    console.log('navbar open cart');
    this.cartService.open();
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
