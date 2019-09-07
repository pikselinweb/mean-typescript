import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { InternationalizationService } from '../../services/translate/internationalization.service';
import {
  faHome,
  faPowerOff,
  faUserPlus,
  faUser,
  faLanguage,
  faGlobe,
  faHatWizard,
  faBars
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  faIcons = {
    brandIcon: faHatWizard,
    home: faHome,
    globe: faGlobe,
    language: faLanguage,
    login: faUser,
    logOut: faPowerOff,
    menu: faBars,
    profile: faUser,
    register: faUserPlus
  };

  constructor(
    public authService: AuthService,
    private langService: InternationalizationService
  ) {}
  ngOnInit() {}
  navigate(url?: string) {
    const nUrl = url ? url : '/';
    this.authService.navigate(nUrl);
  }
  get availableLanguages() {
    return this.langService.availableLanguages;
  }
  changeLanguage(langVal: string) {
    this.langService.setLanguage(langVal);
  }
  logOut() {
    this.authService.signOut();
  }
}
