import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { sendEmail } from 'src/app/@graphql/operators/mutation/mail.mutation';
import { ApiService } from 'src/app/@graphql/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class MailService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  send(mail: any) {
    return this.set(sendEmail, { mail }).pipe(map((result: any) => result));
  }
}
