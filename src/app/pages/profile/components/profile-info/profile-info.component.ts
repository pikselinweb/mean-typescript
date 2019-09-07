import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { USER } from '@server/models';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { UpdateprofilepictureComponent } from './updateprofilepicture/updateprofilepicture.component';
import {
  faUser,
  faBriefcase,
  faEnvelope,
  faMobileAlt,
  faLink,
  faMapPin,
  faCamera,
  faUserEdit
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styles: []
})
export class ProfileInfoComponent implements OnInit {
  currentUser: Observable<USER>;
  defaultImgPath = 'assets/img/pp.jpg';
  editPPModal: MatDialogRef<UpdateprofilepictureComponent>;
  editProfileModal: MatDialogRef<UpdateprofileComponent>;
  faIcons = {
    user: faUser,
    job: faBriefcase,
    email: faEnvelope,
    phoneNumber: faMobileAlt,
    web: faLink,
    address: faMapPin,
    camera: faCamera,
    userEdit: faUserEdit
  };
  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {
    this.currentUser = this.profileService.$user;
  }

  ngOnInit() {}
  editProfile(cuser: USER) {
    this.editProfileModal = this.dialog.open(UpdateprofileComponent, {
      width: '800px',
      panelClass: 'rounded-light-modal',
      data: { profileInfos: cuser }
    });
    this.editProfileModal.afterClosed().subscribe(result => {
      if (result) {
        cuser = result;
        this.profileService.updateUser(cuser);
      }
    });
  }
  editPP(cuser: USER) {
    this.editPPModal = this.dialog.open(UpdateprofilepictureComponent, {
      width: '800px',
      panelClass: 'rounded-light-modal',
      data: {}
    });
    this.editPPModal.afterClosed().subscribe(result => {
      if (result) {
        cuser.userPhoto = result.b64Picture;
        this.profileService.updateUserImg(result.b64Picture);
      }
    });
  }
}
