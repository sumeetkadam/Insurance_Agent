import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLoginMethodComponent } from './choose-login-method.component';

describe('ChooseLoginMethodComponent', () => {
  let component: ChooseLoginMethodComponent;
  let fixture: ComponentFixture<ChooseLoginMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLoginMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLoginMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
