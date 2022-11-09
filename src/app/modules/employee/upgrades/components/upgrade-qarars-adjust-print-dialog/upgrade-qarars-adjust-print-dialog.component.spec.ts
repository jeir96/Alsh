import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeQararsAdjustPrintDialogComponent } from './upgrade-qarars-adjust-print-dialog.component';

describe('UpgradeQararsAdjustPrintDialogComponent', () => {
  let component: UpgradeQararsAdjustPrintDialogComponent;
  let fixture: ComponentFixture<UpgradeQararsAdjustPrintDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeQararsAdjustPrintDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeQararsAdjustPrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
