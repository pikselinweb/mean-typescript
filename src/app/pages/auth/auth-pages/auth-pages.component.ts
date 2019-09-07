import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/shared';
@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styles: []
})
export class AuthPagesComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.setTitle('SEO.title.auth');
  }

  ngOnInit() {}
}
