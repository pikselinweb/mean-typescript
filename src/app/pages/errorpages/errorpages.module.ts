import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorpagesRoutingModule } from './errorpages-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { InternalserverComponent } from './internalserver/internalserver.component';


@NgModule({
  declarations: [NotfoundComponent, InternalserverComponent],
  imports: [
    CommonModule,
    ErrorpagesRoutingModule
  ]
})
export class ErrorpagesModule { }
