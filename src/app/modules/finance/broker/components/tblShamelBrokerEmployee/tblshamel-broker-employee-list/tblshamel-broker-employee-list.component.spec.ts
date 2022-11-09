import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblshamelBrokerEmployeeListComponent } from './tblshamel-broker-employee-list.component';

describe('TblshamelBrokerEmployeeListComponent', () => {
  let component: TblshamelBrokerEmployeeListComponent;
  let fixture: ComponentFixture<TblshamelBrokerEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblshamelBrokerEmployeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblshamelBrokerEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
