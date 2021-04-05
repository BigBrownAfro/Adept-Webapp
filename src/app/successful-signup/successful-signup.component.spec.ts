import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuccessfulSignupComponent } from './successful-signup.component';

describe('SuccessfulSignupComponent', () => {
  let component: SuccessfulSignupComponent;
  let fixture: ComponentFixture<SuccessfulSignupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
