import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { CartService } from 'src/app/@public/core/services/cart.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.cartService.cart.total === 0) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
