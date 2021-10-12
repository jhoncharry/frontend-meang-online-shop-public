import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRoutingModule } from './@public/pages/public.routing';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
    PublicRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
