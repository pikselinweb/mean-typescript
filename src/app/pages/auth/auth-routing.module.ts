import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPagesComponent } from './auth-pages/auth-pages.component';
import { LoginComponent } from './auth-pages/login/login.component';
import { RegisterComponent } from './auth-pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPagesComponent,
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
