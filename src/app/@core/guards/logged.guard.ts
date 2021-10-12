import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | any {
    return this.auth.isLoggedIn().pipe(
      first(),
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        }
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean | any {
    return this.auth.isLoggedIn().pipe(
      first(),
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        }
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
