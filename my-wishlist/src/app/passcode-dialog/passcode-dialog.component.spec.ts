import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodeDialogComponent } from './passcode-dialog.component';

describe('PasscodeDialogComponent', () => {
  let component: PasscodeDialogComponent;
  let fixture: ComponentFixture<PasscodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasscodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasscodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
