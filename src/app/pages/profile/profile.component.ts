import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/shared';
import { faTasks, faIdCardAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  faIcons = { user: faIdCardAlt, todo: faTasks };
  constructor(private seoService: SeoService) {
    this.seoService.setTitle('SEO.title.profile');
  }

  ngOnInit() {}
}
