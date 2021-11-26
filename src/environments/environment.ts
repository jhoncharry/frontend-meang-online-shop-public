// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe_public_key:
    'pk_test_51JxDIrLHC9KMOZhNCVtz6mQo6BvVVPeQXSD40t1M4ochcOhlCkJz0SnpP6rou0wRvIGq7Jm1cNycst1WD2sJ2MO200LNmWxJgd',
  graphql_api: 'http://localhost:3000/graphql',
  graphql_subscription_api: 'ws://localhost:3000/graphql',
  admin_route: 'http://localhost:4500',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
