import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/@core/guards/admin.guard';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
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
