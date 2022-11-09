import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBrokerPrintTotalsListComponent } from './tbl-shamel-broker-print-totals-list.component';

describe('TblShamelBrokerPrintTotalsListComponent', () => {
  let component: TblShamelBrokerPrintTotalsListComponent;
  let fixture: ComponentFixture<TblShamelBrokerPrintTotalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBrokerPrintTotalsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBrokerPrintTotalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
