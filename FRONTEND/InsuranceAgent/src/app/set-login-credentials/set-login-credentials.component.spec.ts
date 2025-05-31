import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLoginCredentialsComponent } from './set-login-credentials.component';

describe('SetLoginCredentialsComponent', () => {
  let component: SetLoginCredentialsComponent;
  let fixture: ComponentFixture<SetLoginCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLoginCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLoginCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
