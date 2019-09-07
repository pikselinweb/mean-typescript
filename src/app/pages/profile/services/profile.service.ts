import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService, SnackbarService } from '@app/shared';
import { USER } from '@server/models';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  $user = this.authService.$user;
  rootApiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private authService: AuthService,

    private snackService: SnackbarService
  ) {}

  updateUser(usr: USER) {
    this.http.post(`${this.rootApiUrl}/user/update`, usr).subscribe(
      (userData: USER) => {
        this.$user.next(userData);
      },
      response => {
        this.snackService.snackMessage(response.message);
      },
      () => {
        this.snackService.snackMessage('NOTIFICATIONS.profile_updated', {
          translate: true
        });
      }
    );
  }
  updateUserImg(img) {
    this.http
      .post(`${this.rootApiUrl}/user/updateImg`, { profilePicture: img })
      .subscribe(
        (userData: USER) => {
          this.$user.next(userData);
        },
        response => {
          this.snackService.snackMessage(response);
        },
        () => {
          this.snackService.snackMessage('NOTIFICATIONS.profile_updated', {
            translate: true
          });
        }
      );
  }
}
