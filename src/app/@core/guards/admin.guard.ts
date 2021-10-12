import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Roles } from '../types/roles.types';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.auth.currentUser$.pipe(
      first(),
      map((currentUser) => {
        const { role } = currentUser || {};
        if (role !== Roles.ADMIN) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}
