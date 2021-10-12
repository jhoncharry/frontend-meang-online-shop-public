import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, finalize, first, map, tap } from 'rxjs/operators';

import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import {
  getMe,
  login,
  logout,
  renewToken,
} from 'src/app/@graphql/operators/query/user.query';
import { ApiService } from 'src/app/@graphql/service/api.service';
import { ILoginForm } from 'src/app/@core/interfaces/login-form.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  // We need to have something which won't emit initial value rather wait till it has something.
  // Hence for that ReplaySubject. I have given to hold one user object and it will cache this as well
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(apollo: Apollo) {
    super(apollo);
  }

  get token(): string {
    return localStorage.getItem('v1_leaf') || '';
  }

  // Init to get currentUser when page reload o load for the first time
  loadCurrentUser(): Observable<User | null> {
    if (!this.token || !uuidValidate(this.token)) {
      this.currentUserSource.next(null);
      return of(null);
    }
    return this.getInitCurrentUser();
  }

  // Check if there's a user logged in
  isLoggedIn(): Observable<boolean | null> {
    if (!this.token || !uuidValidate(this.token)) {
      this.currentUserSource.next(null);
      return of(false);
    }
    return this.validateToken();
  }

  // Check if user session is valid, sending for new token.
  validateToken() {
    return this.get(renewToken).pipe(
      first(),
      map(({ data: { renewToken }, loading, errors }) => {
        if (renewToken) {
          const { user } = renewToken;
          this.currentUserSource.next(user);
          return true;
        }
        this.logout();
        this.currentUserSource.next(null);
        return false;
      }),
      catchError((error) => {
        this.logout();
        this.currentUserSource.next(null);
        return of(false);
      })
    );
  }

  // Method to get the current user when page reload or it's loaded for the first time
  getInitCurrentUser() {
    return this.get(renewToken).pipe(
      first(),
      map(({ data: { renewToken }, loading, errors }) => {
        if (renewToken) {
          const { user } = renewToken;
          this.currentUserSource.next(user);
          return user;
        }
        this.logout();
        this.currentUserSource.next(null);
        return null;
      }),
      catchError((error) => {
        this.logout();
        this.currentUserSource.next(null);
        return of(null);
      })
    );
  }

  // User login method
  login(formData: ILoginForm) {
    return this.get(login, { ...formData, include: false }).pipe(
      first(),
      tap(({ data: { login } }) => {
        if (login) {
          localStorage.setItem('v1_leaf', uuidv4());
          const { user } = login;
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // User logout method
  logout() {
    localStorage.removeItem('v1_leaf');
    this.apollo.client.resetStore();
    return this.get(logout).pipe(
      first(),
      map((result: any) => result),
      finalize(() => {
        this.currentUserSource.next(null);
      })
    );
  }

  // Get me method
  getMe() {
    return this.get(getMe).pipe(map((result: any) => result));
  }
}
