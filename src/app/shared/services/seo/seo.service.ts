import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { InternationalizationService } from '../translate/internationalization.service';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private translateService: InternationalizationService,
    private meta: Meta,
    private title: Title
  ) {}
  setTitleAndDesc(titleKey: string, descKey: string): void {
    this.setTitle(titleKey);
    this.setDescription(descKey);
  }
  setTitle(titleKey: string): void {
    this.translateKey(titleKey).subscribe(translatedTitle => {
      this.title.setTitle(translatedTitle);
    });
  }
  setDescription(descKey: string): void {
    this.translateKey(descKey).subscribe(translatedDesc => {
      this.meta.updateTag({ name: 'description', content: translatedDesc });
    });
  }
  translateKey(tKey: string) {
    return this.translateService.translateIt(tKey);
  }
}
