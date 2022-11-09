import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblshamelBrokerEmployeeModifyComponent } from './tblshamel-broker-employee-modify.component';

describe('TblshamelBrokerEmployeeModifyComponent', () => {
  let component: TblshamelBrokerEmployeeModifyComponent;
  let fixture: ComponentFixture<TblshamelBrokerEmployeeModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblshamelBrokerEmployeeModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblshamelBrokerEmployeeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
