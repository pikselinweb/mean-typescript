import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {
  readonly languageKey = environment.localStoreKeys.selectedLanguage;
  readonly availableLanguages = environment.availableLanguages;
  constructor(
    public translate: TranslateService,
    private storage: LocalStorageService,
    @Inject(DOCUMENT) private documentObj: any
  ) {
    const lVal = this.getSelectedLanguage;
    translate.addLangs(this.availableLanguages);
    translate.setDefaultLang(lVal);
    this.documentObj.documentElement.lang = lVal;
  }
  get getSelectedLanguage() {
    let selectedlangulage = this.storage.retrieve(this.languageKey);
    if (!selectedlangulage) {
      const browserLang = this.translate.getBrowserLang();
      this.availableLanguages.forEach(blang => {
        selectedlangulage = browserLang === blang ? blang : 'en';
      });
      this.storage.store(this.languageKey, selectedlangulage);
      return selectedlangulage;
    } else {
      return selectedlangulage;
    }
  }
  setLanguage(langVal: string): void {
    if (langVal !== this.getSelectedLanguage) {
      this.storage.store(this.languageKey, langVal);
      this.translate.use(langVal);
      this.documentObj.documentElement.lang = langVal;
    }
  }
  translateIt(translateKey: string): Observable<string> {
    return this.translate.get(translateKey);
  }
}
