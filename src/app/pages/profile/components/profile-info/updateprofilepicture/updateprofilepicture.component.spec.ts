import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprofilepictureComponent } from './updateprofilepicture.component';

describe('UpdateprofilepictureComponent', () => {
  let component: UpdateprofilepictureComponent;
  let fixture: ComponentFixture<UpdateprofilepictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateprofilepictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprofilepictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
