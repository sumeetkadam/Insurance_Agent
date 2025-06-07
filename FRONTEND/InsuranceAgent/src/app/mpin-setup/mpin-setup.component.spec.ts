import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpinSetupComponent } from './mpin-setup.component';

describe('MpinSetupComponent', () => {
  let component: MpinSetupComponent;
  let fixture: ComponentFixture<MpinSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpinSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpinSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
