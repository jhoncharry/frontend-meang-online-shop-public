import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { map } from 'rxjs/operators';
import { DocumentNode } from 'apollo-link';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected apollo: Apollo) {}

  protected get(query: DocumentNode, variables?: object, context?: object) {
    return this.apollo
      .watchQuery({
        query,
        variables,
        context,
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(map((result: any) => result));
  }

  protected set(mutation: DocumentNode, variables?: object, context?: object) {
    return this.apollo
      .mutate({
        mutation,
        variables,
        context,
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result) => result));
  }
}
