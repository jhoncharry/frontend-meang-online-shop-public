import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from 'src/app/@core/guards/logged.guard';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./child-routing.module').then((m) => m.ChildRoutingModule),
      },
      {
        path: '',
        canLoad: [LoggedGuard],
        canActivate: [LoggedGuard],
        loadChildren: () =>
          import('./auth/auth.routing').then((m) => m.AuthRoutingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
