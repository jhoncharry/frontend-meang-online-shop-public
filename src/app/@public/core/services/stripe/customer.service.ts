import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { createCustomer } from 'src/app/@graphql/operators/mutation/stripe/customer.mutation';
import { ApiService } from 'src/app/@graphql/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addCustomer(name: string, email: string) {
    return this.set(createCustomer, { name, email }).pipe(
      map((result: any) => result)
    );
  }
}
