import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPagesComponent } from './auth-pages.component';

describe('AuthPagesComponent', () => {
  let component: AuthPagesComponent;
  let fixture: ComponentFixture<AuthPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
