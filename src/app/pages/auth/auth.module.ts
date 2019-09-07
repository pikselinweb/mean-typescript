import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPagesComponent } from './auth-pages/auth-pages.component';
import { LoginComponent } from './auth-pages/login/login.component';
import { RegisterComponent } from './auth-pages/register/register.component';

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  declarations: [AuthPagesComponent, LoginComponent, RegisterComponent],
  providers: []
})
export class AuthModule {}
