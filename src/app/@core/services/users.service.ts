import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import { register } from 'src/app/@graphql/operators/mutation/user.mutation';
import { getUsers } from 'src/app/@graphql/operators/query/user.query';
import { ApiService } from 'src/app/@graphql/service/api.service';
import { IRegisterForm } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  // Get users
  getUsers() {
    return this.get(getUsers, { include: true }).pipe(
      map((result: any) => result.users)
    );
  }

  // Register user
  register(user: IRegisterForm) {
    return this.set(register, { user, include: false }).pipe(
      first(),
      map((result: any) => result)
    );
  }
}
