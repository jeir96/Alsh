import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReferralQararsComponent } from './print-referral-qarars.component';

describe('PrintReferralQararsComponent', () => {
  let component: PrintReferralQararsComponent;
  let fixture: ComponentFixture<PrintReferralQararsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReferralQararsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintReferralQararsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
