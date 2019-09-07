import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InternationalizationService } from '../translate/internationalization.service';
import { SNACKOPTIONS } from '@server/models';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackRef;
  constructor(
    private snackBar: MatSnackBar,
    private translateService: InternationalizationService
  ) {}
  snackMessage(message: string, opt?: SNACKOPTIONS) {
    const snackOpt: SNACKOPTIONS = this.getSnackOptions(opt);
    if (snackOpt.translate) {
      this.translateService.translateIt(message).subscribe(tmes => {
        this.snackBar.open(tmes, snackOpt.action, {
          duration: snackOpt.time,
          panelClass: `${snackOpt.type}-snack`
        });
      });
    } else {
      this.snackBar.open(message, snackOpt.action, {
        duration: snackOpt.time,
        panelClass: `${snackOpt.type}-snack`
      });
    }
  }
  private getSnackOptions(opt?: SNACKOPTIONS): SNACKOPTIONS {
    if (opt) {
      const translateIt = opt.translate ? opt.translate : false;
      const act = opt.action ? opt.action : 'Close';
      const tt = opt.time ? opt.time : 5000;
      const typeSnac = opt.type ? opt.type : 'default';
      const optObj: SNACKOPTIONS = {
        action: act,
        time: tt,
        type: typeSnac,
        translate: translateIt
      };
      return optObj;
    } else {
      return { action: 'Close', time: 5000, translate: false, type: 'default' };
    }
  }
  notificationSnackBar(message: string, translate?: boolean) {
    const trans = translate ? translate : false;
    if (trans) {
      this.translateService.translateIt(message).subscribe(tmes => {
        this.snackRef = this.snackBar.open(tmes, '', {
          duration: 10000,
          panelClass: 'snack-notify'
        });
      });
    } else {
      this.snackRef = this.snackBar.open(message, '', {
        duration: 10000,
        panelClass: 'snack-notify'
      });
    }
  }
  closeSnackBar() {
    this.snackRef.dismiss();
  }
}
