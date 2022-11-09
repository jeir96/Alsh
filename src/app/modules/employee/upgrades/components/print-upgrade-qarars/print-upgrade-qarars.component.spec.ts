import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintUpgradeQararsComponent } from './print-upgrade-qarars.component';

describe('PrintUpgradeQararsComponent', () => {
  let component: PrintUpgradeQararsComponent;
  let fixture: ComponentFixture<PrintUpgradeQararsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintUpgradeQararsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintUpgradeQararsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
