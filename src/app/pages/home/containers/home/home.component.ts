import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/shared';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  faIcons = { demo: faStar };
  constructor(private seoService: SeoService) {
    this.seoService.setTitleAndDesc('SEO.title.home', 'SEO.meta.description');
  }

  ngOnInit() {}
}
