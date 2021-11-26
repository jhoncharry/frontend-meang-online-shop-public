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
import { REDIRECTS_ROUTES } from 'src/app/@core/types/redirects-routes';
import { ICart } from '../../components/shopping-cart/shopping-cart.interface';
import { environment } from 'src/environments/environment';

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

  cartItemsTotal: number;

  adminRoute: string = environment.admin_route;

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

    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data) {
        this.cartItemsTotal = data.subtotal;
      }
    });

    this.cartItemsTotal = this.cartService.initialize().subtotal;
  }

  open() {
    this.cartService.open();
  }

  logout() {
    let previousRoute = this.router.url;

    this.auth.logout().subscribe(
      ({ data: { logout }, loading, errors }) => {
        if (logout) {
          Swal.fire('Logout', 'Successful Logout', 'success');
          if (REDIRECTS_ROUTES.includes(previousRoute)) {
            localStorage.setItem('route_after_login', previousRoute);
          }
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
