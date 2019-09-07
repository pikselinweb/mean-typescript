import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { InternalserverComponent } from './internalserver/internalserver.component';
const routes: Routes = [
  { path: '404', component: NotfoundComponent },
  { path: '500', component: InternalserverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorpagesRoutingModule {}
