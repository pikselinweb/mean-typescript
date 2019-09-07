import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styles: []
})
export class NotfoundComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('404 - Page Not Found');
  }

  ngOnInit() {}
}
