import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-internalserver',
  templateUrl: './internalserver.component.html',
  styles: []
})
export class InternalserverComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('500 - Server Error');
  }

  ngOnInit() {}
}
