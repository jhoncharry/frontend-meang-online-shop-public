import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { payOrder } from 'src/app/@graphql/operators/mutation/stripe/charge.mutation';
import { chargesCustomer } from 'src/app/@graphql/operators/query/stripe/charge.quey';
import { ApiService } from 'src/app/@graphql/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ChargeService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  pay(payment: any) {
    return this.set(payOrder, { payment }).pipe(map((result: any) => result));
  }

  getChargesByCustomer(
    customer: string,
    limit: number,
    startingAfter: string,
    endingBefore: string
  ) {
    return this.get(chargesCustomer, {
      customer,
      limit,
      startingAfter,
      endingBefore,
    }).pipe(map((result: any) => result));
  }
}
