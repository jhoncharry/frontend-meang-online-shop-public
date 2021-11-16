import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/@core/guards/admin.guard';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { ActiveComponent } from './forms/active/active.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { ForgotComponent } from './forms/forgot/forgot.component';
import { DetailsComponent } from './games/details/details.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'games/details/:id', component: DetailsComponent },
  { path: 'games/:type/:filter', component: GamesComponent },
  { path: 'active/:token', component: ActiveComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset/:token', component: ChangePasswordComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        children: [
          {
            path: '',
            component: AdminComponent,
            canActivate: [AdminGuard],
          },
        ],
      },
      /*       {
        path: 'yyy',
        children: [
          {
            path: '',
            component: ContactComponent,
          },
        ],
      }, */
    ],
  },
  /*   
  // Example if we only have one route that need AuthGuard 
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
      },
    ],
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutingModule {}
