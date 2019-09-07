import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileRoutingModule } from './profile-routing.module';

import { SharedModule } from '@app/shared';

import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { CommentsComponent } from './components/comments/comments.component';
import { UpdateprofileComponent } from './components/profile-info/updateprofile/updateprofile.component';
import { UpdateprofilepictureComponent } from './components/profile-info/updateprofilepicture/updateprofilepicture.component';
import { TodoComponent } from './components/todo/todo.component';
import { EdittaskComponent } from './components/todo/edittask/edittask.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    CommentsComponent,
    UpdateprofileComponent,
    UpdateprofilepictureComponent,
    TodoComponent,
    EdittaskComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    SharedModule,
    ProfileRoutingModule
  ],
  entryComponents: [
    UpdateprofileComponent,
    UpdateprofilepictureComponent,
    EdittaskComponent
  ]
})
export class ProfileModule {}
