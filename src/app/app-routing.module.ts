import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/errorpages/errorpages.module').then(
        mod => mod.ErrorpagesModule
      )
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
