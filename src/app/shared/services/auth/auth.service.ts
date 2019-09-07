import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '@env/environment';
import { SnackbarService } from '../notifications/snackbar.service';
import { USER, USERHTTP } from '@server/models';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;
  readonly TOKEN_KEY = environment.localStoreKeys.userTokenKey;
  public $user = new BehaviorSubject<USER>(null);
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    public snackService: SnackbarService,
    public router: Router
  ) {
    this.currentUser.subscribe((usr: USER) => this.$user.next(usr));
  }
  get currentUser(): Observable<USER> {
    const tokenVal = this.localStorage.retrieve(this.TOKEN_KEY);
    if (!tokenVal) {
      return of(null);
    } else {
      return this.http
        .get<USER>(`${this.baseUrl}/me`)
        .pipe(map(userValue => userValue[`user`]));
    }
  }
  login(email: string, password: string) {
    this.emailAuth('login', email, password);
  }
  register(email: string, password: string, repeatPassword: string): void {
    this.emailAuth('register', email, password, repeatPassword);
  }

  emailAuth(
    operation: string,
    email: string,
    password: string,
    repeatPassword?: string
  ): void {
    const credentials =
      operation === 'login'
        ? { email, password }
        : { email, password, repeatPassword };
    const successMessage =
      operation === 'login'
        ? 'NOTIFICATIONS.account_logged_on'
        : 'NOTIFICATIONS.account_created';
    this.http.post(`${this.baseUrl}/${operation}`, credentials).subscribe(
      (userData: USERHTTP) => {
        this.setUser(userData.user);
        this.localStorage.store(this.TOKEN_KEY, userData.token);
      },
      response => {
        if (response.status === 503) {
          this.snackService.snackMessage('ERRORS.email_already_use', {
            translate: true,
            action: 'ERROR'
          });
        } else if (response.status === 401) {
          this.snackService.snackMessage('ERRORS.wrong_credentials', {
            translate: true,
            action: 'ERROR'
          });
        } else if (response.status === 404) {
          this.snackService.snackMessage('ERRORS.account_doesnt_exist', {
            translate: true,
            action: 'ERROR'
          });
        } else {
          this.snackService.snackMessage(response.statusText);
        }
      },
      () => {
        this.snackService.snackMessage(successMessage, {
          translate: true
        });
        this.navigate('/profile');
      }
    );
  }
  setUser(user): void {
    this.$user.next(user);
  }
  navigate(url?: string): void {
    const nUrl = url ? url : '/';
    this.router.navigate([nUrl]);
  }
  signOut(): void {
    this.setUser(null);
    this.localStorage.clear();
    this.navigate();
  }
}
